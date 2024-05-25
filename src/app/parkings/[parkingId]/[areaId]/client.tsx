'use client'

import type { Area } from '~/area/types'

import api from '~/area/api'
import DialogArea from '~/area/components/dialog'

import DialogDelete from '@/components/dialogDelete'
import { useDeleteEntity } from '@/lib/deleteEntity'

function AreaClient({ data, noSpaces }: { data: Area; noSpaces: boolean }) {
  const { idArea } = data

  const handleDelete = useDeleteEntity({
    idEntity: idArea,
    deleteEntity: api.delete
  })

  return (
    <div className='flex gap-5'>
      {noSpaces ? (
        <DialogDelete entity='area' handleDelete={handleDelete} nameEntity={idArea} />
      ) : null}

      <DialogArea area={data} />
    </div>
  )
}

export default AreaClient
