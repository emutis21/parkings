import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

import { Button, buttonVariants } from './ui/button'

interface DialogProps {
  entity: string
  nameEntity: string
  handleDelete: () => void
}

function DialogDelete({ entity, nameEntity, handleDelete }: DialogProps) {
  return (
    <Dialog>
      <DialogTrigger>
        <span className={buttonVariants({ variant: 'ghost' })}>Eliminar {entity}</span>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Elimina {entity}</DialogTitle>
          <DialogDescription>
            Estás a punto de eliminar {entity} <strong>{nameEntity}</strong>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type='button' variant='ghost'>
              Cancelar
            </Button>
          </DialogClose>
          <Button variant='destructive' onClick={handleDelete}>
            Eliminar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DialogDelete
