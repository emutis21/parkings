'use client'

import { buttonVariants } from '@/components/ui/button'
import type { Localitie } from '../types'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import CreateLocalitie from './createForm'
import UpdateLocalitie from './updateForm'

function DialogLocalitie({ localitie }: { localitie?: Localitie }) {
  return (
    <Dialog>
      <DialogTrigger>
        <span className={buttonVariants({ variant: 'secondary' })}>{localitie ? 'Editar' : 'Agregar'} localidad</span>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>{localitie ? 'Editar' : 'Agregar'} localidad</DialogTitle>
          <DialogDescription>
            {localitie ? 'Edita la información de la localidad' : 'Agrega una nueva localidad'}
          </DialogDescription>
        </DialogHeader>
        {localitie ? <UpdateLocalitie localitie={localitie} /> : <CreateLocalitie />}
      </DialogContent>
    </Dialog>
  )
}

export default DialogLocalitie
