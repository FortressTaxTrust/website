// app/layout.tsx
import './globals.css'
import { Inter } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import RootClientLayout from './RootClientLayout'

const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  title: 'Tax Fortress',
  description: 'Your trusted partner in tax solutions',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RootClientLayout>{children}</RootClientLayout>
      </body>
    </html>
  )
}
