'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function BusinessTaxPlanningPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Mike A.",
      title: "Cranston, R.I.",
      image: "/images/Testimonial Mike A..jpg",
      heading: "Strategic. Trustworthy. Effective.",
      text: "I was referred to Fortress Tax & Trust by a business associate. Their ability to use my pass through and business trusts in order to significantly reduce tax liabilities has been nothing short of amazing. When I have tax questions, they have answers. I have been sleeping much better at night."
    },
    {
      name: "Shelly W.",
      title: "Seattle, WA",
      image: "/images/Testimonial Shelly W..jpg",
      heading: "Reliable. Proactive. Exceptional.",
      text: "The Team at Fortress have been so easy to work with. From tax planning to filing my business and trust taxes, they have gone above and beyond my expectations!"
    },
    {
      name: "Mitchell R.",
      title: "Provo, UT",
      image: "/images/Testimonial Mitchell R Provo, UT.jpg",
      heading: "Personalized. Thorough. Outstanding.",
      text: "After my CPA retired, I was referred to Fortress and the attention to detail and the way the Took the time to learn about me and my business and the results have been extraordinary."
    },
    {
      name: "Priya G.",
      title: "Chicago, IL",
      image: "/images/Testimonial Priya G..jpg",
      heading: "Supportive. Strategic. Impactful.",
      text: "I needed help figuring out how to sell my business, direct the assets, and figure out how To transition to my next venture. The proferssionals at Fortress Tax & Trust stood by me and Saved me so much time and money."
    }
  ];

  const serviceOfferings = [
    {
      title: "Tax Strategy Development",
      description: "Our tax strategy development services help businesses create comprehensive tax plans that minimize tax liability while ensuring compliance with all applicable laws and regulations. We analyze your business operations to identify tax-saving opportunities and develop strategies for both short-term and long-term tax efficiency."
    },
    {
      title: "Entity Structure Optimization",
      description: "We review and refine your business structure to ensure it's aligned with your growth goals and tax strategy. The right structure can significantly reduce tax liability while supporting operational efficiency and scalability."
    },
    {
      title: "Tax Compliance",
      description: "We manage your federal, state, and local tax filings to ensure accuracy, timeliness, and full compliance. Our proactive approach reduces audit risk and eliminates costly penalties or oversights."
    },
    {
      title: "Tax Credits and Incentives",
      description: "We identify and help you claim valuable tax credits and incentives — from R&D credits to energy efficiency programs — so you can reinvest more into your business."
    },
    {
      title: "International Tax Planning",
      description: "We support globally minded businesses with international tax strategies, including transfer pricing, cross-border structuring, and compliance with U.S. and foreign tax laws."
    },
    {
      title: "Mergers and Acquisitions Tax",
      description: "Our experts provide tax planning and due diligence for mergers, acquisitions, and reorganizations. We help structure deals for tax efficiency while minimizing risk and maximizing post-transaction value."
    },
    {
      title: "State and Local Tax Planning",
      description: "We help navigate multi-state tax challenges, assess nexus exposure, and implement strategies that ensure compliance while reducing state and local tax obligations."
    },
    {
      title: "Tax Controversy Representation",
      description: "If you're facing an IRS or state audit, we've got your back. Our team represents you with authority, handles communication, and works toward favorable resolutions that protect your business interests."
    }
  ];

  const teamMembers = [
    {
      name: "Amanda Fisher",
      title: "Tax Planning Specialist",
      description: "There are many variations of passages of Lorem Ipsum available",
      imageUrl: "https://placehold.co/253x380"
    },
    {
      name: "Amanda Fisher",
      title: "Tax Strategy Director",
      description: "There are many variations of passages of Lorem Ipsum available",
      imageUrl: "https://placehold.co/237x354"
    },
    {
      name: "Mike Cannon",
      title: "Tax Planning Lead",
      description: "There are many variations of passages of Lorem Ipsum available",
      imageUrl: "https://placehold.co/348x232"
    },
    {
      name: "Erika Gofas",
      title: "Tax Planning Partner",
      description: "There are many variations of passages of Lorem Ipsum available",
      imageUrl: "https://placehold.co/205x258"
    }
  ];

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleTestimonialChange = (index: number) => {
    setActiveTestimonial(index);
  };

  // Auto-rotate testimonials every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((current) => (current + 1) % testimonials.length);
    }, 5000);

    // Clean up the interval when component unmounts
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[300px] md:h-[400px] lg:h-[605px]">
        <Image
          src="https://placehold.co/1440x605"
          alt="Business Tax Planning"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(0,0,0,0.20)] via-[rgba(36.67,42.37,40.33,0.31)] to-primary" />
        <div className="relative container mx-auto px-4 md:px-8 lg:px-12 pt-20 md:pt-32 lg:pt-40">
          <div className="text-white">
            <div className="text-sm md:text-base mb-2 md:mb-4">Home / Our Services / Advisory / Business Tax Planning</div>
            <h1 className="text-3xl md:text-4xl lg:text-[55px] font-bold font-inter capitalize mb-4 md:mb-6">Business Tax Planning</h1>
            <p className="max-w-[553px] text-sm md:text-base">
              Our business tax planning services help organizations optimize their tax position, identify opportunities for tax savings, and ensure compliance with complex tax regulations while maximizing after-tax profits.
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 md:px-8 lg:px-12 py-12 md:py-16 lg:py-24">
        <div className="flex flex-col gap-6 md:gap-8 lg:gap-10">
          <h2 className="text-3xl md:text-4xl lg:text-[48px] font-bold font-inter capitalize">Maximize your tax efficiency</h2>
          <p className="text-gray-dark text-base md:text-lg lg:text-xl leading-relaxed">
            Effective tax planning is essential for businesses looking to maximize profitability and ensure long-term financial success. Our team of tax specialists provides comprehensive tax planning services tailored to your specific business needs and industry.
            <br/><br/>
            We help businesses navigate the complex and ever-changing tax landscape, identifying opportunities for tax savings while ensuring full compliance with all applicable laws and regulations.
            <br/><br/>
            From entity structure optimization to tax credits and incentives, our tax planning services are designed to help you minimize your tax burden and maximize your after-tax profits.
          </p>
        </div>
      </div>

      {/* Service Offerings Section */}
      <div className="bg-[#FAFAFA] py-12 md:py-16 lg:py-24">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <div className="bg-primary rounded-lg p-4 md:p-6 mb-6 md:mb-8 lg:mb-10">
            <h2 className="text-2xl md:text-3xl lg:text-[40px] font-bold font-inter capitalize text-center text-white">Service offerings</h2>
          </div>
          
          <div className="flex flex-col">
            {serviceOfferings.map((service, index) => (
              <div 
                key={index} 
                className={`p-4 md:p-6 flex flex-col gap-4 ${
                  index === 0 
                    ? 'bg-white border-t-4 md:border-t-8 border-b border-primary' 
                    : 'bg-white border-b border-[#D3D3D3]'
                }`}
              >
                <div 
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleAccordion(index)}
                >
                  <h3 className="text-xl md:text-2xl font-semibold font-inter capitalize">{service.title}</h3>
                  <div className="w-6 h-6 relative overflow-hidden">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className={`w-full h-full text-[#192031] transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`}
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                </div>
                {activeIndex === index && (
                  <div className="overflow-hidden transition-all duration-300 ease-in-out">
                    <p className="text-gray-dark text-sm md:text-base">{service.description}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-primary py-12 md:py-16 lg:py-24">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <h2 className="text-2xl md:text-3xl lg:text-[45px] font-semibold font-inter capitalize text-white mb-8 md:mb-12 lg:mb-16">Client Testimonials</h2>
          
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 bg-white p-4 md:p-6 lg:p-8 relative rounded-xl md:rounded-2xl overflow-hidden">
              <div className="relative h-[250px] md:h-[300px] lg:h-[500px]">
                <Image
                  src={testimonials[activeTestimonial].image}
                  alt={`${testimonials[activeTestimonial].name} Testimonial`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="mt-4 md:mt-6 lg:mt-8">
                <h3 className="text-lg md:text-xl lg:text-2xl font-inter font-bold text-primary">{testimonials[activeTestimonial].name}</h3>
                <p className="text-gray-dark text-sm md:text-base">{testimonials[activeTestimonial].title}</p>
              </div>
            </div>
            <div className="md:w-2/3 p-4 md:p-6 lg:p-8">
              <div className="mb-6 md:mb-8">
                <div className="w-10 md:w-14 h-10 md:h-14 mb-3 md:mb-4">
                  <div className="w-10 md:w-14 h-0.5 bg-white"></div>
                </div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-inter font-semibold mb-3 md:mb-4 lg:mb-6 text-white">{testimonials[activeTestimonial].heading}</h2>
                <p className="text-base md:text-lg lg:text-xl text-white">
                  {testimonials[activeTestimonial].text}
                </p>
              </div>
              <div className="flex items-center gap-3 md:gap-4 lg:gap-5">
                {testimonials.map((_, index) => (
                  <div 
                    key={index} 
                    className={`flex items-center gap-2 cursor-pointer ${index === activeTestimonial ? 'text-white' : 'text-white/50'}`}
                    onClick={() => handleTestimonialChange(index)}
                  >
                    <span className="text-lg md:text-xl lg:text-2xl font-medium">{String(index + 1).padStart(2, '0')}</span>
                    {index === activeTestimonial && <div className="w-12 md:w-16 lg:w-24 h-0.5 bg-white"></div>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 