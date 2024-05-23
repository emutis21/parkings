import api from '@/modules/parking/api'
import ParkingScreen from '@/modules/parking/screens/Parking'

export default async function Page() {
  const parkings = await api.list()

  return (
    <main className='h-full w-full'>
      <h1 className='py-5 text-center text-2xl font-bold'>Parqueaderos</h1>

      <ParkingScreen parkings={parkings} />
    </main>
  )
}
