import z from "zod";

export const emailSchema = z.object({
  value: z.email(),
})

export const passwordSchema = z.object({
  value: z.string().min(8).max(72),
})

export const nameSchema = z.object({
  value: z.string().min(8).max(20),
})

export const genderSchema = z.object({
  value: z.enum(["M", "F"]),
})

export const dateSchema = z.object({
  value: z.string().date("Invalid date format"),
})
