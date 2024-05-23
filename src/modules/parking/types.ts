import type { Locality } from '../locality/types'

export interface Parking {
  idParqueadero: string
  direccion: string
  disponible: boolean
  idLocalidad: Locality['idLocalidad']
}
