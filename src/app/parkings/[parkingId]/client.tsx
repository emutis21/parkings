'use client'

import type { Parking } from '@/modules/parking/types'

import DialogDelete from '@/components/dialogDelete'
import { useDeleteEntity } from '@/lib/deleteEntity'
import api from '@/modules/parking/api'
import DialogParking from '@/modules/parking/components/dialog'

function ParkingClient({ data }: { data: Parking }) {
  const { idLocalidad, direccion, disponible, idParqueadero } = data

  const handleDelete = useDeleteEntity({
    idEntity: idParqueadero,
    deleteEntity: api.delete
  })

  return (
    <div className='flex gap-5'>
      <DialogDelete entity='parqueadero' handleDelete={handleDelete} nameEntity={idParqueadero} />

      <DialogParking parking={data} />
    </div>
  )
}

export default ParkingClient
