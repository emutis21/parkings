import type { Parking } from '../parking/types'

export enum VehicleType {
  AUTOMOVIL = 'AUTOMOVIL',
  MOTOCICLETA = 'MOTOCICLETA',
  BICICLETA = 'BICICLETA'
}

export interface Area {
  idArea: string
  descripcion: string
  tipo: VehicleType
  idParqueadero: Parking['idParqueadero']
}
