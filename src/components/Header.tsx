import Link from 'next/link'
import Image from 'next/image'
import MobileMenu from './MobileMenu'

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/logo.png"
              alt="Tax Fortress Logo"
              width={150}
              height={40}
              className="h-10 w-auto"
            />
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/services" className="text-gray-600 hover:text-primary transition-colors">
              Services
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-primary transition-colors">
              About Us
            </Link>
            <Link href="/testimonials" className="text-gray-600 hover:text-primary transition-colors">
              Testimonials
            </Link>
            <Link href="/case-studies" className="text-gray-600 hover:text-primary transition-colors">
              Case Studies
            </Link>
            <Link href="/blog" className="text-gray-600 hover:text-primary transition-colors">
              Blog
            </Link>
            <Link href="/faq" className="text-gray-600 hover:text-primary transition-colors">
              FAQ
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            <Link
              href="/client-portal"
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Client Portal
            </Link>
            {/* Mobile menu - visible on mobile or when scrolling on desktop */}
            <div className="md:hidden">
              <MobileMenu />
            </div>
            <div className="hidden md:block">
              <MobileMenu showOnScroll />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
} 