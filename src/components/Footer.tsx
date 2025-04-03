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
            <button className="w-full md:w-auto bg-white px-6 md:px-8 py-3 md:py-4 rounded-lg flex items-center justify-center md:justify-start gap-4 md:gap-10">
              <span className="text-[#5A6863] font-bold text-sm md:text-base">Partners Portal</span>
              <div className="w-5 h-5 md:w-6 md:h-6">
                <div className="w-1.5 h-3.5 border-2 border-[#5A6863]"></div>
              </div>
            </button>
          </div>
        </div>

        {/* Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          <div className="space-y-6 md:space-y-8">
            <Link href="/" className="flex flex-col items-start">
              <div className="relative w-[120px] md:w-[150px] h-[32px] md:h-[40px] mb-0">
                <Image
                  src="/images/Logo.svg"
                  alt="Tax Fortress Logo"
                  fill
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </div>
              <div className="text-center w-[120px] md:w-[150px] -mt-1">
                <div style={{color: '#5A6863', fontSize: '18px', fontFamily: 'Agency FB', fontWeight: '700', wordWrap: 'break-word', marginBottom: '-8px'}}>FORTRESS</div>
                <div style={{color: '#5A6863', fontSize: '8px', fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>TAX & TRUST</div>
              </div>
            </Link>
            <p className="text-sm text-black leading-relaxed">
              We are a catalyst for change; a national initiative working to diversify Qatar's economy through the provision of world-class infrastructures within strategically placed economic zones.
            </p>
            <div className="flex gap-3">
              <div className="w-8 h-8 md:w-9 md:h-9 rounded-full border border-black flex items-center justify-center">
                <div className="w-1.5 h-3.5 bg-[#192031]"></div>
              </div>
              <div className="w-8 h-8 md:w-9 md:h-9 rounded-full border border-black flex items-center justify-center">
                <div className="w-4.5 h-3.5 bg-[#192031]"></div>
              </div>
              <div className="w-8 h-8 md:w-9 md:h-9 rounded-full border border-black flex items-center justify-center">
                <div className="w-4 h-4 bg-[#192031]"></div>
              </div>
              <div className="w-8 h-8 md:w-9 md:h-9 rounded-full border border-black flex items-center justify-center">
                <div className="w-4 h-4 bg-[#192031]"></div>
              </div>
            </div>
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
                  <div className="w-4 h-4 md:w-5 md:h-5 bg-[#192031]"></div>
                </div>
                <p className="text-sm text-black">(406) 555-0120</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 md:w-6 md:h-6 mt-1">
                  <div className="w-4 h-3 md:w-5 md:h-3.5 bg-[#192031]"></div>
                </div>
                <p className="text-sm text-black">Hey@boostim.com</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 md:w-6 md:h-6 mt-1">
                  <div className="w-3 h-3.5 md:w-3.5 md:h-4.5 bg-[#192031]"></div>
                </div>
                <p className="text-sm text-black leading-relaxed">2972 Westheimer Rd. Santa Ana, Illinois 85486</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 md:mt-12 lg:mt-16 pt-6 md:pt-8 border-t border-black flex flex-col md:flex-row justify-between gap-4 md:gap-6">
          <p className="text-xs md:text-sm text-black">Copyright © 2024</p>
          <p className="text-xs md:text-sm text-black">All Rights Reserved | Terms and Conditions | Privacy Policy</p>
        </div>
      </div>
    </div>
  )
} 