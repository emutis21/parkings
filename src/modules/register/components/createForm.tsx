import type { Area } from '~/area/types'
import type { Space } from '~/space/types'

import type { z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { RegisterFormSchema } from '@/schemas/registerFormSchema'
import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ToastAction } from '@/components/ui/toast'
import { toast } from '@/components/ui/use-toast'

import api from '../api'

interface CreateRegisterProps {
  idArea?: Area['idArea']
  tipo?: Area['tipo']
  idEspacio?: Space['idEspacio']
}

function CreateRegister({ idArea, tipo, idEspacio }: CreateRegisterProps) {
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      placa: '',
      tipoVehiculo: tipo,
      idEspacio,
      idArea
    }
  })

  const onSubmit = async (data: z.infer<typeof RegisterFormSchema>) => {
    setLoading(true)
    try {
      const newSpace = await api.create(data)

      router.refresh()

      toast({
        title: `Registro ${newSpace.idRegistro} creado`,
        description: 'El registro ha sido creado exitosamente',
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
          name='placa'
          render={({ field }) => (
            <FormItem className=''>
              <FormControl>
                <Input placeholder='CHR540' type='text' {...field} />
              </FormControl>
              <FormLabel className='mt-0 cursor-pointer text-center'>Placa del vehículo</FormLabel>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='idArea'
          render={({ field }) => (
            <FormItem className='pointer-events-none'>
              <FormLabel>ID del área</FormLabel>
              <FormControl>
                <Input disabled placeholder='A007' type='text' {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='idEspacio'
          render={({ field }) => (
            <FormItem className='pointer-events-none'>
              <FormLabel>ID del espacio</FormLabel>
              <FormControl>
                <Input disabled placeholder='14' type='text' {...field} />
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

export default CreateRegister
