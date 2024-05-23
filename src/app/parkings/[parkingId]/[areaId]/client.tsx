import type { Area } from '~/area/types'

import api from '~/area/api'

import DialogDelete from '@/components/dialogDelete'
import { useDeleteEntity } from '@/lib/deleteEntity'

function AreaClient({ data }: { data: Area }) {
  const { idArea, descripcion, tipo } = data

  const handleDelete = useDeleteEntity({
    idEntity: idArea,
    deleteEntity: api.delete
  })

  return (
    <div className='flex gap-5'>
      <DialogDelete entity='area' handleDelete={handleDelete} nameEntity={idArea} />

      {/* <DialogArea area={data} /> */}
    </div>
  )
}

export default AreaClient
