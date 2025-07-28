import { requiresUpdate, refineWaveform } from '../../src/utils/refineUtils';

describe('requiresUpdate', () => {
  it('should return true for trigger ratings', () => {
    expect(requiresUpdate('Too small')).toBe(true);
    expect(requiresUpdate('Too slow')).toBe(true);
    expect(requiresUpdate('Unstable')).toBe(true);
  });

  it('should return false for non-trigger ratings', () => {
    expect(requiresUpdate('Perfect')).toBe(false);
    expect(requiresUpdate('Too large')).toBe(false);
    expect(requiresUpdate('Unknown')).toBe(false);
  });
});

describe('refineWaveform', () => {
  const baseWaveform = {
    peakPressure_Pa: 80000,
    riseTime_us: 5,
    fallTime_us: 4,
    dwellTime_us: 2,
    recoveryTime_us: 10,
    negativePeakPressure_Pa: -20000,
    shape: 'sigmoid'
  };

  it('should increase peakPressure for "Too small"', () => {
    const result = refineWaveform(baseWaveform, 'Too small');
    expect(result.peakPressure_Pa).toBe(85000);
    expect(result).toMatchObject({ ...baseWaveform, peakPressure_Pa: 85000 });
  });

  it('should increase peakPressure and riseTime for "Too slow"', () => {
    const result = refineWaveform(baseWaveform, 'Too slow');
    expect(result.peakPressure_Pa).toBe(83000);
    expect(result.riseTime_us).toBe(5.5);
  });

  it('should increase fallTime and reduce negativePeakPressure for "Unstable"', () => {
    const result = refineWaveform(baseWaveform, 'Unstable');
    expect(result.fallTime_us).toBe(6);
    expect(result.negativePeakPressure_Pa).toBe(-22000);
  });

  it('should return original waveform if rating is not a trigger', () => {
    const result = refineWaveform(baseWaveform, 'Perfect');
    expect(result).toEqual(baseWaveform);
  });

  it('should not mutate the original waveform object', () => {
    const copy = { ...baseWaveform };
    refineWaveform(baseWaveform, 'Too small');
    expect(baseWaveform).toEqual(copy); // Ensure input is untouched
  });
});