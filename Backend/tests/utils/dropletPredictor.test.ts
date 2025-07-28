import { predictDroplet } from '../../src/utils/dropletPredictor';

describe('predictDroplet', () => {
  it('should calculate droplet properties correctly for stable ink', () => {
    const waveform = {
      peakPressure_Pa: 90000,
      riseTime_us: 10,
      dwellTime_us: 3
    };

    const ink = {
      surfaceTension_Npm: 0.035,
      viscosity_mPas: 12
    };

    const result = predictDroplet(waveform, ink);

    expect(result).toEqual({
      size_um: 25.5, // 3.0 * 8.5
      velocity_mps: 6.0, // 90000 / 15000
      breakOffTime_us: 14.8, // 10 + 3 + 1.8
      hasSatellite: false,
      stabilityClass: 'Stable'
    });
  });

  it('should return Unstable stability class if viscosity is above 15', () => {
    const waveform = {
      peakPressure_Pa: 75000,
      riseTime_us: 8,
      dwellTime_us: 2
    };

    const ink = {
      surfaceTension_Npm: 0.029,
      viscosity_mPas: 18
    };

    const result = predictDroplet(waveform, ink);

    expect(result.stabilityClass).toBe('Unstable');
    expect(result.hasSatellite).toBe(true);
    expect(result.velocity_mps).toBeCloseTo(5.0);
    expect(result.breakOffTime_us).toBeCloseTo(11.8);
  });
});
