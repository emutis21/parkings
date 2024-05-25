'use client'

import type { Area } from '~/area/types'

import { useParams } from 'next/navigation'

import { buttonVariants } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

import CreateSpace from './createForm'

function DialogCreateSpace() {
  const { areaId } = useParams<{ areaId: Area['idArea'] }>()

  return (
    <Dialog>
      <DialogTrigger className='h-full w-full'>
        <span className={buttonVariants({ variant: 'secondary' })}>+ Añadir</span>
      </DialogTrigger>
      <DialogContent className='gap-10 sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle className='text-center'>
            Crea un nuevo espacio en el área {areaId}
          </DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <CreateSpace idArea={areaId} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DialogCreateSpace
