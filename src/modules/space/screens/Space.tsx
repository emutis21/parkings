import type { Area } from '~/area/types'

import type { Space } from '../types'

import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'

import DialogSpace from '../components/dialog'

interface SpacesListProps {
  idEspacio: Space['idEspacio']
  disponible: Space['disponible']
  tipo: Area['tipo']
  areaId: Area['idArea']
}

function SpacesScreen({ idEspacio, disponible, tipo, areaId }: SpacesListProps) {
  return (
    <li
      key={idEspacio}
      style={{
        viewTransitionName: `space-${idEspacio.toString()}`
      }}
    >
      <Dialog>
        <DialogTrigger className='w-full'>
          <Card
            key={idEspacio}
            className='flex flex-col justify-center text-center'
            data-type={disponible ? 'disponible' : 'ocupado'}
          >
            <CardHeader>
              <CardTitle className='flex text-center [justify-content:_center]'>
                <span>{idEspacio}</span>
              </CardTitle>
            </CardHeader>
            <CardFooter>
              <span className='font-normal'>{disponible ? 'Disponible' : 'Ocupado'}</span>
            </CardFooter>
          </Card>
        </DialogTrigger>
        <DialogSpace areaId={areaId} disponible={disponible} idEspacio={idEspacio} tipo={tipo} />
      </Dialog>
    </li>
  )
}

export default SpacesScreen
