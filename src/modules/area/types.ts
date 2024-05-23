import type { Parking } from '../parking/types'

export interface Area {
  idArea: string
  descripcion: string
  tipo: 'AUTOMOVIL' | 'MOTOCICLETA' | 'BICICLETA'
  idParqueadero: Parking['idParqueadero']
}
