import type { Metadata } from 'next'

import { Inter as FontSans } from 'next/font/google'
import { ViewTransitions } from 'next-view-transitions'

import './globals.css'
import { Toaster } from '@/components/ui/toaster'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ViewTransitions>
      <html suppressHydrationWarning className='dark' lang='en'>
        <body className={`font-sans antialiased ${fontSans.variable}`}>
          <Navbar />
          {children}
          <Footer />
          <Toaster />
        </body>
      </html>
    </ViewTransitions>
  )
}
