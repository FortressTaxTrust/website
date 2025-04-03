'use client';

import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function BusinessTaxPlanningPage() {
  const serviceOfferings = [
    {
      title: "Tax strategy development",
      description: "Our tax strategy development services help businesses create comprehensive tax plans that minimize tax liability while ensuring compliance with all applicable laws and regulations. We analyze your business operations to identify tax-saving opportunities and develop strategies for both short-term and long-term tax efficiency."
    },
    {
      title: "Entity structure optimization",
      description: ""
    },
    {
      title: "Tax compliance",
      description: ""
    },
    {
      title: "Tax credits and incentives",
      description: ""
    },
    {
      title: "International tax planning",
      description: ""
    },
    {
      title: "Mergers and acquisitions tax",
      description: ""
    },
    {
      title: "State and local tax planning",
      description: ""
    },
    {
      title: "Tax controversy representation",
      description: ""
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
                className={`p-4 md:p-6 flex flex-col gap-4 md:gap-6 lg:gap-8 ${
                  index === 0 
                    ? 'bg-white border-t-4 md:border-t-8 border-b border-primary' 
                    : 'bg-white border-b border-[#D3D3D3]'
                }`}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-xl md:text-2xl font-semibold font-inter capitalize">{service.title}</h3>
                  <div className="w-6 h-6 relative overflow-hidden">
                    {/* Icon placeholder */}
                  </div>
                </div>
                {service.description && (
                  <p className="text-gray-dark text-sm md:text-base">{service.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-primary py-12 md:py-16 lg:py-24">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <h2 className="text-2xl md:text-3xl lg:text-[45px] font-semibold font-inter capitalize text-white mb-8 md:mb-12 lg:mb-16">Get in touch with our specialists</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-xl md:rounded-2xl overflow-hidden pb-6 md:pb-8">
                <div className="h-[180px] md:h-[230px] relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-[150px] md:w-[210px] h-[150px] md:h-[210px] rounded-full overflow-hidden">
                      <Image 
                        src={member.imageUrl} 
                        alt={member.name}
                        width={210}
                        height={210}
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="px-4 flex flex-col items-center gap-4 md:gap-6">
                  <div className="text-center">
                    <h3 className="text-base md:text-lg font-semibold font-inter">{member.name}</h3>
                    <p className="text-gray-dark text-xs md:text-sm">{member.title}</p>
                    <p className="text-gray-dark text-xs md:text-sm mt-2">{member.description}</p>
                  </div>
                  
                  <div className="flex gap-3 md:gap-4">
                    {[1, 2, 3, 4].map((_, i) => (
                      <div key={i} className="w-7 h-7 md:w-9 md:h-9 rounded-full bg-primary flex items-center justify-center">
                        {/* Social media icons */}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 