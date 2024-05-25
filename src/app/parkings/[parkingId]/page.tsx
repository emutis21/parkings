import apiArea from '~/area/api'
import DialogArea from '~/area/components/dialog'
import apiLocality from '~/locality/api'
import apiParking from '~/parking/api'

import ParkingIdScreen from '@/modules/parking/screens/ParkingId'

import ParkingClient from './client'

export default async function Page({ params: { parkingId } }: { params: { parkingId: string } }) {
  const parking = await apiParking.fetch(parkingId)
  const locality = await apiLocality.fetch(parking.idLocalidad)
  const areas = await apiArea.fetchByParking(parkingId)

  const { nombreLocalidad } = locality

  const { direccion, disponible, idParqueadero } = parking

  const noAreas = areas.length === 0

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
          <ParkingClient data={parking} noAreas={noAreas} />
        </div>
      </header>
      {noAreas ? (
        <section>
          <h2 className='py-5 text-center text-xl font-bold'>Crear un área</h2>
          <DialogArea />
        </section>
      ) : (
        <h2 className='py-5 text-center text-xl font-bold'>Selecciona un área</h2>
      )}
      {areas.length > 0 ? (
        <section>
          <h2 className='py-5 text-center text-xl font-bold'>Áreas</h2>
          <ul className='[grid-template-columns:_repeat(auto-fill,_minmax(200px,_1fr))]'>
            <ParkingIdScreen areas={areas} idParqueadero={idParqueadero} />
            <li className='grid h-full w-full place-content-center'>
              <DialogArea />
            </li>
          </ul>
        </section>
      ) : null}
    </main>
  )
}
