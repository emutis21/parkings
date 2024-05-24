'use client'

import type { Area } from '../types'

import { useParams } from 'next/navigation'

import { buttonVariants } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

import CreateArea from './createForm'
import UpdateArea from './updateForm'

function DialogArea({ area }: { area?: Area }) {
  const params = useParams<{ parkingId: Area['idParqueadero'] }>()

  return (
    <Dialog>
      <DialogTrigger>
        <span className={buttonVariants({ variant: 'secondary' })}>
          {area ? 'Editar' : 'Agregar'} área
        </span>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>{area ? 'Editar' : 'Agregar'} área</DialogTitle>
          <DialogDescription>
            {area ? 'Edita la información de la área' : 'Agrega una nueva área'}
          </DialogDescription>
        </DialogHeader>
        {area ? <UpdateArea area={area} /> : <CreateArea idParqueadero={params.parkingId} />}
      </DialogContent>
    </Dialog>
  )
}

export default DialogArea
