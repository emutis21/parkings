import { Link } from 'next-view-transitions'

import { cn } from '@/lib/utils'

import { buttonVariants } from './ui/button'

export function Navbar() {
  const links = [
    { href: '/parkings', text: 'Parqueaderos' },
    { href: '/localities', text: 'Localidades' }
  ]

  return (
    <nav
      className={cn(
        'my-2 flex items-center justify-between rounded-lg border-2 border-[var(--primary)] bg-[var(--primary-dark)] px-8 text-[var(--primary-content)] [grid-column:full-width] [grid-row:full-height-start] md:[grid-column:breakout]'
      )}
    >
      <Link className={buttonVariants({ variant: 'link' })} href='/'>
        Parqueaderos
      </Link>

      <ul className={cn('flex', 'gap-4', 'list-none', 'md:[gap-8]')}>
        {links.map(({ href, text }) => (
          <li key={href}>
            <Link className={buttonVariants({ variant: 'link' })} href={href}>
              {text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
