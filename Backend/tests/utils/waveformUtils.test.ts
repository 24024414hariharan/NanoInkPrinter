import { generateWaveform } from '../../src/utils/waveformUtils';

describe('generateWaveform', () => {
  it('should generate correct waveform for low-viscosity, high-surface-tension ink (default attempt)', () => {
    const ink = {
      viscosity_mPas: 8,
      surfaceTension_Npm: 0.04
    };

    const waveform = generateWaveform(ink);

    expect(waveform.riseTime_us).toBe(5);
    expect(waveform.fallTime_us).toBe(5);
    expect(waveform.dwellTime_us).toBe(2.5);
    expect(waveform.recoveryTime_us).toBe(10);
    expect(waveform.peakPressure_Pa).toBe(70000);
    expect(waveform.negativePeakPressure_Pa).toBeLessThan(0);
    expect(waveform.shape).toBe('sigmoid');
  });

  it('should generate correct waveform for high-viscosity, low-surface-tension ink', () => {
    const ink = {
      viscosity_mPas: 15,
      surfaceTension_Npm: 0.025
    };

    const waveform = generateWaveform(ink);

    expect(waveform.riseTime_us).toBe(10);
    expect(waveform.fallTime_us).toBe(10);
    expect(waveform.dwellTime_us).toBe(2.5);
    expect(waveform.recoveryTime_us).toBe(15); // 1.5 * 10
    expect(waveform.peakPressure_Pa).toBe(95000);
    expect(waveform.negativePeakPressure_Pa).toBeLessThan(0);
  });

  it('should increase rise time and peak pressure with attempt number', () => {
    const ink = {
      viscosity_mPas: 8,
      surfaceTension_Npm: 0.04
    };

    const waveform0 = generateWaveform(ink, 0);
    const waveform1 = generateWaveform(ink, 1);
    const waveform2 = generateWaveform(ink, 2);

    expect(waveform1.riseTime_us).toBe(waveform0.riseTime_us + 1);
    expect(waveform2.riseTime_us).toBe(waveform0.riseTime_us + 2);

    expect(waveform1.peakPressure_Pa).toBe(waveform0.peakPressure_Pa + 1000);
    expect(waveform2.peakPressure_Pa).toBe(waveform0.peakPressure_Pa + 2000);
  });

  it('should cap recoveryTime_us to minimum 10', () => {
    const ink = {
      viscosity_mPas: 8,
      surfaceTension_Npm: 0.05 // higher tension → fall time = 5
    };

    const waveform = generateWaveform(ink);

    // fallTime_us = 5 → recoveryTime_us = Math.max(10, 1.5 * 5) = 10
    expect(waveform.recoveryTime_us).toBe(10);
  });

  it('should return consistent shape as sigmoid', () => {
    const waveform = generateWaveform({ viscosity_mPas: 20, surfaceTension_Npm: 0.01 });
    expect(waveform.shape).toBe('sigmoid');
  });
});
