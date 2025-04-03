import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <div className="bg-[#FAFAFA] py-16">
      <div className="container mx-auto px-8">
        {/* CTA Section */}
        <div className="bg-[#5A6863] rounded-3xl p-12 relative overflow-hidden mb-16">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-lg"></div>
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center">
            <h2 className="text-5xl md:text-7xl font-semibold text-white mb-8 md:mb-0">Ready to work with us ?</h2>
            <button className="bg-white px-8 py-4 rounded-lg flex items-center gap-10">
              <span className="text-[#5A6863] font-bold">Partners Portal</span>
              <div className="w-6 h-6">
                <div className="w-1.5 h-3.5 border-2 border-[#5A6863]"></div>
              </div>
            </button>
          </div>
        </div>

        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-5 h-14 bg-gradient-to-r from-[#929C87] to-[#5A6863]"></div>
              <div className="w-5 h-14 bg-[#5A6863]"></div>
              <div>
                <div className="text-[#5A6863] text-xl font-bold font-['Agency_FB']">FORTRESS</div>
                <div className="text-[#5A6863] text-xs">TAX & TRUST</div>
              </div>
            </div>
            <p className="text-sm text-black leading-5 mb-8">
              We are a catalyst for change; a national initiative working to diversify Qatar's economy through the provision of world-class infrastructures within strategically placed economic zones.
            </p>
            <div className="flex gap-3">
              <div className="w-9 h-9 rounded-full border border-black flex items-center justify-center">
                <div className="w-1.5 h-3.5 bg-[#192031]"></div>
              </div>
              <div className="w-9 h-9 rounded-full border border-black flex items-center justify-center">
                <div className="w-4.5 h-3.5 bg-[#192031]"></div>
              </div>
              <div className="w-9 h-9 rounded-full border border-black flex items-center justify-center">
                <div className="w-4 h-4 bg-[#192031]"></div>
              </div>
              <div className="w-9 h-9 rounded-full border border-black flex items-center justify-center">
                <div className="w-4 h-4 bg-[#192031]"></div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#192031] mb-6">Our services</h3>
            <ul className="space-y-3.5">
              <li className="text-sm text-black">Business Structure & Entity Selection</li>
              <li className="text-sm text-black">Business Accounting</li>
              <li className="text-sm text-black">Business consulting</li>
              <li className="text-sm text-black">Business tax planning</li>
              <li className="text-sm text-black">Trust taxes</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#192031] capitalize mb-6">about us</h3>
            <ul className="space-y-3.5">
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
            <h3 className="text-lg font-semibold text-[#192031] mb-6">Contact</h3>
            <div className="flex items-start gap-3 mb-5">
              <div className="w-6 h-6 mt-1">
                <div className="w-5 h-5 bg-[#192031]"></div>
              </div>
              <p className="text-sm text-black">(406) 555-0120</p>
            </div>
            <div className="flex items-start gap-3 mb-5">
              <div className="w-6 h-6 mt-1">
                <div className="w-5 h-3.5 bg-[#192031]"></div>
              </div>
              <p className="text-sm text-black">Hey@boostim.com</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 mt-1">
                <div className="w-3.5 h-4.5 bg-[#192031]"></div>
              </div>
              <p className="text-sm text-black leading-6">2972 Westheimer Rd. Santa Ana, Illinois 85486</p>
            </div>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-black flex flex-col md:flex-row justify-between">
          <p className="text-sm text-black">Copyright © 2024</p>
          <p className="text-sm text-black">All Rights Reserved | Terms and Conditions | Privacy Policy</p>
        </div>
      </div>
    </div>
  )
} 