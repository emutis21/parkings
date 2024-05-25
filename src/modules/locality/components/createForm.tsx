import type { z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { LocalityFormSchema } from '@/schemas/localitiesFormSchema'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { ToastAction } from '@/components/ui/toast'
import { DialogClose } from '@/components/ui/dialog'

import api from '../api'

function CreateLocality() {
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof LocalityFormSchema>>({
    resolver: zodResolver(LocalityFormSchema),
    defaultValues: {
      idLocalidad: '',
      nombreLocalidad: ''
    }
  })

  const onSubmit = async (data: z.infer<typeof LocalityFormSchema>) => {
    setLoading(true)
    try {
      data.idLocalidad = data.idLocalidad.toUpperCase()

      const newLocality = await api.create(data)

      router.refresh()

      toast({
        title: `Localidad ${newLocality.nombreLocalidad}`,
        description: 'Localidad creada correctamente',
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
          name='idLocalidad'
          render={({ field }) => (
            <FormItem>
              <FormLabel>ID de la localidad</FormLabel>
              <FormControl>
                <Input placeholder='02MART' type='text' {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='nombreLocalidad'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre de la localidad</FormLabel>
              <FormControl>
                <Input placeholder='Los Mártires' type='text' {...field} />
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

export default CreateLocality
