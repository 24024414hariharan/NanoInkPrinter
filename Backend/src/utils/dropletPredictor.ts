export function predictDroplet(waveform: any, ink: any) {
    const baseVolume = 3.0;
    const velocity = waveform.peakPressure_Pa / 15000;
  
    return {
      size_um: Number((baseVolume * 8.5).toFixed(1)),
      velocity_mps: Number(velocity.toFixed(2)),
      breakOffTime_us: Number((waveform.riseTime_us + waveform.dwellTime_us + 1.8).toFixed(1)),
      hasSatellite: ink.surfaceTension_Npm < 0.03,
      stabilityClass: ink.viscosity_mPas > 15 ? 'Unstable' : 'Stable'
    };
  }