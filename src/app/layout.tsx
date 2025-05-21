import './globals.css'
import type { Metadata, Viewport } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import { Amplify } from 'aws-amplify'
import awsConfig from '@/config/amplify-config'

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

// Initialize Amplify
Amplify.configure(awsConfig)

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          <main className="flex-grow pt-20">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
} 