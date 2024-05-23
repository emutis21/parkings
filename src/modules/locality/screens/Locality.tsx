import type { Locality } from '../types'

import CardLocality from '../components/card'
import DialogLocality from '../components/dialog'

function LocalityScreen({ localities }: { localities: Locality[] }) {
  return (
    <ul className=''>
      {localities.map(({ idLocalidad, nombreLocalidad }) => (
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
