'use client';

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
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
          <Link href="/" className="flex-shrink-0 flex flex-col items-start md:items-center mt-2">
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
            {/* Client Portal Button - Desktop Only */}
            <div className="hidden md:block">
              <Link 
                href="/client-portal" 
                className={`inline-flex items-center justify-center px-6 py-2.5 rounded-lg transition-colors duration-200 ${
                  isActive('/client-portal') 
                    ? 'bg-primary/10 text-primary hover:bg-primary hover:text-white' 
                    : 'bg-primary text-white hover:bg-primary/10 hover:text-primary'
                }`}
                style={{
                  width: 'auto',
                  height: 'auto',
                  paddingLeft: 24,
                  paddingRight: 24,
                  paddingTop: 10,
                  paddingBottom: 10,
                  borderRadius: 8,
                  gap: 10,
                }}
              >
                <span className="text-base font-normal capitalize">Client Portal</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-600 hover:text-primary"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className={`text-base capitalize transition-colors duration-200 ${
                  isActive('/') ? 'text-primary font-medium' : 'text-gray-600 hover:text-primary'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/services" 
                className={`text-base capitalize transition-colors duration-200 ${
                  isActive('/services') ? 'text-primary font-medium' : 'text-gray-600 hover:text-primary'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link 
                href="/about" 
                className={`text-base capitalize transition-colors duration-200 ${
                  isActive('/about') ? 'text-primary font-medium' : 'text-gray-600 hover:text-primary'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/blog" 
                className={`text-base capitalize transition-colors duration-200 ${
                  isActive('/blog') ? 'text-primary font-medium' : 'text-gray-600 hover:text-primary'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link 
                href="/testimonials" 
                className={`text-base capitalize transition-colors duration-200 ${
                  isActive('/testimonials') ? 'text-primary font-medium' : 'text-gray-600 hover:text-primary'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Testimonials
              </Link>
              <Link 
                href="/contact" 
                className={`text-base capitalize transition-colors duration-200 ${
                  isActive('/contact') ? 'text-primary font-medium' : 'text-gray-600 hover:text-primary'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link 
                href="/client-portal" 
                className={`inline-flex items-center justify-center px-4 py-2 rounded-lg transition-colors duration-200 mx-auto w-1/2 ${
                  isActive('/client-portal') 
                    ? 'bg-primary/10 text-primary hover:bg-primary hover:text-white' 
                    : 'bg-primary text-white hover:bg-primary/10 hover:text-primary'
                }`}
                style={{
                  height: 'auto',
                  paddingTop: 8,
                  paddingBottom: 8,
                  borderRadius: 8,
                  gap: 8,
                }}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="text-sm font-normal capitalize">Client Portal</span>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
} 