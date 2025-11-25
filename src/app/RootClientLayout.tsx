'use client'

import { usePathname } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Providers } from './providers'


export default function RootClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Hide footer for any path starting with /admin
  const showFooter = !pathname.startsWith('/admin')

  return (
    <Providers>
        {showFooter && <Header />}
        {showFooter ? (<main className="flex-grow pt-20">{children}</main>) : (<main>{children}</main>)}
        {showFooter && <Footer />}
    </Providers>
  )
}
