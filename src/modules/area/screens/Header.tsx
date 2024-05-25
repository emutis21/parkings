// screens/AreaHeader.tsx
import type { Area } from '~/area/types'

import AreaClient from '@/app/parkings/[parkingId]/[areaId]/client'

interface AreaHeaderProps {
  area: Area
  noSpaces: boolean
}

export function AreaHeader({ area, noSpaces }: AreaHeaderProps) {
  const { idArea, descripcion, tipo } = area

  return (
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
          <h2 className='font-normal' data-type={tipo}>
            {tipo}
          </h2>
          <span className='font-semibold'>{descripcion}</span>
        </div>

        <AreaClient data={area} noSpaces={noSpaces} />
      </div>
    </header>
  )
}
