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
    <main>
      {/* Hero Section */}
      <div className="relative h-[605px]">
        <Image 
          src="/services-hero.jpg" 
          alt="About Us Hero" 
          fill 
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-[#5A6863]/31 to-[#5A6863]" />
        <div className="container mx-auto px-8 relative h-full flex flex-col justify-center">
          <p className="text-white text-base mb-4">Home / About Us</p>
          <h1 className="text-white text-5xl font-bold capitalize leading-[67px] mb-6">Who We Are</h1>
          <p className="text-white text-base max-w-[553px] capitalize">
            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
          </p>
        </div>
      </div>

      {/* Who We Are Section */}
      <div className="bg-[#FAFAFA] py-16">
        <div className="container mx-auto px-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2">
              <Image 
                src="/placeholder.jpg" 
                alt="Who We Are" 
                width={621} 
                height={600} 
                className="rounded-3xl"
              />
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-5xl font-semibold capitalize leading-[56px] text-[#202020] mb-8">who we are</h2>
              <p className="text-base text-[#535353] capitalize leading-7">
                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Mission Section */}
      <div className="bg-[#5A6863] py-16">
        <div className="container mx-auto px-8">
          <div className="bg-white rounded-3xl p-12 flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/2">
              <Image 
                src="/placeholder.jpg" 
                alt="Our Mission" 
                width={530} 
                height={437} 
                className="rounded-3xl"
              />
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-5xl font-semibold capitalize leading-[56px] text-[#202020] mb-8">Our Mission</h2>
              <p className="text-base text-[#535353] capitalize leading-7">
                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Purpose Section */}
      <div className="bg-[#5A6863] py-16">
        <div className="container mx-auto px-8">
          <div className="bg-white rounded-3xl p-12 flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/2 order-2 md:order-1">
              <h2 className="text-5xl font-semibold capitalize leading-[56px] text-[#202020] mb-8">Our Purpose</h2>
              <p className="text-base text-[#535353] capitalize leading-7">
                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem
              </p>
            </div>
            <div className="w-full md:w-1/2 order-1 md:order-2">
              <Image 
                src="/placeholder.jpg" 
                alt="Our Purpose" 
                width={530} 
                height={436} 
                className="rounded-3xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="bg-[#FAFAFA] py-16">
        <div className="container mx-auto px-8">
          <h2 className="text-5xl font-semibold capitalize leading-[56px] text-[#202020] text-center mb-10">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-lg">
                <div className="w-[59px] h-[59px] bg-black mb-9"></div>
                <h3 className="text-2xl font-bold mb-5">{value.title}</h3>
                <p className="text-base text-[#535353] leading-6">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-[#5A6863] py-16">
        <div className="container mx-auto px-8">
          <h2 className="text-4xl font-semibold capitalize leading-[60px] text-white text-center mb-10">Get in touch with our specialists</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden pb-8">
                <div className="h-[230px] relative overflow-hidden">
                  <Image 
                    src="/placeholder.jpg" 
                    alt={member.name} 
                    fill 
                    className="object-cover"
                  />
                </div>
                <div className="px-4 pt-6">
                  <h3 className="text-lg font-semibold text-center mb-1">{member.name}</h3>
                  <p className="text-sm text-[#535353] text-center mb-2">{member.title}</p>
                  <p className="text-sm text-[#535353] text-center mb-6">{member.description}</p>
                  <div className="flex justify-center gap-6">
                    <div className="w-9 h-9 rounded-full bg-[#5A6863] flex items-center justify-center">
                      <div className="w-4 h-3 border border-white"></div>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-[#5A6863] flex items-center justify-center">
                      <div className="w-2.5 h-3 border border-white"></div>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-[#5A6863] flex items-center justify-center"></div>
                    <div className="w-9 h-9 rounded-full bg-[#5A6863] flex items-center justify-center"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </main>
  )
} 