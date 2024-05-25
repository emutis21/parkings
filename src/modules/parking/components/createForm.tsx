import type { Locality } from '~/locality/types'

import type { z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ToastAction } from '@/components/ui/toast'
import { toast } from '@/components/ui/use-toast'
import { ParkingFormSchema } from '@/schemas/parkingsFormSchema'
import { DialogClose } from '@/components/ui/dialog'

import api from '../api'

function CreateParking({ idLocalidad }: { idLocalidad?: Locality['idLocalidad'] }) {
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof ParkingFormSchema>>({
    resolver: zodResolver(ParkingFormSchema),
    defaultValues: {
      idParqueadero: '',
      direccion: '',
      disponible: false,
      idLocalidad
    }
  })

  const onSubmit = async (data: z.infer<typeof ParkingFormSchema>) => {
    setLoading(true)
    try {
      data.idParqueadero = data.idParqueadero.toUpperCase()

      const newParking = await api.create(data)

      router.refresh()

      toast({
        title: `Parqueadero ${newParking.idParqueadero}`,
        description: 'Parqueadero creado correctamente',
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
          name='idParqueadero'
          render={({ field }) => (
            <FormItem>
              <FormLabel>ID del parqueadero</FormLabel>
              <FormControl>
                <Input placeholder='007PARK' type='text' {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='direccion'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dirección</FormLabel>
              <FormControl>
                <Input placeholder='Calle 123 # 76 - 22' type='text' {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='disponible'
          render={({ field }) => (
            <FormItem className='flex place-items-center gap-2 space-y-0 text-center'>
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel className='mt-0 cursor-pointer text-center'>Disponible</FormLabel>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          defaultValue={idLocalidad}
          name='idLocalidad'
          render={({ field }) => (
            <FormItem>
              <FormLabel>ID de la localidad</FormLabel>
              <FormControl>
                <Input
                  disabled
                  className='pointer-events-none'
                  placeholder='02MART'
                  type='text'
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <DialogClose asChild>
          <Button
            style={{
              viewTransitionName: 'button'
            }}
            title='Guardar'
            type='submit'
          >
            Guardar
          </Button>
        </DialogClose>
      </form>
    </Form>
  )
}

export default CreateParking
