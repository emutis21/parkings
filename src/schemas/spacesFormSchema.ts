import { z } from 'zod'

export const SpaceFormSchema = z.object({
  disponible: z.boolean(),
  idArea: z.string().max(10, { message: 'El id del área debe tener máximo 10 caracteres' })
})

export const SpaceFormSchemaUpdate = SpaceFormSchema.omit({
  idArea: true
})
