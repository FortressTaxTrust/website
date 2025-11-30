'use client'

import { usePathname } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Providers } from './providers'


export default function RootClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Determine if we should show the main header and footer
  const showMainLayout = !pathname.startsWith('/admin')

  return (
    <Providers>
        {showMainLayout && <Header />}
        {showMainLayout ? (<main className="flex-grow pt-20">{children}</main>) : (<main>{children}</main>)}
        {showMainLayout && <Footer />}
    </Providers>
  )
}
