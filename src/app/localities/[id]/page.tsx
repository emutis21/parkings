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

  const noParkings = parkings.length === 0

  const sortedParkings = parkings.sort((a, b) => a.idParqueadero.localeCompare(b.idParqueadero))

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
        <LocalityClient data={data} noParkings={noParkings} />
      </header>

      {noParkings ? (
        <section>
          <h2 className='mb-6 py-6 text-center text-2xl font-semibold'>Crear un parqueadero</h2>
          <DialogParking />
        </section>
      ) : (
        <h2 className='mb-6 py-6 text-center text-2xl font-semibold'>Selecciona un parqueadero</h2>
      )}

      {parkings.length > 0 ? (
        <ul className=''>
          {sortedParkings.map(({ idParqueadero, direccion, disponible }) => (
            <li
              key={idParqueadero}
              style={{
                viewTransitionName: `card-${idParqueadero}`
              }}
            >
              <Link href={`/parkings/${idParqueadero}`}>
                <Card key={idParqueadero} data-type={disponible ? 'disponible' : 'ocupado'}>
                  <CardHeader>
                    <CardTitle>
                      <p>{idParqueadero}</p>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{direccion}</p>
                    {disponible ? <span>Disponible</span> : <span>No disponible</span>}
                  </CardContent>
                </Card>
              </Link>
            </li>
          ))}
          <li className='grid h-full w-full place-content-center'>
            <DialogParking />
          </li>
        </ul>
      ) : null}
    </main>
  )
}
