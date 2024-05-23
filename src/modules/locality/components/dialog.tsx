'use client'

import type { Locality } from '../types'

import { buttonVariants } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

import CreateLocality from './createForm'
import UpdateLocality from './updateForm'

function DialogLocality({ locality }: { locality?: Locality }) {
  return (
    <Dialog>
      <DialogTrigger>
        <span className={buttonVariants({ variant: 'secondary' })}>
          {locality ? 'Editar' : 'Agregar'} localidad
        </span>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>{locality ? 'Editar' : 'Agregar'} localidad</DialogTitle>
          <DialogDescription>
            {locality ? 'Edita la información de la localidad' : 'Agrega una nueva localidad'}
          </DialogDescription>
        </DialogHeader>
        {locality ? <UpdateLocality locality={locality} /> : <CreateLocality />}
      </DialogContent>
    </Dialog>
  )
}

export default DialogLocality
