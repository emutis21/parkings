import type { Space } from '~/space/types'
import type { Area } from '~/area/types'

import DialogCreateSpace from '../components/create'

import SpacesScreen from './Space'

interface SpacesListProps {
  spaces: Space[]
  tipo: Area['tipo']
  areaId: Area['idArea']
}

export function SpacesList({ spaces, tipo, areaId }: SpacesListProps) {
  const sortedSpaces = spaces.sort((a, b) => a.idEspacio - b.idEspacio)

  return (
    <section>
      <h2 className='py-5 text-center text-xl font-bold'>Espacios</h2>

      <ul className='[grid-template-columns:_repeat(auto-fill,_minmax(120px,_1fr))]'>
        {sortedSpaces.map(({ idEspacio, disponible }) => (
          <SpacesScreen
            key={idEspacio}
            areaId={areaId}
            disponible={disponible}
            idEspacio={idEspacio}
            tipo={tipo}
          />
        ))}
        <li>
          <DialogCreateSpace />
        </li>
      </ul>
    </section>
  )
}
