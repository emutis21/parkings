import apiParking from '@/modules/parking/api'
import apiLocalidad from '@/modules/localitie/api'
// import ParkingScreen from '@/modules/parking/screens/Parking'

export default async function Page({ params: { parkingId } }: { params: { parkingId: string } }) {
  const parking = await apiParking.fetch(parkingId)
  const localitie = await apiLocalidad.fetch(parking.idLocalidad)

  // console.log(parking)

  const { nombreLocalidad } = localitie

  const { direccion, disponible, idParqueadero } = parking

  return (
    <main className='h-full w-full'>
      <h1 className='py-5 text-center text-2xl font-bold'>
        Parqueadero {idParqueadero} en {nombreLocalidad}
      </h1>

      <section className='flex flex-col gap-5 p-5'>
        <p>
          <span className='font-bold'>Dirección:</span> {direccion}
        </p>
        <p>
          <span className='font-bold'>Disponible:</span> {disponible ? 'Sí' : 'No'}
        </p>
      </section>

      {/* <ParkingScreen parkings={parkings} /> */}
    </main>
  )
}
