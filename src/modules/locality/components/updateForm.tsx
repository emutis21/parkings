import type { z } from 'zod'
import type { Locality } from '../types'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { LocalityFormSchemaUpdate } from '@/schemas/localitiesFormSchema'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { ToastAction } from '@/components/ui/toast'

import api from '../api'

function UpdateLocality({ locality }: { locality: Locality }) {
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  const { idLocalidad, nombreLocalidad } = locality

  const form = useForm<z.infer<typeof LocalityFormSchemaUpdate>>({
    resolver: zodResolver(LocalityFormSchemaUpdate),
    defaultValues: {
      nombreLocalidad
    }
  })

  const onSubmit = async (data: z.infer<typeof LocalityFormSchemaUpdate>) => {
    setLoading(true)
    if (!idLocalidad) return
    try {
      const localityUpdated = await api.update({
        idLocalidad,
        nombreLocalidad: data.nombreLocalidad
      })

      router.push(`/localities`)
      router.refresh()

      toast({
        title: `Localidad ${localityUpdated.nombreLocalidad}`,
        description: 'Localidad actualizada correctamente',
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

export default UpdateLocality
