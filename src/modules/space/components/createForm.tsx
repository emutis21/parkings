import type { Area } from '@/modules/area/types'
import type { z } from 'zod'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { SpaceFormSchema } from '@/schemas/spacesFormSchema'
import { toast } from '@/components/ui/use-toast'
import { ToastAction } from '@/components/ui/toast'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { DialogClose } from '@/components/ui/dialog'

import api from '../api'

interface CreateSpaceProps {
  idArea?: Area['idArea']
}

function CreateSpace({ idArea }: CreateSpaceProps) {
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof SpaceFormSchema>>({
    resolver: zodResolver(SpaceFormSchema),
    defaultValues: {
      disponible: true,
      idArea
    }
  })

  const onSubmit = async (data: z.infer<typeof SpaceFormSchema>) => {
    setLoading(true)
    try {
      const newSpace = await api.create(data)

      router.refresh()
      // router.back()

      toast({
        title: `Area ${newSpace.idEspacio.toString()}`,
        description: 'Area creada correctamente',
        action: (
          <ToastAction
            altText='Ventana de confirmación'
            className='text-blue-500 hover:text-blue-700'
          >
            {loading ? 'Cargando...' : 'Cerrar'}
          </ToastAction>
        )
      })
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form className='flex w-full flex-col gap-6' onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='disponible'
          render={({ field }) => (
            <FormItem className='hidden'>
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel className='mt-0 cursor-pointer text-center'>Disponible</FormLabel>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='idArea'
          render={({ field }) => (
            <FormItem className='hidden'>
              <FormLabel>ID del área</FormLabel>
              <FormControl>
                <Input placeholder='A007' type='text' {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <DialogClose asChild>
          <Button
            className='w-fit self-center'
            style={{
              viewTransitionName: 'button'
            }}
            title='Guardar'
            type='submit'
            variant='default'
          >
            Crear
          </Button>
        </DialogClose>
      </form>
    </Form>
  )
}

export default CreateSpace
