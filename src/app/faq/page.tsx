'use client';

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import Footer from '@/components/Footer'

export default function FAQPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0)

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
    },
    {
      question: "Does Your Estate Include a Home with Significant Appreciation?",
      answer: "Homes often have low tax basis, meaning selling during life could trigger capital gains taxes. Holding until death typically provides a step-up in basis, minimizing taxes for heirs. A Qualified Personal Residence Trust (QPRT) can freeze the home's value for estate tax purposes, but you'll lose the step-up in basis. Alternatively, estates may deduct losses on home sales under certain conditions."
    },
    {
      question: "Can Your Estate Claim a Charitable Income Tax Deduction?",
      answer: "Trusts and estates can deduct 100% of income donated to charity (unlike individuals, who face AGI limits). However, the governing document must explicitly authorize charitable giving. Special elections allow trusts to treat next-year donations as current-year deductions, offering flexibility in tax planning."
    },
    {
      question: "Will Beneficiaries Receive Expected Distributions from a 'Simple' Trust?",
      answer: "A simple trust must distribute all income annually, but 'income' definitions vary. If the trust holds pass-through entities (like partnerships), beneficiaries may receive less than expected if distributions are minimal."
    },
    {
      question: "How Can Irrevocable Grantor Trusts Enhance Tax Planning?",
      answer: "Grantor trusts allow you to pay the trust's income taxes, reducing your taxable estate without gift tax consequences. However, if the trustee must reimburse you, the trust assets could be pulled back into your estate."
    },
    {
      question: "How Does Divorce Affect a Trust for a Spouse?",
      answer: "If a trust benefits a spouse and you divorce, you may still owe taxes on trust income. Solutions include modifying the trust, distributing assets, or requiring reimbursement in the divorce settlement."
    },
    {
      question: "How Can Life Insurance Help an Illiquid Estate?",
      answer: "If your estate lacks cash to pay taxes, life insurance can provide liquidity without income or estate tax if structured properly. Policies can also replace wealth donated to charity, benefiting heirs tax-efficiently."
    }
  ]

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-[#FAFAFA] pt-16 md:pt-20 pb-12 md:pb-16">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <p className="text-[#535353] text-sm md:text-base mb-2 md:mb-4">Home / FAQ's</p>
          <h1 className="text-black text-3xl md:text-4xl lg:text-5xl font-bold capitalize leading-tight md:leading-[67px] mb-4 md:mb-6">Frequently Asked Questions</h1>
          <p className="text-[#535353] text-sm md:text-base max-w-[553px] capitalize leading-relaxed">
            Estate planning involves more than just distributing assets—it requires careful attention to income tax implications at every stage. Decisions made during life and after death can significantly impact taxes for you, your spouse, your estate, and your beneficiaries.
          </p>
        </div>
      </div>

      {/* FAQ Accordion Section */}
      <div className="container mx-auto px-4 md:px-8 lg:px-12 py-12 md:py-16">
        <div className="bg-white rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden border border-black">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`border-b border-black ${index === 0 ? 'border-t' : ''}`}
            >
              <button
                className="w-full px-4 md:px-6 py-4 md:py-6 flex justify-between items-center text-left"
                onClick={() => toggleAccordion(index)}
              >
                <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-[#010205] leading-tight md:leading-9">{faq.question}</h3>
                <div className="w-5 h-5 md:w-6 md:h-6 flex items-center justify-center flex-shrink-0">
                  {activeIndex === index ? (
                    <Image 
                      src="/images/FAQ minus.svg" 
                      alt="Collapse" 
                      width={24} 
                      height={24} 
                      className="w-5 h-5 md:w-6 md:h-6"
                    />
                  ) : (
                    <Image 
                      src="/images/FAQ plus sign.svg" 
                      alt="Expand" 
                      width={24} 
                      height={24} 
                      className="w-5 h-5 md:w-6 md:h-6"
                    />
                  )}
                </div>
              </button>
              {activeIndex === index && (
                <div className="px-4 md:px-6 pb-4 md:pb-6">
                  <p className="text-sm md:text-base text-[#535353] leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 