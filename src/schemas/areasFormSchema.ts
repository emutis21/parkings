import { VehicleType } from '~/area/types'

import { z } from 'zod'

export const AreaFormSchema = z.object({
  idArea: z.string().max(10, { message: 'El id del área debe tener máximo 10 caracteres' }),
  descripcion: z
    .string()
    .max(50, { message: 'La descripción del área debe tener máximo 50 caracteres' }),
  tipo: z.nativeEnum(VehicleType, { message: 'El tipo de vehículo no es válido' }),
  idParqueadero: z
    .string()
    .max(10, { message: 'El id del parqueadero debe tener máximo 10 caracteres' })
})

export const AreaFormSchemaUpdate = AreaFormSchema.omit({
  idArea: true,
  idParqueadero: true
})
