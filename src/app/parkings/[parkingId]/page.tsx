import apiParking from '@/modules/parking/api'
import apiLocalidad from '@/modules/locality/api'

import ParkingClient from './client'

export default async function Page({ params: { parkingId } }: { params: { parkingId: string } }) {
  const parking = await apiParking.fetch(parkingId)
  const locality = await apiLocalidad.fetch(parking.idLocalidad)

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
    </main>
  )
}
