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
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <div className="relative h-[605px]">
        <Image
          src="https://placehold.co/1440x605"
          alt="Business Tax Planning"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(0,0,0,0.20)] via-[rgba(36.67,42.37,40.33,0.31)] to-primary" />
        <div className="relative container mx-auto px-12 pt-40">
          <div className="text-white">
            <div className="text-base mb-4">Home / Our Services / Advisory / Business Tax Planning</div>
            <h1 className="text-[55px] font-bold font-inter capitalize mb-6">Business Tax Planning</h1>
            <p className="max-w-[553px] text-base">
              Our business tax planning services help organizations optimize their tax position, identify opportunities for tax savings, and ensure compliance with complex tax regulations while maximizing after-tax profits.
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-12 py-24">
        <div className="flex flex-col gap-10">
          <h2 className="text-[48px] font-bold font-inter capitalize">Maximize your tax efficiency</h2>
          <p className="text-[#535353] text-xl leading-8">
            Effective tax planning is essential for businesses looking to maximize profitability and ensure long-term financial success. Our team of tax specialists provides comprehensive tax planning services tailored to your specific business needs and industry.
            <br/><br/>
            We help businesses navigate the complex and ever-changing tax landscape, identifying opportunities for tax savings while ensuring full compliance with all applicable laws and regulations.
            <br/><br/>
            From entity structure optimization to tax credits and incentives, our tax planning services are designed to help you minimize your tax burden and maximize your after-tax profits.
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
                className={`p-6 flex flex-col gap-8 ${
                  index === 0 
                    ? 'bg-white border-t-8 border-b border-primary' 
                    : 'bg-white border-b border-[#D3D3D3]'
                }`}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-semibold font-inter capitalize">{service.title}</h3>
                  <div className="w-6 h-6 relative overflow-hidden">
                    {/* Icon placeholder */}
                  </div>
                </div>
                {service.description && (
                  <p className="text-[#535353] text-base">{service.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-primary py-24">
        <div className="container mx-auto px-12">
          <h2 className="text-[45px] font-semibold font-inter capitalize text-white mb-16">Get in touch with our specialists</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden pb-8">
                <div className="h-[230px] relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-[210px] h-[210px] rounded-full overflow-hidden">
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
                
                <div className="px-4 flex flex-col items-center gap-6">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold font-inter">{member.name}</h3>
                    <p className="text-[#535353] text-sm">{member.title}</p>
                    <p className="text-[#535353] text-sm mt-2">{member.description}</p>
                  </div>
                  
                  <div className="flex gap-4">
                    {[1, 2, 3, 4].map((_, i) => (
                      <div key={i} className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
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
    </main>
  );
} 