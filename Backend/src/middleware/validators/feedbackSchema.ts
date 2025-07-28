import { z } from 'zod';

export const feedbackSchema = z.object({
  rating: z.enum(['Good', 'Too small', 'Too slow', 'Unstable'], {
    error: 'Rating must be one of: Good, Too small, Too slow, Unstable.'
  }),

  comments: z.string({ error: 'Comments must be a string.' }).min(1, {
    error: 'Comments are required.'
  }),

  inkProperties: z.object({
    viscosity_mPas: z.number({ error: 'Viscosity must be a number.' }),
    surfaceTension_Npm: z.number({ error: 'Surface tension must be a number.' }),
    density_kgpm3: z.number({ error: 'Density must be a number.' })
  }),

  nozzle: z.object({
    diameter_um: z.number({ error: 'Nozzle diameter must be a number.' }),
    length_mm: z.number({ error: 'Nozzle length must be a number.' }),
    temperature_C: z.number({ error: 'Temperature must be a number.' })
  }),

  desiredDroplet: z.object({
    size_um: z.number({ error: 'Droplet size must be a number.' }),
    velocity_mps: z.number({ error: 'Droplet velocity must be a number.' }),
    breakOffTime_us: z.number({ error: 'Break-off time must be a number.' })
  }),

  waveform: z.object({
    riseTime_us: z.number({ error: 'riseTime must be a number.' }),
    fallTime_us: z.number({ error: 'fallTime must be a number.' }),
    peakPressure_Pa: z.number({ error: 'peakPressure must be a number.' }),
    negativePeakPressure_Pa: z.number({ error: 'negativePeakPressure must be a number.' }),
    recoveryTime_us: z.number({ error: 'recoveryTime must be a number.' }),
    dwellTime_us: z.number({ error: 'dwellTime must be a number.' }),
    shape: z.string({ error: 'Shape must be a string.' })
  }),

  droplet: z.object({
    size_um: z.number({ error: 'Droplet size must be a number.' }),
    velocity_mps: z.number({ error: 'Droplet velocity must be a number.' }),
    breakOffTime_us: z.number({ error: 'Droplet break-off time must be a number.' }),
    hasSatellite: z.boolean({ error: 'hasSatellite must be a boolean.' }),
    stabilityClass: z.string({ error: 'Stability class must be a string.' })
  })
});
