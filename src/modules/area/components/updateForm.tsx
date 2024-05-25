import type { z } from 'zod'
import type { Area } from '../types'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ToastAction } from '@/components/ui/toast'
import { toast } from '@/components/ui/use-toast'
import { AreaFormSchemaUpdate } from '@/schemas/areasFormSchema'

import api from '../api'

function UpdateArea({ area }: { area: Area }) {
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  const { descripcion } = area

  const form = useForm<z.infer<typeof AreaFormSchemaUpdate>>({
    resolver: zodResolver(AreaFormSchemaUpdate),
    defaultValues: {
      descripcion
    }
  })

  const onSubmit = async (data: z.infer<typeof AreaFormSchemaUpdate>) => {
    setLoading(true)
    try {
      const updatedArea = await api.update({
        idArea: area.idArea,
        descripcion: data.descripcion,
        tipo: area.tipo,
        idParqueadero: area.idParqueadero
      })

      router.push(`/parkings/${area.idParqueadero}`)
      router.refresh()

      toast({
        title: `Area ${updatedArea.idArea}`,
        description: 'Area actualizada correctamente',
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
          name='descripcion'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Input placeholder='Area carros 6 en Usaquén' type='text' {...field} />
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

export default UpdateArea
