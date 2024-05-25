import { VehicleType } from '~/area/types'

import { z } from 'zod'

export const RegisterFormSchema = z.object({
  placa: z
    .string()
    .max(6, { message: 'La placa debe tener máximo 6 caracteres' })
    .refine(
      (value) => /^[A-Z]{3}\d{2,3}[A-Z]?$/.test(value),
      'La placa debe tener tres letras mayúsculas seguidas de dos o tres dígitos y, opcionalmente, una letra mayúscula'
    ),
  tipoVehiculo: z.nativeEnum(VehicleType, { message: 'El tipo de vehículo no es válido' }),
  idEspacio: z.number().int(),
  idArea: z.string().max(10, { message: 'El id del área debe tener máximo 10 caracteres' })
})

export const RegisterFormSchemaUpdate = RegisterFormSchema.omit({
  placa: true,
  tipoVehiculo: true,
  idEspacio: true,
  idArea: true
}).extend({
  fechaHoraEntrada: z.string().datetime().optional(),
  fechaHoraSalida: z.string().datetime().optional()
})
