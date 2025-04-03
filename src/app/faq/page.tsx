'use client';

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import Footer from '@/components/Footer'

export default function FAQPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: "Why is digital marketing important for my business?",
      answer: "Digital marketing allows businesses to reach and engage with a wider audience, generate leads, drive website traffic, and increase brand visibility. It provides measurable results, allows for targeted marketing efforts, and enables businesses to adapt and optimize their strategies based on data and insights."
    },
    {
      question: "How can digital marketing help improve my website's visibility?",
      answer: "Digital marketing can improve your website's visibility through SEO optimization, content marketing, social media promotion, and paid advertising campaigns. These strategies help increase your search engine rankings, drive organic traffic, and enhance your online presence."
    },
    {
      question: "How long does it take to see results from digital marketing efforts?",
      answer: "The timeline for seeing results from digital marketing varies depending on the strategies used and your industry. Some tactics like paid advertising can show immediate results, while others like SEO may take several months to show significant impact."
    },
    {
      question: "How do you measure the success of digital marketing campaigns?",
      answer: "Digital marketing success is measured through key performance indicators (KPIs) such as website traffic, conversion rates, engagement metrics, lead generation, and return on investment (ROI). Regular analytics and reporting help track these metrics."
    },
    {
      question: "What social media platforms should my business be on?",
      answer: "The choice of social media platforms depends on your target audience, industry, and business goals. Research where your audience is most active and focus your efforts on those platforms rather than trying to maintain a presence everywhere."
    },
    {
      question: "How often should I update my website content?",
      answer: "Regular content updates are important for SEO and keeping your audience engaged. Aim to publish new blog posts, case studies, or other content at least once a month, and update existing content as needed to keep it current and relevant."
    },
    {
      question: "What is the difference between organic and paid search?",
      answer: "Organic search results appear naturally based on relevance and authority, while paid search results are advertisements that appear at the top of search results. Organic takes time to build but is free, while paid provides immediate visibility but requires ongoing investment."
    },
    {
      question: "How can I improve my email marketing campaigns?",
      answer: "Improve email marketing by segmenting your audience, personalizing content, optimizing subject lines, ensuring mobile responsiveness, testing different approaches, and analyzing performance metrics to refine your strategy."
    },
    {
      question: "What is content marketing and why is it important?",
      answer: "Content marketing involves creating and distributing valuable, relevant content to attract and retain a target audience. It's important because it builds trust, establishes authority, improves SEO, and nurtures leads through the sales funnel."
    },
    {
      question: "How can I integrate digital marketing with traditional marketing?",
      answer: "Integrate digital and traditional marketing by maintaining consistent messaging across channels, using traditional methods to drive traffic to digital platforms, and leveraging digital tools to amplify traditional campaigns."
    }
  ]

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <main>
      {/* Hero Section */}
      <div className="bg-[#FAFAFA] pt-20 pb-16">
        <div className="container mx-auto px-8">
          <p className="text-[#535353] text-base mb-4">Home / FAQ's</p>
          <h1 className="text-black text-5xl font-bold capitalize leading-[67px] mb-6">Frequently Asked Questions</h1>
          <p className="text-[#535353] text-base max-w-[553px] capitalize">
            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
          </p>
        </div>
      </div>

      {/* FAQ Accordion Section */}
      <div className="container mx-auto px-8 py-16">
        <div className="bg-white rounded-3xl overflow-hidden border border-black">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`border-b border-black ${index === 0 ? 'border-t' : ''}`}
            >
              <button
                className="w-full px-6 py-6 flex justify-between items-center text-left"
                onClick={() => toggleAccordion(index)}
              >
                <h3 className="text-2xl font-semibold text-[#010205] leading-9">{faq.question}</h3>
                <div className="w-6 h-6 flex items-center justify-center">
                  {activeIndex === index ? (
                    <div className="w-4 h-4 border-2 border-black"></div>
                  ) : (
                    <div className="w-3.5 h-3.5 border-2 border-black"></div>
                  )}
                </div>
              </button>
              {activeIndex === index && (
                <div className="px-6 pb-6">
                  <p className="text-base text-[#535353]">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  )
} 