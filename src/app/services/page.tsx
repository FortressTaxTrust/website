'use client';

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import Footer from '@/components/Footer'

export default function ServicesPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const services = [
    {
      title: "Business Structure & Entity Selection",
      description: "Fortress Tax & Trust, strategic and fiercely objective consultants, leverage a proprietary platform founded on innovation to skillfully oversee your transaction or transform the way you do business.",
      link: "/services/business-structure"
    },
    {
      title: "Business Accounting",
      description: "Fortress Tax & Trust, strategic and fiercely objective consultants, leverage a proprietary platform founded on innovation to skillfully oversee your transaction or transform the way you do business.",
      link: "/services/business-accounting"
    },
    {
      title: "Business consulting",
      description: "Fortress Tax & Trust, strategic and fiercely objective consultants, leverage a proprietary platform founded on innovation to skillfully oversee your transaction or transform the way you do business.",
      link: "/services/business-consulting"
    },
    {
      title: "Business tax planning",
      description: "Fortress Tax & Trust, strategic and fiercely objective consultants, leverage a proprietary platform founded on innovation to skillfully oversee your transaction or transform the way you do business.",
      link: "/services/business-tax-planning"
    },
    {
      title: "Business trust and estate planning",
      description: "Fortress Tax & Trust, strategic and fiercely objective consultants, leverage a proprietary platform founded on innovation to skillfully oversee your transaction or transform the way you do business.",
      link: "/services/Business-trust-and-estate-planning"
    },
    {
      title: "Trust taxes",
      description: "Fortress Tax & Trust, strategic and fiercely objective consultants, leverage a proprietary platform founded on innovation to skillfully oversee your transaction or transform the way you do business.",
      link: "/services/trust-taxes"
    }
  ];

  const faqs = [
    {
      question: "How Will Pass-Through Business Income Be Taxed After Transfer?",
      answer: "If you own a pass-through business (such as an S corporation, partnership, or LLC), the tax treatment of business income after transfer depends on whether it's classified as active, passive, or portfolio income. Active income is typically taxed more favorably, potentially qualifying for lower rates or loss deductions. However, determining active vs. passive income for a trust or estate is more complex than for individuals. Courts have ruled that participation is based on the fiduciary's (or their agent's) involvement in the business. Since IRS guidance is limited, proper trustee or executor selection is crucial to preserving favorable tax treatment."
    },
    {
      question: "Will an S Corporation Keep Its Tax Benefits After Transfer?",
      answer: "S corporations offer pass-through taxation, avoiding double taxation like C corporations. However, not all trusts or beneficiaries can hold S corporation stock—some require special elections, and foreign trusts, IRAs, and certain other entities are ineligible. After death, estates and certain trusts can hold S corporation stock temporarily, but long-term planning is key to maintaining eligibility."
    },
    {
      question: "Should You Transfer a Partnership Interest During Life or at Death?",
      answer: "Gifting a partnership interest during life keeps your original tax basis, while transferring at death may provide a step-up in basis, eliminating capital gains on appreciation. However, gifting can remove future growth from your taxable estate. If the partnership has a negative capital account, gifting could trigger unexpected tax liabilities. Holding until death may offer better tax efficiency, especially if the partnership makes certain elections (like a Sec. 754 step-up)."
    },
    {
      question: "How Will Beneficiaries Be Taxed on Inherited Retirement Accounts?",
      answer: "The SECURE Act changed distribution rules for inherited retirement accounts (IRAs, 401(k)s, etc.), requiring most non-spouse beneficiaries to withdraw funds within 10 years. Trusts inheriting these accounts face additional complexities. Roth conversions can be a smart strategy—paying taxes upfront to eliminate future tax burdens for heirs. Alternatively, leaving retirement accounts to charity can reduce overall tax liability."
    }
  ];

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[300px] md:h-[400px] lg:h-[605px]">
        <Image
          src="/images/Gemini_Generated_Image_eayjxueayjxueayj.png"
          alt="Services hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-[#5A6863]/31 to-[#5A6863]" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 w-full">
            <p className="text-white text-sm md:text-base mb-2 md:mb-4">Home / Our Services</p>
            <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold capitalize leading-tight md:leading-[67px] mb-4 md:mb-6">Our Services</h1>
            <p className="text-white text-sm md:text-base max-w-[553px] capitalize">
               
            </p>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="bg-[#FAFAFA] py-12 md:py-16 lg:py-24">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service, index) => (
              <Link href={service.link} key={index} className="bg-white rounded-lg p-6 md:p-8 hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
                <div className="flex flex-col flex-grow">
                  <div className="space-y-4 md:space-y-5">
                    <h3 className="text-xl md:text-2xl lg:text-[28px] font-bold font-inter leading-tight">{service.title}</h3>
                    <p className="text-gray-dark text-sm md:text-base leading-relaxed">{service.description}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-6 md:mt-8">
                  <div className="w-12 h-12 md:w-[59px] md:h-[59px] border border-black rounded-full flex items-center justify-center">
                    <Image 
                      src="/images/arrow.svg" 
                      alt="Arrow" 
                      width={24} 
                      height={24} 
                      className="w-6 h-6 md:w-8 md:h-8"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-primary py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <div className="bg-white rounded-xl md:rounded-2xl lg:rounded-3xl p-6 md:p-8 lg:p-12">
            <div className="flex flex-col md:flex-row gap-8 md:gap-12">
              <div className="md:w-1/2">
                <h2 className="text-3xl md:text-4xl lg:text-[48px] font-semibold font-inter mb-6 md:mb-8 lg:mb-12">Tax Planning FAQs</h2>
                <p className="text-gray-dark text-sm md:text-base mb-8 md:mb-12">
                  Estate planning involves more than just distributing assets—it requires careful attention to income tax implications at every stage. Decisions made during life and after death can significantly impact taxes for you, your spouse, your estate, and your beneficiaries.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 md:gap-12">
                  <Link href="/faq" className="px-4 py-3 md:py-4 bg-primary text-white rounded-lg font-bold w-full sm:w-auto text-center">
                    More Questions
                  </Link>
                  <Link href="/contact" className="px-4 py-3 md:py-4 text-primary font-bold underline w-full sm:w-auto text-center">Contact Us</Link>
                </div>
              </div>
              <div className="md:w-1/2">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-t border-black py-4 md:py-6">
                    <button 
                      className="w-full flex justify-between items-center mb-4 md:mb-6"
                      onClick={() => toggleAccordion(index)}
                    >
                      <h3 className="text-lg md:text-xl lg:text-2xl font-semibold font-inter text-left">{faq.question}</h3>
                      <div className="w-6 h-6 flex items-center justify-center">
                        {activeIndex === index ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </button>
                    {activeIndex === index && (
                      <p className="text-gray-dark text-sm md:text-base">{faq.answer}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 