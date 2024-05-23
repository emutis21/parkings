import type { Localitie } from '../types'

import Link from 'next/link'

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import DialogLocalitie from '../components/dialog'

function LocalitieScreen({ localities }: { localities: Localitie[] }) {
  return (
    <ul className=''>
      {localities.map(({ idLocalidad, nombreLocalidad }) => (
        <li
          key={idLocalidad}
          style={{
            viewTransitionName: `card-${idLocalidad}`
          }}
        >
          <Link className='hover:bg-gray-100' href={`/localities/${idLocalidad}`}>
            <Card
              className='hover:bg-gray-900'
              style={{
                viewTransitionName: `${idLocalidad}-title`
              }}
            >
              <CardHeader>
                <CardTitle>{nombreLocalidad}</CardTitle>
                <CardDescription>{idLocalidad}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </li>
      ))}

      <DialogLocalitie />
    </ul>
  )
}

export default LocalitieScreen
