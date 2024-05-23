import { Link } from 'next-view-transitions'

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import apiParking from '@/modules/parking/api'

async function CardLocality({
  idLocalidad,
  nombreLocalidad
}: {
  idLocalidad: string
  nombreLocalidad: string
}) {
  const parkings = await apiParking.fetchByLocality(idLocalidad)

  return (
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
            <CardDescription className='flex w-full justify-between'>
              {idLocalidad}
              {parkings.length > 0 && (
                <span>
                  {parkings.length} {parkings.length === 1 ? 'parqueadero' : 'parqueaderos'}
                </span>
              )}
            </CardDescription>
          </CardHeader>
        </Card>
      </Link>
    </li>
  )
}

export default CardLocality
