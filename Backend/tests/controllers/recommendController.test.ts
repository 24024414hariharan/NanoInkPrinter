import { generateRecommendation } from '../../src/controllers/recommendController';
import * as recommendService from '../../src/services/recommendService';
import { Request, Response } from 'express';

const mockResponse = (): Response => {
    const res: Partial<Response> = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res as Response;
  };
  
  describe('recommendController.generateRecommendation', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('should call recommendService.generate with req.body and respond with 200 and result', async () => {
      const mockInput = {
        inkProperties: { viscosity_mPas: 12, surfaceTension_Npm: 0.028, density_kgpm3: 980, suppressSatellite: true },
        nozzle: { diameter_um: 35, length_mm: 0.8, temperature_C: 30 },
        desiredDroplet: { size_um: 25, velocity_mps: 5 }
      };
  
      const mockResult = {
        printabilityCheck: { ohnesorge: 0.2, reynolds: 45, weber: 25, warnings: [] },
        initialWaveform: { riseTime_us: 5, fallTime_us: 5, dwellTime_us: 2, recoveryTime_us: 10, peakPressure_Pa: 80000, negativePeakPressure_Pa: -20000, shape: 'sigmoid' },
        predictedDroplet: { size_um: 25, velocity_mps: 5.2, breakOffTime_us: 18, hasSatellite: false, stabilityClass: 'A' },
        isStable: true,
        finalRecommendation: {
          waveform: { riseTime_us: 5, fallTime_us: 5, dwellTime_us: 2, recoveryTime_us: 10, peakPressure_Pa: 80000, negativePeakPressure_Pa: -20000, shape: 'sigmoid' },
          droplet: { size_um: 25, velocity_mps: 5.2, breakOffTime_us: 18, hasSatellite: false, stabilityClass: 'A' }
        }
      };
  
      const req = { body: mockInput } as Request;
      const res = mockResponse();
  
      jest.spyOn(recommendService, 'generate').mockResolvedValue(mockResult);
  
      await generateRecommendation(req, res);
  
      expect(recommendService.generate).toHaveBeenCalledWith(mockInput);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockResult);
    });
  });