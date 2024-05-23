import { z } from 'zod'

export const LocalityFormSchema = z.object({
  idLocalidad: z
    .string()
    .max(10, { message: 'El id de la localidad debe tener máximo 10 caracteres' }),
  nombreLocalidad: z
    .string()
    .max(20, { message: 'El nombre de la localidad debe tener máximo 20 caracteres' })
})

export const LocalityFormSchemaUpdate = LocalityFormSchema.omit({ idLocalidad: true })
