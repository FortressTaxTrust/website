'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function BusinessStructurePage() {
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
      title: "Entity Formation",
      description: "Our entity formation services help businesses choose and establish the most appropriate legal structure for their operations. We guide you through the process of selecting between LLC, S-Corp, C-Corp, and other entity types based on your specific business goals and tax considerations."
    },
    {
      title: "Entity Selection Analysis",
      description: "We evaluate the pros and cons of each entity type based on liability protection, tax treatment, ownership flexibility, and long-term goals — helping you make an informed and strategic decision."
    },
    {
      title: "Operating Agreements",
      description: "We draft and review operating agreements that clearly define ownership, responsibilities, and decision-making protocols — ensuring clarity, compliance, and conflict prevention among partners."
    },
    {
      title: "Corporate Governance",
      description: "We assist in setting up governance structures that promote accountability and compliance. From bylaws to board protocols, we help your business operate with integrity and control."
    },
    {
      title: "Partnership Agreements",
      description: "We craft customized partnership agreements that outline roles, profit-sharing, exit terms, and dispute resolution mechanisms — giving you peace of mind and a strong legal foundation."
    },
    {
      title: "Joint Venture Structures",
      description: "We help you structure joint ventures that align interests, manage risk, and define operational control between entities — ensuring legal clarity and tax efficiency."
    },
    {
      title: "Mergers and Acquisitions",
      description: "From due diligence to post-deal integration, we support your growth strategy with smart structuring, risk mitigation, and seamless tax planning for mergers, acquisitions, and reorganizations."
    },
    {
      title: "Business Restructuring",
      description: "When it's time to pivot, grow, or protect your assets, we help restructure your business for improved tax positioning, liability management, and operational efficiency."
    }
  ];

  const teamMembers = [
    {
      name: "Amanda Fisher",
      title: "Business Structure Specialist",
      description: "There are many variations of passages of Lorem Ipsum available",
      imageUrl: "https://placehold.co/253x380"
    },
    {
      name: "Amanda Fisher",
      title: "Entity Formation Director",
      description: "There are many variations of passages of Lorem Ipsum available",
      imageUrl: "https://placehold.co/237x354"
    },
    {
      name: "Mike Cannon",
      title: "Corporate Structure Lead",
      description: "There are many variations of passages of Lorem Ipsum available",
      imageUrl: "https://placehold.co/348x232"
    },
    {
      name: "Erika Gofas",
      title: "Business Formation Partner",
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
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <div className="relative h-[605px]">
        <Image
          src="https://placehold.co/1440x605"
          alt="Business Structure & Entity Selection"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(0,0,0,0.20)] via-[rgba(36.67,42.37,40.33,0.31)] to-primary" />
        <div className="relative container mx-auto px-12 pt-40">
          <div className="text-white">
            <div className="text-base mb-4">Home / Our Services / Advisory / Business Structure & Entity Selection</div>
            <h1 className="text-[55px] font-bold font-inter capitalize mb-6">Business Structure & Entity Selection</h1>
            <p className="max-w-[553px] text-base">
              Our business structure and entity selection services help organizations establish the optimal legal framework for their operations, ensuring tax efficiency, liability protection, and alignment with long-term business goals.
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-12 py-24">
        <div className="flex flex-col gap-10">
          <h2 className="text-[48px] font-bold font-inter capitalize">Build a solid foundation for your business</h2>
          <p className="text-[#535353] text-xl leading-8">
            The legal structure of your business is one of the most critical decisions you'll make as an entrepreneur. It impacts everything from tax obligations to personal liability and future growth opportunities.
            <br/><br/>
            Our team of experienced professionals provides comprehensive guidance on entity selection, helping you understand the implications of different business structures and choosing the one that best aligns with your goals.
            <br/><br/>
            From LLCs to S-Corps, partnerships to sole proprietorships, we help you navigate the complexities of business formation and establish a solid legal foundation for your success.
          </p>
        </div>
      </div>

      {/* Service Offerings Section */}
      <div className="bg-[#FAFAFA] py-24">
        <div className="container mx-auto px-12">
          <div className="bg-primary rounded-lg p-6 mb-10">
            <h2 className="text-[40px] font-bold font-inter capitalize text-center text-white">Service offerings</h2>
          </div>
          
          <div className="flex flex-col">
            {serviceOfferings.map((service, index) => (
              <div 
                key={index} 
                className={`p-6 flex flex-col gap-4 ${
                  index === 0 
                    ? 'bg-white border-t-8 border-b border-primary' 
                    : 'bg-white border-b border-[#D3D3D3]'
                }`}
              >
                <div 
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleAccordion(index)}
                >
                  <h3 className="text-2xl font-semibold font-inter capitalize">{service.title}</h3>
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
                    <p className="text-[#535353] text-base">{service.description}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-primary py-24">
        <div className="container mx-auto px-12">
          <h2 className="text-[45px] font-semibold font-inter capitalize text-white mb-16">Client Testimonials</h2>
          
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 bg-white p-6 md:p-8 relative rounded-2xl overflow-hidden">
              <div className="relative h-[300px] md:h-[500px]">
                <Image
                  src={testimonials[activeTestimonial].image}
                  alt={`${testimonials[activeTestimonial].name} Testimonial`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="mt-4 md:mt-8">
                <h3 className="text-xl md:text-2xl font-inter font-bold text-primary">{testimonials[activeTestimonial].name}</h3>
                <p className="text-[#535353]">{testimonials[activeTestimonial].title}</p>
              </div>
            </div>
            <div className="md:w-2/3 p-6 md:p-8">
              <div className="mb-8">
                <div className="w-14 h-14 mb-4">
                  <div className="w-14 h-0.5 bg-white"></div>
                </div>
                <h2 className="text-3xl md:text-4xl font-inter font-semibold mb-4 md:mb-6 text-white">{testimonials[activeTestimonial].heading}</h2>
                <p className="text-lg md:text-xl text-white">
                  {testimonials[activeTestimonial].text}
                </p>
              </div>
              <div className="flex items-center gap-4 md:gap-5">
                {testimonials.map((_, index) => (
                  <div 
                    key={index} 
                    className={`flex items-center gap-2 cursor-pointer ${index === activeTestimonial ? 'text-white' : 'text-white/50'}`}
                    onClick={() => handleTestimonialChange(index)}
                  >
                    <span className="text-xl md:text-2xl font-medium">{String(index + 1).padStart(2, '0')}</span>
                    {index === activeTestimonial && <div className="w-16 md:w-24 h-0.5 bg-white"></div>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 