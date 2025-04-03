import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'

export default function ContactPage() {
  return (
    <main>
      {/* Hero Section with Contact Form */}
      <div className="bg-[#FAFAFA] pt-20 pb-16">
        <div className="container mx-auto px-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left side - Hero content */}
            <div className="w-full md:w-1/2">
              <p className="text-[#535353] text-base mb-4">Home / Contact Us</p>
              <h1 className="text-black text-5xl font-bold capitalize leading-[67px] mb-6">Contact Us</h1>
              <p className="text-[#535353] text-base max-w-[578px] capitalize">
                Have a question or request? Looking to contact a partner? Want more information on our services or an upcoming event?<br/><br/>
                Please fill out the contact form and we will respond to you. Thank you.
              </p>
              
              {/* Contact Information */}
              <div className="mt-8">
                <div className="flex flex-col gap-3">
                  <div className="flex gap-3">
                    <div className="flex-1 p-3.5 bg-white flex items-center gap-3">
                      <div className="w-[18px] h-[18px] transform rotate-180">
                        <div className="w-[14.48px] h-[14.48px] bg-[#192031]"></div>
                      </div>
                      <p className="text-black text-sm">(406) 555-0120</p>
                    </div>
                    <div className="flex-1 p-3.5 bg-white flex items-center gap-3">
                      <div className="w-[18px] h-[18px] flex items-center justify-center">
                        <div className="w-[14px] h-[10px] bg-[#192031]"></div>
                      </div>
                      <p className="text-black text-sm">Hey@boostim.com</p>
                    </div>
                  </div>
                  <div className="p-3.5 bg-white flex items-center gap-3">
                    <div className="w-[18px] h-[17px] flex items-center justify-center">
                      <div className="w-[10px] h-[13px] bg-[#192031]"></div>
                    </div>
                    <p className="text-black text-sm leading-6">2972 Westheimer Rd. Santa Ana, Illinois 85486</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Contact Form */}
            <div className="w-full md:w-1/2 md:pt-0">
              <div className="bg-white p-8 rounded-lg shadow-[0px_6px_89.9px_-46px_rgba(0,0,0,0.25)]">
                <h2 className="text-4xl font-semibold capitalize leading-[67px] mb-8">Get In Touch</h2>
                <form className="flex flex-col gap-3">
                  <div className="flex gap-3">
                    <div className="flex-1 p-4 border border-[#B8B8B8] rounded">
                      <input type="text" placeholder="First name" className="w-full text-sm text-[#535353] capitalize outline-none" />
                    </div>
                    <div className="flex-1 p-4 border border-[#B8B8B8] rounded">
                      <input type="text" placeholder="Last name" className="w-full text-sm text-[#535353] capitalize outline-none" />
                    </div>
                  </div>
                  <div className="p-4 border border-[#B8B8B8] rounded">
                    <input type="email" placeholder="Email" className="w-full text-sm text-[#535353] capitalize outline-none" />
                  </div>
                  <div className="p-4 border border-[#B8B8B8] rounded">
                    <input type="tel" placeholder="Number" className="w-full text-sm text-[#535353] capitalize outline-none" />
                  </div>
                  <div className="p-4 border border-[#B8B8B8] rounded h-32">
                    <textarea placeholder="Message" className="w-full h-full text-sm text-[#535353] capitalize outline-none resize-none"></textarea>
                  </div>
                  <button type="submit" className="bg-[#5A6863] text-white py-4 px-4 rounded-lg font-bold text-base">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

    </main>
  )
} 