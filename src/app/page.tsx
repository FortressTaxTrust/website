'use client';

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Mike A.",
      title: "Cranston, R.I.",
      image: "/images/Testimonial Mike A..jpg",
      heading: "Strategic. Trustworthy. Effective.",
      text: "I was referred to Fortress Tax & Trust by a business associate.  Their ability to use my pass through and business trusts in order to significantly reduce tax liabilities has been nothing short of amazing.  When I have tax questions, they have answers.  I have been sleeping much better at night."
    },
    {
      name: "Shelly W.",
      title: "Seattle, WA",
      image: "/images/Testimonial Shelly W..jpg", // Using the same image for now
      heading: "Reliable. Proactive. Exceptional.",
      text: "The Team at Fortress have been so easy to work with.  From tax planning to filing my business and trust taxes, they have gone above and beyond my expectations!"
    },
    {
      name: "Mitchell R.",
      title: "Provo, UT",
      image: "/images/Testimonial Mitchell R Provo, UT.jpg", // Using the same image for now
      heading: "Personalized. Thorough. Outstanding.",
      text: "After my CPA retired, I was referred to Fortress and the attention to detail and the way the Took the time to learn about me and my business and the results have been extraordinary."
    },
    {
      name: "Priya G.",
      title: "Chicago, IL",
      image: "/images/Testimonial Priya G..jpg", // Using the same image for now
      heading: "Supportive. Strategic. Impactful.",
      text: "I needed help figuring out how to sell my business, direct the assets, and figure out how To transition to my next venture.  The proferssionals at Fortress Tax & Trust stood by me and Saved me so much time and money."
    }
  ];

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
      <Header />
      
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Content - First on mobile, second on desktop */}
          <div className="flex-1 space-y-6 p-8 md:p-12 order-2 md:order-1 flex flex-col justify-center items-center">
            <div className="w-full max-w-md">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-inter font-semibold capitalize leading-tight md:leading-[67px]">
                Strategize. Fortify. Dominate.
              </h1>
              <p className="text-base md:text-lg text-gray-dark leading-relaxed">
                We don't just do taxes — we build financial fortresses.
              </p>
              <div className="pt-4">
                <Link href="/services" className="px-8 py-3 bg-primary text-white font-medium rounded-md hover:bg-primary/90 transition-colors w-auto inline-block">
                  LEARN MORE
                </Link>
              </div>
            </div>
          </div>
          
          {/* Image - Second on mobile, first on desktop */}
          <div className="flex-1 w-full order-1 md:order-2 h-[40vh] md:h-full">
            <Image
              src="/images/heroImage.jpg"
              alt="Hero image"
              width={747}
              height={671}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="w-full bg-primary py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-start gap-8 mb-12">
            <div className="text-white text-3xl md:text-4xl lg:text-[49px] font-inter font-semibold capitalize leading-[67px]">
              Our services
            </div>
            <div className="text-white text-base md:text-xl font-inter font-normal">
              <span className="capitalize">We</span>
              <span>
                {" offer end-to-end tax and advisory services built to protect your assets, minimize your tax burden, and power your business forward. From entity selection to trust and estate planning, our team delivers strategy with precision."}
              </span>
            </div>
          </div>
          
          {/* Service Images Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex flex-col">
              <div className="aspect-square bg-white/10 rounded-lg overflow-hidden">
                <Image
                  src="/images/Buisness structure image.png"
                  alt="Business Structure & Entity Selection"
                  width={300}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="aspect-square bg-white/10 rounded-lg overflow-hidden">
                <Image
                  src="/images/Buisness structure image.png"
                  alt="Business Accounting"
                  width={300}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="aspect-square bg-white/10 rounded-lg overflow-hidden">
                <Image
                  src="/images/tax planning and compliance.png"
                  alt="Tax Planning & Compliance"
                  width={300}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="aspect-square bg-white/10 rounded-lg overflow-hidden">
                <Image
                  src="/images/estate planning.png"
                  alt="Estate Planning"
                  width={300}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          
          {/* All Services Button */}
          <div className="mt-10 text-center">
            <Link href="/services" className="inline-block px-8 py-3 bg-white text-primary font-medium rounded-md hover:bg-gray-100 transition-colors">
              All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="w-full py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-inter font-semibold text-center mb-8 md:mb-12">Our team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
            {/* Team Member 1 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative h-80 pt-4">
                <Image
                  src="/images/Tyler Portrait.jpg"
                  alt="Tyler Ballein"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">Tyler Ballein</h3>
                <p className="text-gray-600 mb-4">Managing Partner / Director of Strategic Tax Planning</p>
                <p className="text-sm text-gray-500">
                  Specializing in corporate tax planning and international tax compliance with over 15 years of experience.
                </p>
              </div>
            </div>
            
            {/* Team Member 2 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative h-80 pt-4">
                <Image
                  src="/images/Kevin Portrait.jpg"
                  alt="Kevin MacKenzie"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">Kevin MacKenzie</h3>
                <p className="text-gray-600 mb-4">Managing Partner / Director of Operations</p>
                <p className="text-sm text-gray-500">
                  Expert in small business tax strategies and IRS representation with a focus on tax minimization.
                </p>
              </div>
            </div>
            
            {/* Team Member 3 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative h-80 pt-4">
                <Image
                  src="/images/Vance Portrait.jpg"
                  alt="Vance Wade"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">Vance Wade</h3>
                <p className="text-gray-600 mb-4">CPA / Special Projects Manager</p>
                <p className="text-sm text-gray-500">
                  Dedicated to ensuring businesses meet all regulatory requirements while optimizing tax positions.
                </p>
              </div>
            </div>
            
            {/* Team Member 4 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative h-80 pt-4">
                <Image
                  src="/images/Kathleen Portait.jpg"
                  alt="Kathleen Caffey"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">Kathleen Caffey</h3>
                <p className="text-gray-600 mb-4">Executive Client Services Specialist</p>
                <p className="text-sm text-gray-500">
                  Leading our digital transformation initiatives to streamline tax processes and improve efficiency.
                </p>
              </div>
            </div>
            
            {/* Team Member 5 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative h-80 pt-4">
                <Image
                  src="/images/Eileen Kosoy portrait.png"
                  alt="Eileen Kosoy"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">Eileen Kosoy</h3>
                <p className="text-gray-600 mb-4">Executive Accounting Services Specialist</p>
                <p className="text-sm text-gray-500">
                  Providing comprehensive accounting services with a focus on accuracy, compliance, and strategic financial insights for businesses of all sizes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full bg-gray-light py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 bg-primary p-6 md:p-8 relative">
              <div className="relative h-[300px] md:h-[500px]">
                <Image
                  src={testimonials[activeTestimonial].image}
                  alt={`${testimonials[activeTestimonial].name} Testimonial`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="mt-4 md:mt-8">
                <h3 className="text-xl md:text-2xl font-inter font-bold text-white">{testimonials[activeTestimonial].name}</h3>
                <p className="text-white">{testimonials[activeTestimonial].title}</p>
              </div>
            </div>
            <div className="md:w-2/3 p-6 md:p-8">
              <div className="mb-8">
                <div className="w-14 h-14 mb-4">
                  <div className="w-14 h-0.5 bg-black"></div>
                </div>
                <h2 className="text-3xl md:text-4xl font-inter font-semibold mb-4 md:mb-6">{testimonials[activeTestimonial].heading}</h2>
                <p className="text-lg md:text-xl text-gray-dark">
                  {testimonials[activeTestimonial].text}
                </p>
              </div>
              <div className="flex items-center gap-4 md:gap-5">
                {testimonials.map((_, index) => (
                  <div 
                    key={index} 
                    className={`flex items-center gap-2 cursor-pointer ${index === activeTestimonial ? 'text-black' : 'text-gray-medium'}`}
                    onClick={() => handleTestimonialChange(index)}
                  >
                    <span className="text-xl md:text-2xl font-medium">{String(index + 1).padStart(2, '0')}</span>
                    {index === activeTestimonial && <div className="w-16 md:w-24 h-0.5 bg-black"></div>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="w-full py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12">
            <div className="md:w-1/2">
              <Image
                src="/images/Who we are pic.png"
                alt="Who we are"
                width={621}
                height={600}
                className="w-full h-auto rounded-3xl"
              />
            </div>
            <div className="md:w-1/2 space-y-6">
              <h2 className="text-3xl md:text-4xl font-inter font-semibold">Who we are</h2>
              <p className="text-base md:text-lg text-gray-dark leading-relaxed">
                We're a tight-knit team with sharp minds, big hearts, and a clear mission. Fortress Tax & Trust was built to do meaningful work with people we genuinely care about — and that hasn't changed since day one.
              </p>
              <p className="text-base md:text-lg text-gray-dark leading-relaxed">
                Each member of our team brings unique expertise, diverse perspectives, and a shared commitment to excellence. We're fueled by curiosity, grounded in integrity, and driven by the impact we create for our clients. More than a service provider, we're a trusted partner — building real relationships and growing alongside the businesses and communities we serve.
              </p>
              <Link href="/about" className="px-6 py-2.5 bg-primary text-white rounded-md font-inter uppercase w-full sm:w-auto inline-block text-center">
                More About Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      {/* <section className="w-full py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-inter font-semibold text-center mb-8 md:mb-12">Our Latest Blog Posts</h2>
          <div className="flex flex-wrap justify-center gap-4 md:gap-10 mb-8 md:mb-12">
            <div className="w-60 h-10 bg-white rounded-full border border-black"></div>
            <div className="text-lg md:text-xl font-medium">Category name</div>
            <div className="text-lg md:text-xl">Industrial Solutions</div>
            <div className="text-lg md:text-xl">Commercial Solutions</div>
            <div className="text-lg md:text-xl">Open yards Solutions</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          </div>
        </div>
      </section> */}

      
    </div>
  );
} 