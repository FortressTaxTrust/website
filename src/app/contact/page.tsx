import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Contact Form */}
      <div className="bg-[#FAFAFA] pt-16 md:pt-20 pb-12 md:pb-16">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            {/* Left side - Hero content */}
            <div className="w-full md:w-1/2">
              <p className="text-[#535353] text-sm md:text-base mb-2 md:mb-4">Home / Contact Us</p>
              <h1 className="text-black text-3xl md:text-4xl lg:text-5xl font-bold capitalize leading-tight md:leading-[67px] mb-4 md:mb-6">Contact Us</h1>
              <p className="text-[#535353] text-sm md:text-base max-w-[578px] capitalize leading-relaxed">
                Have a question or request? Looking to contact a partner? Want more information on our services or an upcoming event?<br/><br/>
                Please fill out the contact form and we will respond to you. Thank you.
              </p>
              
              {/* Contact Information */}
              <div className="mt-6 md:mt-8">
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1 p-3 md:p-3.5 bg-white flex items-center gap-3">
                      <div className="w-4 h-4 md:w-[18px] md:h-[18px]">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-[#192031]">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                      </div>
                      <a href="tel:469-620-8516" className="text-black text-xs md:text-sm hover:underline">Main Line - 469-620-8516</a>
                    </div>
                    <div className="flex-1 p-3 md:p-3.5 bg-white flex items-center gap-3">
                      <div className="w-4 h-4 md:w-[18px] md:h-[18px]">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-[#192031]">
                          <rect x="2" y="4" width="20" height="14" rx="2" ry="2"></rect>
                          <path d="M6 18h12"></path>
                          <path d="M6 18c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2"></path>
                          <path d="M6 8h12"></path>
                          <path d="M6 12h12"></path>
                          <path d="M6 16h12"></path>
                        </svg>
                      </div>
                      <a href="tel:214-975-5594" className="text-black text-xs md:text-sm hover:underline">FAX - 214-975-5594</a>
                    </div>
                  </div>
                  <div className="p-3 md:p-3.5 bg-white flex items-center gap-3">
                    <div className="w-4 h-4 md:w-[18px] md:h-[18px]">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-[#192031]">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                    </div>
                    <a href="https://maps.google.com/?q=18170+Dallas+Pkwy.+Suite+303+Dallas+TX+75287" target="_blank" rel="noopener noreferrer" className="text-black text-xs md:text-sm leading-relaxed hover:underline">
                      18170 Dallas Pkwy.<br />
                      Suite 303<br />
                      Dallas, TX 75287
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Contact Form */}
            <div className="w-full md:w-1/2 md:pt-0">
              <div className="bg-white p-6 md:p-8 rounded-lg shadow-[0px_6px_89.9px_-46px_rgba(0,0,0,0.25)]">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold capitalize leading-tight md:leading-[67px] mb-6 md:mb-8">Get In Touch</h2>
                <form className="flex flex-col gap-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1 p-3 md:p-4 border border-[#B8B8B8] rounded">
                      <input type="text" placeholder="First name" className="w-full text-xs md:text-sm text-[#535353] capitalize outline-none" />
                    </div>
                    <div className="flex-1 p-3 md:p-4 border border-[#B8B8B8] rounded">
                      <input type="text" placeholder="Last name" className="w-full text-xs md:text-sm text-[#535353] capitalize outline-none" />
                    </div>
                  </div>
                  <div className="p-3 md:p-4 border border-[#B8B8B8] rounded">
                    <input type="email" placeholder="Email" className="w-full text-xs md:text-sm text-[#535353] capitalize outline-none" />
                  </div>
                  <div className="p-3 md:p-4 border border-[#B8B8B8] rounded">
                    <input type="tel" placeholder="Number" className="w-full text-xs md:text-sm text-[#535353] capitalize outline-none" />
                  </div>
                  <div className="p-3 md:p-4 border border-[#B8B8B8] rounded h-24 md:h-32">
                    <textarea placeholder="Message" className="w-full h-full text-xs md:text-sm text-[#535353] capitalize outline-none resize-none"></textarea>
                  </div>
                  <button type="submit" className="bg-[#5A6863] text-white py-3 md:py-4 px-4 rounded-lg font-bold text-sm md:text-base">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 