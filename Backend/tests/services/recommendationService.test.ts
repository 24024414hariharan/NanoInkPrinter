import { generate } from '../../src/services/recommendService';
import * as fluidUtils from '../../src/utils/fluidNumbers';
import * as waveformUtils from '../../src/utils/waveformUtils';
import * as dropletPredictor from '../../src/utils/dropletPredictor';
import * as stabilityChecker from '../../src/utils/stabilityChecker';

describe('recommendationService.generate', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it('should generate stable droplet recommendation in the first attempt', async () => {
      const input = {
        inkProperties: {
          viscosity_mPas: 10,
          surfaceTension_Npm: 0.035,
          density_kgpm3: 1000,
          suppressSatellite: true
        },
        nozzle: {
          diameter_um: 30,
          length_mm: 1.2,
          temperature_C: 25
        },
        desiredDroplet: {
          size_um: 25,
          velocity_mps: 5
        }
      };
  
      const mockFluidNumbers = {
        ohnesorge: 0.2,
        reynolds: 45,
        weber: 25,
        warnings: []
      };
  
      const mockInitialWaveform = {
        riseTime_us: 5,
        fallTime_us: 5,
        dwellTime_us: 2,
        recoveryTime_us: 10,
        peakPressure_Pa: 80000,
        negativePeakPressure_Pa: -20000,
        shape: 'sigmoid'
      };
  
      const mockPredictedDroplet = {
        size_um: 25,
        velocity_mps: 5,
        breakOffTime_us: 20,
        hasSatellite: false,
        stabilityClass: 'A'
      };
  
      jest.spyOn(fluidUtils, 'calculateOhReWe').mockReturnValue(mockFluidNumbers);
      jest.spyOn(waveformUtils, 'generateWaveform').mockReturnValue(mockInitialWaveform);
      jest.spyOn(dropletPredictor, 'predictDroplet').mockReturnValue(mockPredictedDroplet);
      jest.spyOn(stabilityChecker, 'checkStability').mockReturnValue(true);
  
      const result = await generate(input);
  
      expect(result.isStable).toBe(true);
      expect(result.initialWaveform).toEqual(mockInitialWaveform);
      expect(result.finalRecommendation.droplet).toEqual(mockPredictedDroplet);
    });
  
    it('should retry until stable droplet is found within MAX_ATTEMPTS', async () => {
      const input = {
        inkProperties: {
          viscosity_mPas: 10,
          surfaceTension_Npm: 0.035,
          density_kgpm3: 1000,
          suppressSatellite: true
        },
        nozzle: {
          diameter_um: 30,
          length_mm: 1.2,
          temperature_C: 25
        },
        desiredDroplet: {
          size_um: 25,
          velocity_mps: 5
        }
      };
  
      const mockInitialWaveform = {
        riseTime_us: 5,
        fallTime_us: 5,
        dwellTime_us: 2,
        recoveryTime_us: 10,
        peakPressure_Pa: 80000,
        negativePeakPressure_Pa: -20000,
        shape: 'sigmoid'
      };
  
      const mockNextWaveform = {
        riseTime_us: 6,
        fallTime_us: 5,
        dwellTime_us: 2,
        recoveryTime_us: 10,
        peakPressure_Pa: 85000,
        negativePeakPressure_Pa: -18000,
        shape: 'sigmoid'
      };
  
      const unstableDroplet = {
        size_um: 22,
        velocity_mps: 4.5,
        breakOffTime_us: 18,
        hasSatellite: true,
        stabilityClass: 'D'
      };
  
      const stableDroplet = {
        size_um: 25,
        velocity_mps: 5,
        breakOffTime_us: 20,
        hasSatellite: false,
        stabilityClass: 'A'
      };
  
      jest.spyOn(fluidUtils, 'calculateOhReWe').mockReturnValue({
        ohnesorge: 0.1,
        reynolds: 60,
        weber: 30,
        warnings: []
      });
  
      const waveformSpy = jest.spyOn(waveformUtils, 'generateWaveform');
      waveformSpy
        .mockReturnValueOnce(mockInitialWaveform)
        .mockReturnValueOnce(mockNextWaveform);
  
      const dropletSpy = jest.spyOn(dropletPredictor, 'predictDroplet');
      dropletSpy
        .mockReturnValueOnce(unstableDroplet)
        .mockReturnValueOnce(stableDroplet);
  
      const stabilitySpy = jest.spyOn(stabilityChecker, 'checkStability');
      stabilitySpy
        .mockReturnValueOnce(false)
        .mockReturnValueOnce(true);
  
      const result = await generate(input);
  
      expect(result.isStable).toBe(true);
      expect(waveformSpy).toHaveBeenCalledTimes(2);
      expect(dropletSpy).toHaveBeenCalledTimes(2);
      expect(stabilitySpy).toHaveBeenCalledTimes(2);
      expect(result.finalRecommendation.waveform).toEqual(mockNextWaveform);
      expect(result.finalRecommendation.droplet).toEqual(stableDroplet);
    });
  });