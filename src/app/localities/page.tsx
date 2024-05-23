import api from '@/modules/localitie/api'
import LocalitieScreen from '@/modules/localitie/screens/Localitie'

export default async function Page() {
  const localities = await api.list()

  return (
    <main className='h-full w-full'>
      <h1 className='py-5 text-center text-2xl font-bold'>Localidades</h1>

      <LocalitieScreen localities={localities} />
    </main>
  )
}
