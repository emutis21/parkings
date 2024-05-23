import apiArea from '~/area/api'

export default async function Page({ params: { areaId } }: { params: { areaId: string } }) {
  const area = await apiArea.fetch(areaId)

  const { idArea, descripcion, tipo } = area

  return (
    <main className='h-full w-full'>
      <header className='mt-5 flex w-full flex-col gap-5'>
        <h1
          className='py-5 text-center text-2xl font-bold'
          style={{
            viewTransitionName: `area-${idArea}`
          }}
        >
          Área {idArea}
        </h1>
        <div className='flex w-full justify-between'>
          <div className='flex items-center gap-5'>
            <span className='font-semibold'>{descripcion}</span>
            <span className='font-normal text-green-500'>{tipo}</span>
          </div>
        </div>
      </header>
    </main>
  )
}
