import { z } from 'zod'

export const registerSchema = z.object({
  name: z.string().min(8).max(20),
  email: z.email(),
  password: z.string().min(8).max(72),
  confirmPassword: z.string().min(8).max(72),
})

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(72),
})
