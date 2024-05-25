import type { Area } from '../area/types'

export interface Space {
  idEspacio: number
  disponible: boolean
  idArea: Area['idArea']
}
