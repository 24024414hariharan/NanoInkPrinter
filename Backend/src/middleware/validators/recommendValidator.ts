import { z } from 'zod';

export const recommendSchema = z.object({
  inkProperties: z.object({
    viscosity_mPas: z.number({ error: 'Viscosity must be a number.' })
      .positive({ error: 'Viscosity must be a positive number.' }),
    surfaceTension_Npm: z.number({ error: 'Surface tension must be a number.' })
      .positive({ error: 'Surface tension must be a positive number.' }),
    density_kgpm3: z.number({ error: 'Density must be a number.' })
      .positive({ error: 'Density must be a positive number.' }),
    suppressSatellite: z.boolean({ error: 'suppressSatellite must be true or false.' })
  }),

  nozzle: z.object({
    diameter_um: z.number({ error: 'Nozzle diameter must be a number.' })
      .positive({ error: 'Nozzle diameter must be a positive number.' }),
    length_mm: z.number({ error: 'Nozzle length must be a number.' })
      .positive({ error: 'Nozzle length must be a positive number.' }),
    temperature_C: z.number({ error: 'Temperature must be a number.' })
  }),

  desiredDroplet: z.object({
    size_um: z.number({ error: 'Droplet size must be a number.' })
      .positive({ error: 'Droplet size must be a positive number.' }),
    velocity_mps: z.number({ error: 'Droplet velocity must be a number.' })
      .positive({ error: 'Droplet velocity must be a positive number.' }),
    breakOffTime_us: z.number({ error: 'Break-off time must be a number.' })
      .positive({ error: 'Break-off time must be a positive number.' })
  })
});