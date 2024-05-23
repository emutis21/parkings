import { z } from 'zod'

export const ParkingFormSchema = z.object({
  idParqueadero: z
    .string()
    .max(10, { message: 'El id del parqueadero debe tener máximo 10 caracteres' }),
  direccion: z
    .string()
    .max(50, { message: 'La dirección del parqueadero debe tener máximo 50 caracteres' }),
  disponible: z.boolean().default(false),
  idLocalidad: z
    .string()
    .max(10, { message: 'El id de la localidad debe tener máximo 10 caracteres' })
})

export const ParkingFormSchemaUpdate = ParkingFormSchema.omit({
  idParqueadero: true,
  idLocalidad: true
})
