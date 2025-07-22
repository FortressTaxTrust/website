import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <div className="bg-[#FAFAFA] py-8 md:py-12 lg:py-16">
      <div className="container mx-auto px-4 md:px-8">
        {/* CTA Section */}
        <div className="bg-[#5A6863] rounded-xl md:rounded-2xl lg:rounded-3xl p-6 md:p-8 lg:p-12 relative overflow-hidden mb-8 md:mb-12 lg:mb-16">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-lg"></div>
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-semibold text-white text-center md:text-left">Ready to work with us ?</h2>
            <Link href="/client-portal" className="w-full md:w-auto bg-white px-6 md:px-8 py-3 md:py-4 rounded-lg flex items-center justify-center md:justify-start gap-4 md:gap-10">
              <span className="text-[#5A6863] font-bold text-sm md:text-base">Client Portal</span>
              <div className="w-5 h-5 md:w-6 md:h-6">
                <Image 
                  src="/images/arrow.svg" 
                  alt="Arrow" 
                  width={24} 
                  height={24} 
                  className="w-full h-full"
                />
              </div>
            </Link>
          </div>
        </div>

        {/* Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          <div className="space-y-6 md:space-y-8">
            <Link href="/" className="flex flex-col items-center w-full">
              <div className="relative w-[160px] md:w-[200px] h-[45px] md:h-[55px] mb-0">
                <Image
                  src="/images/Logo.svg"
                  alt="Tax Fortress Logo"
                  fill
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </div>
              <div className="text-center w-[160px] md:w-[200px] -mt-2">
                <div style={{color: '#5A6863', fontSize: '22px', fontFamily: 'Agency FB', fontWeight: '700', wordWrap: 'break-word', marginBottom: '-8px'}}>FORTRESS</div>
                <div style={{color: '#5A6863', fontSize: '12px', fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>TAX & TRUST</div>
              </div>
            </Link>
            <p className="text-sm text-black leading-relaxed -mt-2">
              We don't just manage taxes — we design smart, forward-thinking strategies that protect what you've built and fuel what's next. Every solution is tailored, every detail intentional, and every outcome focused on your success.
            </p>
          </div>
          <div>
            <h3 className="text-base md:text-lg font-semibold text-[#192031] mb-4 md:mb-6">Our services</h3>
            <ul className="space-y-2.5 md:space-y-3.5">
              <li className="text-sm text-black">
                <Link href="/services/business-structure" className="hover:underline">Business Structure & Entity Selection</Link>
              </li>
              <li className="text-sm text-black">
                <Link href="/services/business-accounting" className="hover:underline">Business Accounting</Link>
              </li>
              <li className="text-sm text-black">
                <Link href="/services/business-consulting" className="hover:underline">Business Consulting</Link>
              </li>
              <li className="text-sm text-black">
                <Link href="/services/business-tax-planning" className="hover:underline">Business Tax Planning</Link>
              </li>
              <li className="text-sm text-black">
                <Link href="/services/trust-taxes" className="hover:underline">Trust Taxes</Link>
              </li>
              <li className="text-sm text-black">
                <Link href="/services/Business-trust-and-estate-planning" className="hover:underline">Business Trust and Estate Planning</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-base md:text-lg font-semibold text-[#192031] capitalize mb-4 md:mb-6">about us</h3>
            <ul className="space-y-2.5 md:space-y-3.5">
              <li className="text-sm text-black">
                <Link href="/about" className="hover:underline">About us</Link>
              </li>
              <li className="text-sm text-black capitalize">
                <Link href="/testimonials" className="hover:underline">Testimonials</Link>
              </li>
              <li className="text-sm text-black capitalize">
                <Link href="/case-studies" className="hover:underline">Case study</Link>
              </li>
              <li className="text-sm text-black capitalize">
                <Link href="/blog" className="hover:underline">Blogs</Link>
              </li>
              <li className="text-sm text-black">
                <Link href="/contact" className="hover:underline">Contact us</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-base md:text-lg font-semibold text-[#192031] mb-4 md:mb-6">Contact</h3>
            <div className="space-y-4 md:space-y-5">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 md:w-6 md:h-6 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-[#192031]">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <a href="tel:469-620-8516" className="text-sm text-black hover:underline">Main Line - 469-620-8516</a>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 md:w-6 md:h-6 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-[#192031]">
                    <rect x="2" y="4" width="20" height="14" rx="2" ry="2"></rect>
                    <path d="M6 18h12"></path>
                    <path d="M6 18c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2"></path>
                    <path d="M6 8h12"></path>
                    <path d="M6 12h12"></path>
                    <path d="M6 16h12"></path>
                  </svg>
                </div>
                <a href="tel:214-975-5594" className="text-sm text-black hover:underline">FAX - 214-975-5594</a>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 md:w-6 md:h-6 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-[#192031]">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <a href="https://maps.google.com/?q=18170+Dallas+Pkwy.+Suite+303+Dallas+TX+75287" target="_blank" rel="noopener noreferrer" className="text-sm text-black leading-relaxed hover:underline">
                  18170 Dallas Pkwy.<br />
                  Suite 303<br />
                  Dallas, TX 75287
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 md:mt-12 lg:mt-16 pt-6 md:pt-8 border-t border-black">
          <div className="mb-6 md:mb-8">
            <p className="text-xs md:text-sm text-black leading-relaxed">
              Any tax advice herein is based on the facts provided to us and on current tax law including judicial and administrative interpretation. Tax law is subject to continual change, at times on a retroactive basis and may result in incremental taxes, interest or penalties. Should the facts provided to us be incorrect or incomplete or should the law or its interpretation change, our advice may be inappropriate. We are not responsible for updating our advice for changes in law or interpretation after the date hereof.
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-6">
            <p className="text-xs md:text-sm text-black">Copyright © 2025</p>
            <p className="text-xs md:text-sm text-black">All Rights Reserved | Terms and Conditions | Privacy Policy</p>
          </div>
        </div>
      </div>
    </div>
  )
} 