'use client'

import type { Area } from '~/area/types'

import type { Space } from '../types'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import CreateRegister from '@/modules/register/components/createForm'

interface DialogSpaceProps {
  idEspacio: Space['idEspacio']
  disponible: Space['disponible']
  tipo: Area['tipo']
  areaId: Area['idArea']
}

function DialogSpace({ idEspacio, disponible, tipo, areaId }: DialogSpaceProps) {
  if (disponible) {
    return (
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>¿Cómo deseas ocupar este espacio {idEspacio}?</DialogTitle>
        </DialogHeader>
        <Tabs className='flex w-full flex-col justify-center' defaultValue='register'>
          <TabsList className='self-center'>
            <TabsTrigger value='register'>Registro</TabsTrigger>
            <TabsTrigger value='password'>Contrato</TabsTrigger>
          </TabsList>
          <TabsContent value='register'>
            <CreateRegister idArea={areaId} idEspacio={idEspacio} tipo={tipo} />
          </TabsContent>
          <TabsContent value='password'>Change your password here.</TabsContent>
        </Tabs>
      </DialogContent>
    )
  }

  return (
    <DialogContent className='sm:max-w-[425px]'>
      <DialogHeader>
        <DialogTitle>Gestionar pago de espacio {idEspacio}</DialogTitle>
      </DialogHeader>
      <Tabs className='flex w-full flex-col justify-center' defaultValue='register'>
        <TabsList className='self-center'>
          <TabsTrigger value='register'>Registro</TabsTrigger>
          <TabsTrigger value='password'>Password</TabsTrigger>
        </TabsList>
        <TabsContent value='register'>Make changes to your register here.</TabsContent>
        <TabsContent value='password'>Change your password here.</TabsContent>
      </Tabs>
    </DialogContent>
  )
}

export default DialogSpace
