import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { LocalitieFormSchemaUpdate } from '@/schemas/localitiesFormSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import api from '../api'
import { Localitie } from '../types'

function UpdateLocalitie({ localitie }: { localitie: Localitie }) {
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  const { idLocalidad, nombreLocalidad } = localitie

  const form = useForm<z.infer<typeof LocalitieFormSchemaUpdate>>({
    resolver: zodResolver(LocalitieFormSchemaUpdate),
    defaultValues: {
      nombreLocalidad: nombreLocalidad,
    },
  })

  const onSubmit = async (data: z.infer<typeof LocalitieFormSchemaUpdate>) => {
    setLoading(true)
    if (!idLocalidad) return
    try {
      const newLocalitie = await api.update({ idLocalidad, nombreLocalidad: data.nombreLocalidad })

      router.push(`/localities/${newLocalitie.idLocalidad}`)
    } catch (error) {
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
          title='Guardar'
          type='submit'
          style={{
            viewTransitionName: 'button',
          }}
        >
          Guardar
        </Button>
      </form>
    </Form>
  )
}

export default UpdateLocalitie
