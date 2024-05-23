import { cn } from '@/lib/utils'

export function Footer() {
  return (
    <footer
      className={cn(
        'relative my-2 grid w-full place-items-center text-center [grid-column:full-width] [grid-row:content-main-end]  md:[grid-column:breakout]'
      )}
    >
      <p className='text-center'>Parqueaderos</p>
    </footer>
  )
}
