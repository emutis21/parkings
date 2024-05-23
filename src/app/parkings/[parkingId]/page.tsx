import { Link } from 'next-view-transitions'

import apiParking from '~/parking/api'
import apiLocality from '~/locality/api'
import apiArea from '~/area/api'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

import ParkingClient from './client'

export default async function Page({ params: { parkingId } }: { params: { parkingId: string } }) {
  const parking = await apiParking.fetch(parkingId)
  const locality = await apiLocality.fetch(parking.idLocalidad)
  const areas = await apiArea.fetchByParking(parkingId)

  const { nombreLocalidad } = locality

  const { direccion, disponible, idParqueadero } = parking

  return (
    <main className='h-full w-full'>
      <header className='mt-5 flex w-full flex-col gap-5'>
        <h1
          className='py-5 text-center text-2xl font-bold'
          style={{
            viewTransitionName: `${nombreLocalidad}-title`
          }}
        >
          Parqueadero {idParqueadero} en {nombreLocalidad}
        </h1>
        <div className='flex w-full justify-between'>
          <div className='flex items-center gap-5'>
            <span className='font-semibold'>{direccion}</span>
            {disponible ? (
              <span className='font-normal text-green-500'>Disponible</span>
            ) : (
              <span className='font-normal text-red-500'>No disponible</span>
            )}
          </div>
          <ParkingClient data={parking} />
        </div>
      </header>
      {areas.length > 0 ? (
        <section>
          <h2 className='py-5 text-center text-xl font-bold'>Áreas</h2>
          <ul className=''>
            {areas.map(({ idArea, descripcion, tipo }) => (
              <li
                key={idArea}
                style={{
                  viewTransitionName: `area-${idArea}`
                }}
              >
                <Link href={`/parkings/${idParqueadero}/${idArea}`}>
                  <Card key={idArea} className='hover:bg-gray-900'>
                    <CardHeader>
                      <CardTitle>{idArea}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <span>{descripcion}</span>
                    </CardContent>
                    <CardFooter>{tipo}</CardFooter>
                  </Card>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <h2 className='py-5 text-center text-xl font-bold'>No hay áreas disponibles</h2>
      )}
    </main>
  )
}
