import { Link } from 'next-view-transitions'

import apiParking from '~/parking/api'
import DialogParking from '~/parking/components/dialog'
import apiLocality from '~/locality/api'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import LocalityClient from './client'

export default async function Page({ params: { id } }: { params: { id: string } }) {
  const data = await apiLocality.fetch(id)

  const parkings = await apiParking.fetchByLocality(id)

  const { idLocalidad, nombreLocalidad } = data

  return (
    <main>
      <header className='flex items-center'>
        <h1
          className='mr-auto py-5 text-center text-2xl font-bold'
          style={{
            viewTransitionName: `${idLocalidad}-title`
          }}
        >
          {idLocalidad} - {nombreLocalidad}
        </h1>
        <LocalityClient data={data} />
      </header>
      <h2 className='mb-6 py-6 text-center text-2xl font-semibold'>Seleccione un parqueadero</h2>
      {parkings.length > 0 && (
        <ul className=''>
          {parkings.map(({ idParqueadero, direccion, disponible }) => (
            <li
              key={idParqueadero}
              style={{
                viewTransitionName: `card-${idParqueadero}`
              }}
            >
              <Link href={`/parkings/${idParqueadero}`}>
                <Card key={idParqueadero} className='hover:bg-gray-900'>
                  <CardHeader>
                    <CardTitle>
                      <p>{idParqueadero}</p>
                    </CardTitle>
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
          <li className='grid h-full w-full place-content-center'>
            <DialogParking idLocalidad={idLocalidad} />
          </li>
        </ul>
      )}
    </main>
  )
}
