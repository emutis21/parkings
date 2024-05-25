import type { z } from 'zod'
import type { Parking } from '../types'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { ParkingFormSchemaUpdate } from '@/schemas/parkingsFormSchema'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ToastAction } from '@/components/ui/toast'
import { toast } from '@/components/ui/use-toast'

import api from '../api'

function UpdateParking({ parking }: { parking: Parking }) {
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  const { direccion, disponible } = parking

  const form = useForm<z.infer<typeof ParkingFormSchemaUpdate>>({
    resolver: zodResolver(ParkingFormSchemaUpdate),
    defaultValues: {
      direccion,
      disponible
    }
  })

  const onSubmit = async (data: z.infer<typeof ParkingFormSchemaUpdate>) => {
    setLoading(true)
    try {
      const updatedParking = await api.update({
        idParqueadero: parking.idParqueadero,
        direccion: data.direccion,
        disponible: data.disponible,
        idLocalidad: parking.idLocalidad
      })

      router.push(`/localities/${updatedParking.idLocalidad}`)
      router.refresh()

      toast({
        title: `Parqueadero ${updatedParking.idParqueadero}`,
        description: 'Parqueadero actualizado correctamente',
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
          name='direccion'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dirección</FormLabel>
              <FormControl>
                <Input placeholder='Calle 123' type='text' {...field} />
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

        <Button
          style={{
            viewTransitionName: 'button'
          }}
          title='Guardar'
          type='submit'
        >
          Guardar
        </Button>
      </form>
    </Form>
  )
}

export default UpdateParking
