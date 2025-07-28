import { checkStability } from '../../src/utils/stabilityChecker';

describe('checkStability', () => {
  const basePredicted = {
    size_um: 25,
    velocity_mps: 5,
    breakOffTime_us: 20,
    hasSatellite: false,
    stabilityClass: 'Stable'
  };

  const desired = {
    size_um: 25,
    velocity_mps: 5,
    breakOffTime_us: 20
  };

  it('should return true when all conditions are met and suppress is true', () => {
    const result = checkStability(basePredicted, desired, true);
    expect(result).toBe(true);
  });

  it('should return true when all conditions are met and suppress is false', () => {
    const result = checkStability({ ...basePredicted, hasSatellite: true }, desired, false);
    expect(result).toBe(true); // satellite allowed when suppress is false
  });

  it('should return false if size deviation is too high', () => {
    const result = checkStability({ ...basePredicted, size_um: 31 }, desired, true); // 24% off
    expect(result).toBe(false);
  });

  it('should return false if velocity deviation is too high', () => {
    const result = checkStability({ ...basePredicted, velocity_mps: 6.2 }, desired, true); // 24% off
    expect(result).toBe(false);
  });

  it('should return false if breakOffTime deviation is too high', () => {
    const result = checkStability({ ...basePredicted, breakOffTime_us: 23 }, desired, true); // 3μs off
    expect(result).toBe(false);
  });

  it('should return false if hasSatellite is true and suppress is true', () => {
    const result = checkStability({ ...basePredicted, hasSatellite: true }, desired, true);
    expect(result).toBe(false);
  });

  it('should return false if stabilityClass is not "Stable"', () => {
    const result = checkStability({ ...basePredicted, stabilityClass: 'Unstable' }, desired, true);
    expect(result).toBe(false);
  });
});