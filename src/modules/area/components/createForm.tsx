import type { Parking } from '~/parking/types'

import type { z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { ToastAction } from '@/components/ui/toast'
import { toast } from '@/components/ui/use-toast'
import { AreaFormSchema } from '@/schemas/areasFormSchema'

import api from '../api'
import { VehicleType } from '../types'

function CreateArea({ idParqueadero }: { idParqueadero?: Parking['idParqueadero'] }) {
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof AreaFormSchema>>({
    resolver: zodResolver(AreaFormSchema),
    defaultValues: {
      idArea: '',
      descripcion: '',
      tipo: 'AUTOMOVIL' as VehicleType,
      idParqueadero
    }
  })

  const onSubmit = async (data: z.infer<typeof AreaFormSchema>) => {
    setLoading(true)
    try {
      const newArea = await api.create(data)

      router.push(`/parkings/${idParqueadero!}/${newArea.idArea}`)
      router.refresh()

      toast({
        title: `Area ${newArea.idArea}`,
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
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form className='flex w-full flex-col gap-6' onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='idArea'
          render={({ field }) => (
            <FormItem>
              <FormLabel>ID del área</FormLabel>
              <FormControl>
                <Input placeholder='A007' type='text' {...field} />
              </FormControl>
            </FormItem>
          )}
        />

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

        <FormField
          control={form.control}
          name='tipo'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de vehículo</FormLabel>
              <Select defaultValue={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='MOTOCICLETA' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.entries(VehicleType).map(([key, value]) => (
                    <SelectItem key={key} value={value}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='idParqueadero'
          render={({ field }) => (
            <FormItem>
              <FormLabel>ID del parqueadero</FormLabel>
              <FormControl>
                <Input
                  disabled
                  className='pointer-events-none'
                  placeholder='001Park'
                  type='text'
                  {...field}
                />
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

export default CreateArea
