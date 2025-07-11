export function requiresUpdate(rating: string): boolean {
    const triggerRatings = ['Too small', 'Too slow', 'Unstable'];
    return triggerRatings.includes(rating);
  }
  
  export function refineWaveform(waveform: any, rating: string): any {
    const newWaveform = { ...waveform };
  
    if (rating === 'Too small') {
      newWaveform.peakPressure_Pa += 5000;
    }
  
    if (rating === 'Too slow') {
      newWaveform.peakPressure_Pa += 3000;
      newWaveform.riseTime_us += 0.5;
    }
  
    if (rating === 'Unstable') {
      newWaveform.fallTime_us += 2;
      newWaveform.negativePeakPressure_Pa -= 2000;
    }
  
    return newWaveform;
  }