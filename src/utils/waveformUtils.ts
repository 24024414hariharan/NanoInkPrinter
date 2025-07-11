export function generateWaveform(ink: any, attempt = 0) {
    const riseTime_us = ink.viscosity_mPas > 10 ? 10 : 5;
    const fallTime_us = ink.surfaceTension_Npm < 0.03 ? 10 : 5;
    const peakPressure = ink.viscosity_mPas > 10 ? 95000 : 70000;
    const dwellTime_us = 2.5;
    const recoveryTime_us = Math.max(10, 1.5 * fallTime_us);
    const shape = 'sigmoid';
  
    const negativePeak = -Math.round(15000 + 10000 * (0.03 / ink.surfaceTension_Npm) * (1 / ink.viscosity_mPas));
  
    return {
      riseTime_us: riseTime_us + attempt * 1,
      fallTime_us,
      dwellTime_us,
      recoveryTime_us,
      peakPressure_Pa: peakPressure + attempt * 1000,
      negativePeakPressure_Pa: negativePeak,
      shape
    };
  }