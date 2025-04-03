'use client';

import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function BusinessAccountingPage() {
  const serviceOfferings = [
    {
      title: "Financial statement preparation",
      description: "Our team provides comprehensive financial statement preparation services, ensuring accuracy and compliance with accounting standards. We handle everything from basic statements to complex consolidated reports."
    },
    {
      title: "Bookkeeping and accounting",
      description: ""
    },
    {
      title: "Account reconciliation",
      description: ""
    },
    {
      title: "Financial reporting",
      description: ""
    },
    {
      title: "Cash flow management",
      description: ""
    },
    {
      title: "Budget preparation",
      description: ""
    },
    {
      title: "Internal controls",
      description: ""
    },
    {
      title: "Process improvement",
      description: ""
    }
  ];

  const teamMembers = [
    {
      name: "Amanda Fisher",
      title: "Senior Accountant",
      description: "There are many variations of passages of Lorem Ipsum available",
      imageUrl: "https://placehold.co/253x380"
    },
    {
      name: "Amanda Fisher",
      title: "Accounting Manager",
      description: "There are many variations of passages of Lorem Ipsum available",
      imageUrl: "https://placehold.co/237x354"
    },
    {
      name: "Mike Cannon",
      title: "Financial Controller",
      description: "There are many variations of passages of Lorem Ipsum available",
      imageUrl: "https://placehold.co/348x232"
    },
    {
      name: "Erika Gofas",
      title: "Accounting Director",
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
          alt="Business Accounting"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(0,0,0,0.20)] via-[rgba(36.67,42.37,40.33,0.31)] to-primary" />
        <div className="relative container mx-auto px-12 pt-40">
          <div className="text-white">
            <div className="text-base mb-4">Home / Our Services / Advisory / Business Accounting</div>
            <h1 className="text-[55px] font-bold font-inter capitalize mb-6">Business Accounting</h1>
            <p className="max-w-[553px] text-base">
              Our comprehensive business accounting services help organizations maintain accurate financial records, ensure compliance, and make informed business decisions based on reliable financial data.
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-12 py-24">
        <div className="flex flex-col gap-10">
          <h2 className="text-[48px] font-bold font-inter capitalize">Streamline your financial operations</h2>
          <p className="text-[#535353] text-xl leading-8">
            Effective business accounting is the foundation of financial success. Our team of experienced professionals provides comprehensive accounting services tailored to your business needs, ensuring accuracy, compliance, and strategic insights.
            <br/><br/>
            From day-to-day bookkeeping to complex financial reporting, we help businesses maintain organized financial records, implement efficient processes, and make data-driven decisions.
            <br/><br/>
            Our accounting services are designed to give you peace of mind, knowing that your financial operations are in expert hands, allowing you to focus on growing your business.
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