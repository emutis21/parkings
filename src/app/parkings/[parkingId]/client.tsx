'use client'

import type { Parking } from '~/parking/types'

import api from '~/parking/api'
import DialogParking from '~/parking/components/dialog'

import DialogDelete from '@/components/dialogDelete'
import { useDeleteEntity } from '@/lib/deleteEntity'

function ParkingClient({ data }: { data: Parking }) {
  const { idParqueadero } = data

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
