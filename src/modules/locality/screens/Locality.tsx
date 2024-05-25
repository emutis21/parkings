import type { Locality } from '../types'

import CardLocality from '../components/card'
import DialogLocality from '../components/dialog'

function LocalityScreen({ localities }: { localities: Locality[] }) {
  const sortedLocalities = localities.sort((a, b) =>
    a.nombreLocalidad.localeCompare(b.nombreLocalidad)
  )

  return (
    <ul className=''>
      {sortedLocalities.map(({ idLocalidad, nombreLocalidad }) => (
        <CardLocality
          key={idLocalidad}
          idLocalidad={idLocalidad}
          nombreLocalidad={nombreLocalidad}
        />
      ))}

      <li className='grid h-full w-full place-content-center'>
        <DialogLocality />
      </li>
    </ul>
  )
}

export default LocalityScreen
