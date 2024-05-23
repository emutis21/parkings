import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { LocalitieFormSchema } from '@/schemas/localitiesFormSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import api from '../api'

function CreateLocalitie() {
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof LocalitieFormSchema>>({
    resolver: zodResolver(LocalitieFormSchema),
    defaultValues: {
      idLocalidad: '',
      nombreLocalidad: '',
    },
  })

  const onSubmit = async (data: z.infer<typeof LocalitieFormSchema>) => {
    setLoading(true)
    try {
      const newLocalitie = await api.create(data)

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

export default CreateLocalitie
