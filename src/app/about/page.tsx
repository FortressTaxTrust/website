import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'

export default function AboutPage() {
  const values = [
    {
      title: "People First",
      description: "CohnReznick Advisory, strategic and fiercely objective consultants, leverage a proprietary platform founded on innovation to skillfully oversee your transaction or transform the way you do business."
    },
    {
      title: "Embrace Change",
      description: "CohnReznick Advisory, strategic and fiercely objective consultants, leverage a proprietary platform founded on innovation to skillfully oversee your transaction or transform the way you do business."
    },
    {
      title: "Choose Accountability",
      description: "CohnReznick Advisory, strategic and fiercely objective consultants, leverage a proprietary platform founded on innovation to skillfully oversee your transaction or transform the way you do business."
    },
    {
      title: "Innovation",
      description: "CohnReznick Advisory, strategic and fiercely objective consultants, leverage a proprietary platform founded on innovation to skillfully oversee your transaction or transform the way you do business."
    },
    {
      title: "Empowerment",
      description: "CohnReznick Advisory, strategic and fiercely objective consultants, leverage a proprietary platform founded on innovation to skillfully oversee your transaction or transform the way you do business."
    }
  ]

  const teamMembers = [
    {
      name: "Amanda Fisher",
      title: "Insert your title here",
      description: "There are many variations of passages of Lorem Ipsum available"
    },
    {
      name: "Amanda Fisher",
      title: "Insert your title here",
      description: "There are many variations of passages of Lorem Ipsum available"
    },
    {
      name: "Mike Cannon",
      title: "Insert your title here",
      description: "There are many variations of passages of Lorem Ipsum available"
    },
    {
      name: "Erika Gofas",
      title: "Insert your title here",
      description: "There are many variations of passages of Lorem Ipsum available"
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[300px] md:h-[400px] lg:h-[605px]">
        <Image 
          src="/services-hero.jpg" 
          alt="About Us Hero" 
          fill 
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-[#5A6863]/31 to-[#5A6863]" />
        <div className="container mx-auto px-4 md:px-8 lg:px-12 relative h-full flex flex-col justify-center">
          <p className="text-white text-sm md:text-base mb-2 md:mb-4">Home / About Us</p>
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold capitalize leading-tight md:leading-[67px] mb-4 md:mb-6">Who We Are</h1>
          <p className="text-white text-sm md:text-base max-w-[553px] capitalize">
            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
          </p>
        </div>
      </div>

      {/* Who We Are Section */}
      <div className="bg-[#FAFAFA] py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            <div className="w-full md:w-1/2">
              <Image 
                src="/placeholder.jpg" 
                alt="Who We Are" 
                width={621} 
                height={600} 
                className="rounded-xl md:rounded-2xl lg:rounded-3xl w-full h-auto"
              />
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold capitalize leading-tight md:leading-[56px] text-[#202020] mb-4 md:mb-8">who we are</h2>
              <p className="text-sm md:text-base text-[#535353] capitalize leading-relaxed">
                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Mission Section */}
      <div className="bg-[#5A6863] py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <div className="bg-white rounded-xl md:rounded-2xl lg:rounded-3xl p-6 md:p-8 lg:p-12 flex flex-col md:flex-row gap-6 md:gap-8 items-center">
            <div className="w-full md:w-1/2">
              <Image 
                src="/placeholder.jpg" 
                alt="Our Mission" 
                width={530} 
                height={437} 
                className="rounded-xl md:rounded-2xl lg:rounded-3xl w-full h-auto"
              />
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold capitalize leading-tight md:leading-[56px] text-[#202020] mb-4 md:mb-8">Our Mission</h2>
              <p className="text-sm md:text-base text-[#535353] capitalize leading-relaxed">
                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Purpose Section */}
      <div className="bg-[#5A6863] py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <div className="bg-white rounded-xl md:rounded-2xl lg:rounded-3xl p-6 md:p-8 lg:p-12 flex flex-col md:flex-row gap-6 md:gap-8 items-center">
            <div className="w-full md:w-1/2 order-2 md:order-1">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold capitalize leading-tight md:leading-[56px] text-[#202020] mb-4 md:mb-8">Our Purpose</h2>
              <p className="text-sm md:text-base text-[#535353] capitalize leading-relaxed">
                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem
              </p>
            </div>
            <div className="w-full md:w-1/2 order-1 md:order-2">
              <Image 
                src="/placeholder.jpg" 
                alt="Our Purpose" 
                width={530} 
                height={436} 
                className="rounded-xl md:rounded-2xl lg:rounded-3xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="bg-[#FAFAFA] py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold capitalize leading-tight md:leading-[56px] text-[#202020] text-center mb-6 md:mb-10">Our Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-6 md:p-8 rounded-lg">
                <div className="w-12 h-12 md:w-[59px] md:h-[59px] bg-black mb-6 md:mb-9"></div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-5">{value.title}</h3>
                <p className="text-sm md:text-base text-[#535353] leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-[#5A6863] py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold capitalize leading-tight md:leading-[60px] text-white text-center mb-6 md:mb-10">Get in touch with our specialists</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-xl md:rounded-2xl overflow-hidden pb-6 md:pb-8">
                <div className="h-[200px] md:h-[230px] relative overflow-hidden">
                  <Image 
                    src="/placeholder.jpg" 
                    alt={member.name} 
                    fill 
                    className="object-cover"
                  />
                </div>
                <div className="px-4 pt-4 md:pt-6">
                  <h3 className="text-base md:text-lg font-semibold text-center mb-1">{member.name}</h3>
                  <p className="text-xs md:text-sm text-[#535353] text-center mb-2">{member.title}</p>
                  <p className="text-xs md:text-sm text-[#535353] text-center mb-4 md:mb-6">{member.description}</p>
                  <div className="flex justify-center gap-4 md:gap-6">
                    <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#5A6863] flex items-center justify-center">
                      <div className="w-3 h-2.5 md:w-4 md:h-3 border border-white"></div>
                    </div>
                    <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#5A6863] flex items-center justify-center">
                      <div className="w-2 h-2.5 md:w-2.5 md:h-3 border border-white"></div>
                    </div>
                    <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#5A6863] flex items-center justify-center"></div>
                    <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#5A6863] flex items-center justify-center"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 