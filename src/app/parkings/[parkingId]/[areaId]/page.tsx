import apiArea from '~/area/api'
import apiSpace from '~/space/api'
import { AreaHeader } from '~/area/screens/Header'
import { SpacesList } from '~/space/screens/Spaces'

export default async function Page({ params: { areaId } }: { params: { areaId: string } }) {
  const area = await apiArea.fetch(areaId)
  const spaces = await apiSpace.fetchByArea(areaId)

  const { tipo } = area

  const noSpaces = spaces.length === 0

  return (
    <main className='h-full w-full'>
      <AreaHeader area={area} noSpaces={noSpaces} />

      {spaces.length > 0 ? (
        <SpacesList areaId={areaId} spaces={spaces} tipo={tipo} />
      ) : (
        <section>
          <h2 className='py-5 text-center text-xl font-bold'>No hay espacios</h2>
        </section>
      )}
    </main>
  )
}
