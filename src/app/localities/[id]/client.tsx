'use client'

import type { Locality } from '~/locality/types'

import api from '~/locality/api'
import DialogLocality from '~/locality/components/dialog'

import DialogDelete from '@/components/dialogDelete'
import { useDeleteEntity } from '@/lib/deleteEntity'

function LocalityClient({ data }: { data: Locality }) {
  const { idLocalidad, nombreLocalidad } = data

  const handleDelete = useDeleteEntity({
    idEntity: idLocalidad,
    deleteEntity: api.delete
  })

  return (
    <section className='flex gap-5'>
      <DialogDelete entity='localidad' handleDelete={handleDelete} nameEntity={nombreLocalidad} />

      <DialogLocality locality={data} />
    </section>
  )
}

export default LocalityClient
