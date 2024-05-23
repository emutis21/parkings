import api from '~/locality/api'
import LocalityScreen from '~/locality/screens/Locality'

export default async function Page() {
  const localities = await api.list()

  return (
    <main className='h-full w-full'>
      <h1 className='py-5 text-center text-2xl font-bold'>Localidades</h1>

      <LocalityScreen localities={localities} />
    </main>
  )
}
