import type { Area } from '~/area/types'

import type { Parking } from '../types'

import { Link } from 'next-view-transitions'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

interface ParkingIdScreenProps {
  areas: Area[]
  idParqueadero: Parking['idParqueadero']
}

function ParkingIdScreen({ areas, idParqueadero }: ParkingIdScreenProps) {
  const sortedAreas = areas.sort((a, b) => a.idArea.localeCompare(b.idArea))

  return (
    <>
      {sortedAreas.map(({ idArea, descripcion, tipo }) => (
        <li
          key={idArea}
          style={{
            viewTransitionName: `area-${idArea}`
          }}
        >
          <Link href={`/parkings/${idParqueadero}/${idArea}`}>
            <Card key={idArea} className='flex h-full flex-col' data-type={tipo}>
              <CardHeader>
                <CardTitle>{idArea}</CardTitle>
              </CardHeader>
              <CardContent className='flex-1'>
                <span className=''>{descripcion}</span>
              </CardContent>
              <CardFooter>
                <span className='font-normal' data-type={tipo}>
                  {tipo}
                </span>
              </CardFooter>
            </Card>
          </Link>
        </li>
      ))}
    </>
  )
}

export default ParkingIdScreen
