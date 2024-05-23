'use client'

import type { Locality } from '@/modules/locality/types'

import DialogDelete from '@/components/dialogDelete'
import { useDeleteEntity } from '@/lib/deleteEntity'
import api from '@/modules/locality/api'
import DialogLocality from '@/modules/locality/components/dialog'

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
