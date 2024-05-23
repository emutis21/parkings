import { Link } from 'next-view-transitions'

import api from '@/modules/localitie/api'
import apiParking from '@/modules/parking/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import LocalitieClient from './client'

export default async function Page({ params: { id } }: { params: { id: string } }) {
  const data = await api.fetch(id)
  const parkings = await apiParking.fetchByLocalitie(id)

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
        <LocalitieClient data={data} />
      </header>
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
                    {/* <p>{disponible ? 'Disponible' : 'No disponible'}</p> */}
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
        </ul>
      )}
    </main>
  )
}
