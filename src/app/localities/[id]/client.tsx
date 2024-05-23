'use client'

import type { Localitie } from '@/modules/localitie/types'

import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import api from '@/modules/localitie/api'
import DialogLocalitie from '@/modules/localitie/components/dialog'

function LocalitieClient({ data }: { data: Localitie }) {
  const { idLocalidad } = data
  const router = useRouter()

  const handleDelete = async () => {
    try {
      await api.delete({ idLocalidad })

      router.push('/localities')
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
    }
  }

  return (
    <section className='flex gap-5'>
      <DialogLocalitie localitie={data} />

      <Button title='Eliminar' variant='ghost' onClick={handleDelete}>
        Eliminar
      </Button>
    </section>
  )
}

export default LocalitieClient
