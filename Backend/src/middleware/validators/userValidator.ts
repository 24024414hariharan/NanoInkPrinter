import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().email({ message: 'Invalid email format.' }),
  password: z.string()
    .min(8, { message: 'Password must be at least 8 characters.' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter.' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter.' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number.' })
    .regex(/[@$!%*?&#]/, { message: 'Password must contain at least one special character.' })
});

export const registerSchema = z.object({
  name: z.string().min(1, { message: 'Name is required.' }),
  username: z.string().email({ message: 'Username must be a valid email address.' }),
  password: z.string()
    .min(8, { message: 'Password must be at least 8 characters long.' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter.' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter.' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number.' })
    .regex(/[@$!%*?&]/, { message: 'Password must contain at least one special character.' }),
  reenterPassword: z.string()
}).refine((data) => data.password === data.reenterPassword, {
  message: 'Passwords do not match.',
  path: ['reenterPassword'], 
});