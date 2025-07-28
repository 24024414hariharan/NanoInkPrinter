import { processFeedback } from '../../src/services/feedbackService';
import { PrismaClient } from '@prisma/client';
import * as refineUtils from '../../src/utils/refineUtils';
import * as dropletPredictor from '../../src/utils/dropletPredictor';
import * as stabilityChecker from '../../src/utils/stabilityChecker';

jest.mock('@prisma/client', () => {
  const mockCreate = jest.fn();
  return {
    PrismaClient: jest.fn(() => ({
      feedback: {
        create: mockCreate,
      },
    })),
  };
});

const prismaMock = new PrismaClient() as any;

describe('feedbackService.processFeedback', () => {
  const sampleBody = {
    rating: 'Too small',
    comments: 'Droplet size was noticeably below target.',
    waveform: {
      riseTime_us: 5,
      fallTime_us: 5,
      dwellTime_us: 2,
      recoveryTime_us: 10,
      peakPressure_Pa: 80000,
      negativePeakPressure_Pa: -20000,
      shape: 'sigmoid'
    },
    droplet: {
      size_um: 23.5,
      velocity_mps: 4.8,
      breakOffTime_us: 22,
      hasSatellite: false,
      stabilityClass: 'B'
    },
    inkProperties: {
      viscosity_mPas: 12,
      surfaceTension_Npm: 0.028,
      density_kgpm3: 980,
      suppressSatellite: true
    },
    nozzle: {
      diameter_um: 35,
      length_mm: 0.8,
      temperature_C: 30
    },
    desiredDroplet: {
      size_um: 25,
      velocity_mps: 5.5
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should store feedback and return updated recommendation', async () => {
    // Mock Prisma feedback creation
    const createdFeedback = {
      id: 1,
      createdAt: new Date('2023-01-01T12:00:00Z')
    };
    prismaMock.feedback.create.mockResolvedValue(createdFeedback);

    // Mock refine and stability logic
    const refinedWaveform = {
      ...sampleBody.waveform,
      riseTime_us: 6 // just an example refinement
    };

    const updatedDroplet = {
      size_um: 25,
      velocity_mps: 5.5,
      breakOffTime_us: 20,
      hasSatellite: false,
      stabilityClass: 'A'
    };

    jest.spyOn(refineUtils, 'refineWaveform').mockReturnValue(refinedWaveform);
    jest.spyOn(dropletPredictor, 'predictDroplet').mockReturnValue(updatedDroplet);
    jest.spyOn(stabilityChecker, 'checkStability').mockReturnValue(true);

    const result = await processFeedback(sampleBody, 123);

    expect(prismaMock.feedback.create).toHaveBeenCalledWith({
      data: {
        userId: 123,
        rating: sampleBody.rating,
        comments: sampleBody.comments,
        waveform: sampleBody.waveform,
        droplet: sampleBody.droplet,
        inkProperties: sampleBody.inkProperties,
        nozzle: sampleBody.nozzle,
        desiredDroplet: sampleBody.desiredDroplet
      }
    });

    expect(result).toEqual({
      message: 'Feedback recorded and updated recommendation generated.',
      data: {
        feedbackId: 1,
        userId: 123,
        storedAt: createdFeedback.createdAt
      },
      updatedRecommendation: {
        waveform: refinedWaveform,
        droplet: updatedDroplet,
        isStable: true
      }
    });
  });

  it('should throw error if rating is missing or not a string', async () => {
    await expect(
      processFeedback({ ...sampleBody, rating: undefined }, 123)
    ).rejects.toThrow('Feedback rating is required and must be a string.');

    await expect(
      processFeedback({ ...sampleBody, rating: 5 }, 123)
    ).rejects.toThrow('Feedback rating is required and must be a string.');
  });
});
