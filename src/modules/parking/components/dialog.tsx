'use client'

import type { Locality } from '~/locality/types'

import type { Parking } from '../types'

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

import CreateParking from './createForm'
import UpdateParking from './updateForm'

function DialogParking({ parking }: { parking?: Parking }) {
  const params = useParams<{ id: Locality['idLocalidad'] }>()

  return (
    <Dialog>
      <DialogTrigger>
        <span className={buttonVariants({ variant: 'secondary' })}>
          {parking ? 'Editar' : 'Agregar'} parqueadero
        </span>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>{parking ? 'Editar' : 'Agregar'} parqueadero</DialogTitle>
          <DialogDescription>
            {parking ? 'Edita la información del parqueadero' : 'Agrega un un nuevo parqueadero'}
          </DialogDescription>
        </DialogHeader>
        {parking ? <UpdateParking parking={parking} /> : <CreateParking idLocalidad={params.id} />}
      </DialogContent>
    </Dialog>
  )
}

export default DialogParking
