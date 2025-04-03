'use client';

import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function BusinessTrustAndEstatePlanningPage() {
  const serviceOfferings = [
    {
      title: "Estate planning",
      description: "Our estate planning services help individuals and families create comprehensive plans to preserve and transfer wealth according to their wishes. We work with clients to develop strategies that minimize estate taxes, protect assets, and ensure a smooth transition of wealth to future generations."
    },
    {
      title: "Trust planning",
      description: ""
    },
    {
      title: "Asset protection",
      description: ""
    },
    {
      title: "Charitable giving strategies",
      description: ""
    },
    {
      title: "Family limited partnerships",
      description: ""
    },
    {
      title: "Business succession planning",
      description: ""
    },
    {
      title: "Life insurance planning",
      description: ""
    },
    {
      title: "Legacy planning",
      description: ""
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