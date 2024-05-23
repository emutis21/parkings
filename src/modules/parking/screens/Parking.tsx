import type { Parking } from '../types'

import Link from 'next/link'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

// import DialogLocalitie from '../components/dialog'

function ParkingScreen({ parkings }: { parkings: Parking[] }) {
  return (
    <ul className=''>
      {parkings.map(({ idParqueadero, direccion, disponible, idLocalidad }) => (
        <li
          key={idParqueadero}
          style={{
            viewTransitionName: `card-${idParqueadero}`
          }}
        >
          <Link href={`/parkings/${idParqueadero}`}>
            <Card className='hover:bg-gray-900'>
              <CardHeader>
                <CardTitle>{idLocalidad}</CardTitle>
                <CardDescription>{idParqueadero}</CardDescription>
              </CardHeader>

              <CardContent>
                <p>{direccion}</p>
                {disponible ? (
                  <p className='text-green-500'>Disponible</p>
                ) : (
                  <p className='text-red-500'>No disponible</p>
                )}
              </CardContent>
            </Card>
          </Link>
        </li>
      ))}

      {/* <DialogLocalitie /> */}
    </ul>
  )
}

export default ParkingScreen
