'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function BusinessTrustAndEstatePlanningPage() {
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
      title: "Estate Planning",
      description: "Our estate planning services help individuals and families create comprehensive plans to preserve and transfer wealth according to their wishes. We develop strategies that minimize estate taxes, protect assets, and ensure a seamless transition to future generations."
    },
    {
      title: "Trust Planning",
      description: "We design and implement trust structures tailored to your goals — from revocable living trusts to complex irrevocable trusts — providing privacy, control, and long-term asset protection."
    },
    {
      title: "Asset Protection",
      description: "We help safeguard your wealth from creditors, lawsuits, and unforeseen liabilities through customized asset protection strategies that maintain compliance while minimizing risk."
    },
    {
      title: "Charitable Giving Strategies",
      description: "We assist in structuring philanthropic efforts that align with your values, reduce tax liability, and leave a lasting legacy through vehicles such as donor-advised funds, charitable trusts, and private foundations."
    },
    {
      title: "Family Limited Partnerships",
      description: "We help you establish family limited partnerships to consolidate wealth, retain control, and facilitate the tax-efficient transfer of assets to future generations."
    },
    {
      title: "Business Succession Planning",
      description: "We guide business owners through succession planning to ensure a smooth transition of leadership and ownership — preserving both business continuity and family harmony."
    },
    {
      title: "Life Insurance Planning",
      description: "We incorporate life insurance into your estate strategy to enhance liquidity, cover tax obligations, and provide financial security for your beneficiaries."
    },
    {
      title: "Legacy Planning",
      description: "Beyond assets, we help you define and preserve your values, vision, and generational impact — ensuring that your legacy reflects more than just wealth."
    }
  ];

  const teamMembers = [
    {
      name: "Amanda Fisher",
      title: "Estate Planning Specialist",
      description: "There are many variations of passages of Lorem Ipsum available",
      imageUrl: "https://placehold.co/253x380"
    },
    {
      name: "Amanda Fisher",
      title: "Trust Planning Director",
      description: "There are many variations of passages of Lorem Ipsum available",
      imageUrl: "https://placehold.co/237x354"
    },
    {
      name: "Mike Cannon",
      title: "Asset Protection Lead",
      description: "There are many variations of passages of Lorem Ipsum available",
      imageUrl: "https://placehold.co/348x232"
    },
    {
      name: "Erika Gofas",
      title: "Estate Planning Partner",
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
          alt="Business Trust and Estate Planning"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(0,0,0,0.20)] via-[rgba(36.67,42.37,40.33,0.31)] to-primary" />
        <div className="relative container mx-auto px-12 pt-40">
          <div className="text-white">
            <div className="text-base mb-4">Home / Our Services / Advisory / Business Trust and Estate Planning</div>
            <h1 className="text-[55px] font-bold font-inter capitalize mb-6">Business Trust and Estate Planning</h1>
            <p className="max-w-[553px] text-base">
              Our business trust and estate planning services help individuals and families protect their assets, minimize tax liability, and ensure a smooth transition of wealth to future generations through comprehensive planning strategies.
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-12 py-24">
        <div className="flex flex-col gap-10">
          <h2 className="text-[48px] font-bold font-inter capitalize">Secure your legacy for future generations</h2>
          <p className="text-[#535353] text-xl leading-8">
            Business trust and estate planning is essential for protecting your assets, minimizing tax liability, and ensuring that your wealth is transferred according to your wishes. Our comprehensive planning services help you navigate the complex landscape of estate and trust law.
            <br/><br/>
            We work closely with business owners, executives, and high-net-worth individuals to develop customized strategies that address their unique needs and goals. From basic estate planning to complex trust structures, we provide the expertise and guidance needed to protect your legacy.
            <br/><br/>
            Our team of experienced professionals understands the intricacies of estate and trust law, tax regulations, and asset protection strategies, allowing us to create plans that maximize benefits while minimizing risks and tax exposure.
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