'use client';

import Link from 'next/link'
import Image from 'next/image'
import MobileMenu from './MobileMenu'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()
  
  // Function to check if a link is active
  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === path
    }
    return pathname.startsWith(path)
  }

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex flex-col items-center mt-2">
            <div className="relative w-[150px] h-[40px] mb-1">
              <Image
                src="/images/Logo.svg"
                alt="Tax Fortress Logo"
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
            <div className="text-center w-[150px]">
              <div style={{color: '#5A6863', fontSize: '17.08px', fontFamily: 'Agency FB', fontWeight: '700', wordWrap: 'break-word', lineHeight: '1'}}>FORTRESS</div>
              <div style={{color: '#5A6863', fontSize: '8px', fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word', lineHeight: '1'}}>TAX & TRUST</div>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/services" 
              className={`relative py-2 text-gray-600 hover:text-primary transition-colors ${
                isActive('/services') ? 'text-primary font-medium' : ''
              }`}
            >
              Services
              {isActive('/services') && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>
              )}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              href="/about" 
              className={`relative py-2 text-gray-600 hover:text-primary transition-colors ${
                isActive('/about') ? 'text-primary font-medium' : ''
              }`}
            >
              About Us
              {isActive('/about') && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>
              )}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              href="/testimonials" 
              className={`relative py-2 text-gray-600 hover:text-primary transition-colors ${
                isActive('/testimonials') ? 'text-primary font-medium' : ''
              }`}
            >
              Testimonials
              {isActive('/testimonials') && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>
              )}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              href="/case-studies" 
              className={`relative py-2 text-gray-600 hover:text-primary transition-colors ${
                isActive('/case-studies') ? 'text-primary font-medium' : ''
              }`}
            >
              Case Studies
              {isActive('/case-studies') && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>
              )}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              href="/blog" 
              className={`relative py-2 text-gray-600 hover:text-primary transition-colors ${
                isActive('/blog') ? 'text-primary font-medium' : ''
              }`}
            >
              Blog
              {isActive('/blog') && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>
              )}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              href="/faq" 
              className={`relative py-2 text-gray-600 hover:text-primary transition-colors ${
                isActive('/faq') ? 'text-primary font-medium' : ''
              }`}
            >
              FAQ
              {isActive('/faq') && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>
              )}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              href="/contact" 
              className={`relative py-2 text-gray-600 hover:text-primary transition-colors ${
                isActive('/contact') ? 'text-primary font-medium' : ''
              }`}
            >
              Contact
              {isActive('/contact') && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>
              )}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            <Link
              href="/client-portal"
              className={`px-6 py-2 rounded-lg transition-all duration-300 ${
                isActive('/client-portal') 
                  ? 'bg-primary text-white' 
                  : 'bg-primary/10 text-primary hover:bg-primary hover:text-white'
              }`}
            >
              Client Portal
            </Link>
            {/* Mobile Menu - Always visible on mobile */}
            <div className="md:hidden">
              <MobileMenu />
            </div>

            {/* Desktop Menu - Only visible on desktop */}
            <div className="hidden md:block">
              <MobileMenu showOnScroll={true} />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
} 