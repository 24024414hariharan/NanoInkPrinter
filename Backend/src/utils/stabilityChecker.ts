export function checkStability(predicted: any, desired: any, suppress: boolean) {
    const sizeOK = Math.abs(predicted.size_um - desired.size_um) <= 0.2 * desired.size_um;
    const velocityOK = Math.abs(predicted.velocity_mps - desired.velocity_mps) <= 0.2 * desired.velocity_mps;
    const breakTimeOK = Math.abs(predicted.breakOffTime_us - desired.breakOffTime_us) <= 2.0;
    const noSatellitesOK = !suppress || predicted.hasSatellite === false;
    const stableClassOK = predicted.stabilityClass === 'Stable';
  
    return sizeOK && velocityOK && breakTimeOK && noSatellitesOK && stableClassOK;
  }