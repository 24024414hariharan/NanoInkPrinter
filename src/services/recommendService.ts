import { calculateOhReWe } from '../utils/fluidNumbers';
import { generateWaveform } from '../utils/waveformUtils';
import { predictDroplet } from '../utils/dropletPredictor';
import { checkStability } from '../utils/stabilityChecker';

export const generate = async (input: any) => {
  const { inkProperties, nozzle, desiredDroplet } = input;
  const suppressSatellite = inkProperties.suppressSatellite;

  const fluidNumbers = calculateOhReWe(inkProperties, nozzle);

  const initialWaveform = generateWaveform(inkProperties);

  let waveform = initialWaveform;
  let predictedDroplet = predictDroplet(waveform, inkProperties);
  let isStable = checkStability(predictedDroplet, desiredDroplet, suppressSatellite);

  let attempts = 0;
  const MAX_ATTEMPTS = 3;

  while (!isStable && attempts < MAX_ATTEMPTS) {
    waveform = generateWaveform(inkProperties, attempts + 1);
    predictedDroplet = predictDroplet(waveform, inkProperties);
    isStable = checkStability(predictedDroplet, desiredDroplet, suppressSatellite);
    attempts++;
  }

  return {
    printabilityCheck: fluidNumbers,
    initialWaveform,
    predictedDroplet,
    isStable,
    finalRecommendation: {
      waveform,
      droplet: predictedDroplet
    }
  };
};