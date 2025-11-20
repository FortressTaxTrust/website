import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'

export default function AboutPage() {
  const values = [
    {
      title: "Clients Before Everything",
      description: "We measure success by the trust and results we deliver to our clients. Every decision, strategy, and service is designed to protect what matters most — your future.",
      image: "/images/high-five.svg"
    },
    {
      title: "Move with Intention",
      description: "We don't react. We plan, we predict, and we execute with purpose. Every move we make is grounded in strategy, precision, and your long-term advantage.",
      image: "/images/adapt-to-change.svg"
    },
    {
      title: "Own the Outcome",
      description: "We take full ownership — of the work, the results, and the impact. You'll never be left guessing. Accountability isn't just a principle — it's our standard.",
      image: "/images/checks.svg"
    },
    {
      title: "Think Ahead",
      description: "The rules change. The market shifts. But our clients stay ahead because we do. Innovation and adaptability are built into everything we offer.",
      image: "/images/innovation.svg"
    },
    {
      title: "Empower with Clarity",
      description: "We break down complexity into clear, actionable steps. Whether you're an entrepreneur or an enterprise, we equip you with knowledge that builds confidence.",
      image: "/images/empowerment.svg"
    },
    {
      title: "Exceed the Standard",
      description: "Good enough is never enough. We deliver elite service with relentless attention to detail, setting a new bar in tax strategy and advisory.",
      image: "/images/number 1 trophy.svg"
    }
  ]

  const teamMembers = [
    {
      name: "Tyler Ballein",
      title: "Managing Partner / Director of Strategic Tax Planning",
      description: "Specializing in corporate tax planning and international tax compliance with over 15 years of experience."
    },
    {
      name: "Kevin MacKenzie",
      title: "Managing Partner / Director of Operations",
      description: "Expert in small business tax strategies and IRS representation with a focus on tax minimization."
    },
    {
      name: "Vance Wade",
      title: "CPA / Special Projects Manager",
      description: "Dedicated to ensuring businesses meet all regulatory requirements while optimizing tax positions."
    },
    {
      name: "Kathleen Caffey",
      title: "Executive Client Services Specialist",
      description: "Leading our digital transformation initiatives to streamline tax processes and improve efficiency."
    },
    {
      name: "Eileen Kosoy",
      title: "Executive Accounting Services Specialist",
      description: "Providing comprehensive accounting services with a focus on accuracy, compliance, and strategic financial insights for businesses of all sizes."
    },
    {
      name: "Omer Muhammad",
      title: "CTO / Partner",
      description: "Leading technology strategy and digital innovation to enhance client services and operational efficiency."
    }
  ]

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative h-[300px] md:h-[400px] lg:h-[605px] w-full">
        <Image 
          src="/images/Gemini_Generated_Image_cgi4f1cgi4f1cgi4.png" 
          alt="About Us Hero" 
          fill 
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-[#5A6863]/31 to-[#5A6863]" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 w-full">
            <p className="text-white text-sm md:text-base mb-2 md:mb-4">Home / About Us</p>
            <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold capitalize leading-tight md:leading-[67px] mb-4 md:mb-6">Who We Are</h1>
            <p className="text-white text-sm md:text-base max-w-[553px] capitalize">
               
            </p>
          </div>
        </div>
      </div>

      {/* Who We Are Section */}
      <section className="w-full bg-[#FAFAFA] py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            <div className="w-full md:w-1/2">
              <Image 
                src="/images/Who we are pic.png" 
                alt="Who We Are" 
                width={621} 
                height={600} 
                className="rounded-xl md:rounded-2xl lg:rounded-3xl w-full h-auto"
              />
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold capitalize leading-tight md:leading-[56px] text-[#202020] mb-4 md:mb-8">who we are</h2>
              <p className="text-sm md:text-base text-[#535353] leading-relaxed">
                We're a tight-knit team with sharp minds, big hearts, and a clear mission. Fortress Tax & Trust was built to do meaningful work with people we genuinely care about — and that hasn't changed since day one.
              </p>
              <p className="text-sm md:text-base text-[#535353] leading-relaxed mt-4">
                Each member of our team brings unique expertise, diverse perspectives, and a shared commitment to excellence. We're fueled by curiosity, grounded in integrity, and driven by the impact we create for our clients. More than a service provider, we're a trusted partner — building real relationships and growing alongside the businesses and communities we serve.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Purpose Section */}
      <section className="w-full bg-[#5A6863] py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="bg-white rounded-xl md:rounded-2xl lg:rounded-3xl p-6 md:p-8 lg:p-12 flex flex-col md:flex-row gap-6 md:gap-8 items-center">
            <div className="w-full md:w-1/2 order-2 md:order-1">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold capitalize leading-tight md:leading-[56px] text-[#202020] mb-4 md:mb-8">Our Purpose</h2>
              <p className="text-sm md:text-base text-[#535353] leading-relaxed">
                To be the shield and strategist behind every great business and legacy. At Fortress Tax & Trust, our purpose is to protect what matters most — your profits, your peace of mind, and your future. We exist to simplify the complex, outmaneuver risk, and empower bold decisions that build lasting wealth.
              </p>
            </div>
            <div className="w-full md:w-1/2 order-1 md:order-2">
              <Image 
                src="/images/testimonial-purpose-1.png" 
                alt="Our Purpose" 
                width={800} 
                height={400} 
                className="rounded-xl md:rounded-2xl lg:rounded-3xl w-full h-auto object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="w-full bg-[#5A6863] py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="bg-white rounded-xl md:rounded-2xl lg:rounded-3xl p-6 md:p-8 lg:p-12 flex flex-col md:flex-row gap-6 md:gap-8 items-center">
            <div className="w-full md:w-1/2">
              <Image 
                src="/images/testimonial-mission-1.png" 
                alt="Our Mission" 
                width={800} 
                height={400} 
                className="rounded-xl md:rounded-2xl lg:rounded-3xl w-full h-auto object-cover object-center"
              />
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold capitalize leading-tight md:leading-[56px] text-[#202020] mb-4 md:mb-8">Our Mission</h2>
              <p className="text-sm md:text-base text-[#535353] leading-relaxed">
                To lead with precision, act with integrity, and deliver tax strategies that move businesses forward. We partner with entrepreneurs, families, and enterprises to navigate tax law with confidence, uncover new opportunities, and build structures that stand the test of time. Every plan we create is built on trust — and engineered for growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="w-full bg-[#FAFAFA] py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold capitalize leading-tight md:leading-[56px] text-[#202020] text-center mb-6 md:mb-10">Our Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-6 md:p-8 rounded-lg">
                <div className="w-12 h-12 md:w-[59px] md:h-[59px] mb-6 md:mb-9 flex items-center justify-center">
                  {value.image ? (
                    <Image 
                      src={value.image} 
                      alt={value.title} 
                      width={59} 
                      height={59} 
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="w-full h-full bg-black rounded-full"></div>
                  )}
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-5">{value.title}</h3>
                <p className="text-sm md:text-base text-[#535353] leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="w-full bg-[#5A6863] py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold capitalize leading-tight md:leading-[60px] text-white text-center mb-6 md:mb-10">Meet our team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 md:gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-xl md:rounded-2xl overflow-hidden pb-6 md:pb-8">
                <div className="h-[200px] md:h-[230px] relative overflow-hidden">
                  <Image 
                    src={index === 0 ? "/images/Tyler Portrait.jpg" : 
                          index === 1 ? "/images/Kevin Portrait.jpg" : 
                          index === 2 ? "/images/Vance Portrait.jpg" : 
                          index === 3 ? "/images/Kathleen Portait.jpg" : 
                          index === 4 ? "/images/Eileen Kosoy portrait.png" : 
                          index === 5 ? "/images/Omer Portrait.png" : 
                          "/placeholder.jpg"} 
                    alt={member.name} 
                    fill 
                    className="object-cover object-center"
                  />
                </div>
                <div className="px-4 pt-4 md:pt-6">
                  <h3 className="text-base md:text-lg font-semibold text-center mb-1">{member.name}</h3>
                  <p className="text-xs md:text-sm text-[#535353] text-center mb-2">{member.title}</p>
                  <p className="text-xs md:text-sm text-[#535353] text-center mb-4 md:mb-6">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
} 