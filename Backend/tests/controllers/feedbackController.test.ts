import { handleFeedback } from '../../src/controllers/feedbackController';
import * as feedbackService from '../../src/services/feedbackService';
import { Request, Response } from 'express';

const mockResponse = (): Response => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res as Response;
};

describe('feedbackController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call feedbackService.processFeedback with req.body and userId and return 200', async () => {
    const req = {
      body: { rating: 'Good', comments: 'Nice system!' },
      user: { id: 123 }
    } as Request & { user: { id: number } };

    const res = mockResponse();
    const mockResult = {
        message: 'Feedback submitted successfully',
        data: {
          feedbackId: 1,
          userId: 123,
          storedAt: new Date()
        },
        updatedRecommendation: {
          waveform: {}, // put more realistic structure if needed
          droplet: {
            size_um: 25,
            velocity_mps: 5.2,
            breakOffTime_us: 18,
            hasSatellite: false,
            stabilityClass: 'A'
          },
          isStable: true
        }
      };

    jest.spyOn(feedbackService, 'processFeedback').mockResolvedValue(mockResult);

    await handleFeedback(req, res);

    expect(feedbackService.processFeedback).toHaveBeenCalledWith(req.body, 123);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockResult);
  });
});
