import type { Area } from '../area/types'
import type { Space } from '../space/types'

export interface Register {
  idRegistro: `${string}-${string}-${string}-${string}-${string}`
  placa: string
  fechaHoraEntrada?: Date
  fechaHoraSalida?: Date
  tipoVehiculo: Area['tipo']
  idEspacio: Space['idEspacio']
  idArea: Area['idArea']
}
