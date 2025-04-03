import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center gap-8 md:gap-12 py-8 md:py-12">
        <div className="flex-1 space-y-4 md:space-y-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-inter font-semibold capitalize">
            Together, we thrive.
          </h2>
          <p className="text-base md:text-lg text-gray-dark leading-relaxed">
            Dive into our 2024 Audit Innovation Survey to understand barriers and expectations in the industry.
          </p>
          <button className="px-6 py-2.5 bg-primary text-white rounded-md font-inter uppercase w-full sm:w-auto">
            LEARN MORE
          </button>
        </div>
        <div className="flex-1 w-full">
          <Image
            src="/placeholder.jpg"
            alt="Hero image"
            width={747}
            height={671}
            className="w-full h-auto rounded-lg"
            priority
          />
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-primary px-4 md:px-8 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-inter font-semibold text-white capitalize mb-4 md:mb-6">
            Our services
          </h2>
          <p className="text-lg md:text-xl text-white leading-relaxed">
            At the heart of Qatar's economic vision, our business offerings play a pivotal role in advancing your business, aligning seamlessly with the nation's overarching strategy for economic growth and diversification.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-inter font-semibold text-center mb-8 md:mb-12">Our team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {/* Team Member 1 */}
            <div className="bg-white rounded-lg overflow-hidden border-2 border-gray-light">
              <div className="aspect-[4/3] relative overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-10"></div>
                <Image
                  src="/placeholder.jpg"
                  alt="Team member"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 md:p-6">
                <h3 className="text-lg font-inter font-semibold text-center">Amanda Fisher</h3>
                <p className="text-sm text-gray-dark text-center">Insert your title here</p>
                <p className="text-sm text-gray-dark text-center mt-2">
                  There are many variations of passages of Lorem Ipsum available
                </p>
                <div className="flex justify-center gap-4 mt-6">
                  <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center">
                    <div className="w-4 h-3 border border-white"></div>
                  </div>
                  <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center">
                    <div className="w-2.5 h-3 border border-white"></div>
                  </div>
                  <div className="w-9 h-9 bg-primary rounded-full"></div>
                  <div className="w-9 h-9 bg-primary rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Team Member 2 */}
            <div className="bg-white rounded-lg overflow-hidden border-2 border-gray-light">
              <div className="aspect-[4/3] relative overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-10"></div>
                <Image
                  src="/placeholder.jpg"
                  alt="Team member"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 md:p-6">
                <h3 className="text-lg font-inter font-semibold text-center">Amanda Fisher</h3>
                <p className="text-sm text-gray-dark text-center">Insert your title here</p>
                <p className="text-sm text-gray-dark text-center mt-2">
                  There are many variations of passages of Lorem Ipsum available
                </p>
                <div className="flex justify-center gap-4 mt-6">
                  <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center">
                    <div className="w-4 h-3 border border-white"></div>
                  </div>
                  <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center">
                    <div className="w-2.5 h-3 border border-white"></div>
                  </div>
                  <div className="w-9 h-9 bg-primary rounded-full"></div>
                  <div className="w-9 h-9 bg-primary rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Team Member 3 */}
            <div className="bg-white rounded-lg overflow-hidden border-2 border-gray-light">
              <div className="aspect-[4/3] relative overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-10"></div>
                <Image
                  src="/placeholder.jpg"
                  alt="Team member"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 md:p-6">
                <h3 className="text-lg font-inter font-semibold text-center">Mike Cannon</h3>
                <p className="text-sm text-gray-dark text-center">Insert your title here</p>
                <p className="text-sm text-gray-dark text-center mt-2">
                  There are many variations of passages of Lorem Ipsum available
                </p>
                <div className="flex justify-center gap-4 mt-6">
                  <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center">
                    <div className="w-4 h-3 border border-white"></div>
                  </div>
                  <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center">
                    <div className="w-2.5 h-3 border border-white"></div>
                  </div>
                  <div className="w-9 h-9 bg-primary rounded-full"></div>
                  <div className="w-9 h-9 bg-primary rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Team Member 4 */}
            <div className="bg-white rounded-lg overflow-hidden border-2 border-gray-light">
              <div className="aspect-[4/3] relative overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-10"></div>
                <Image
                  src="/placeholder.jpg"
                  alt="Team member"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 md:p-6">
                <h3 className="text-lg font-inter font-semibold text-center">Erika Gofas</h3>
                <p className="text-sm text-gray-dark text-center">Insert your title here</p>
                <p className="text-sm text-gray-dark text-center mt-2">
                  There are many variations of passages of Lorem Ipsum available
                </p>
                <div className="flex justify-center gap-4 mt-6">
                  <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center">
                    <div className="w-4 h-3 border border-white"></div>
                  </div>
                  <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center">
                    <div className="w-2.5 h-3 border border-white"></div>
                  </div>
                  <div className="w-9 h-9 bg-primary rounded-full"></div>
                  <div className="w-9 h-9 bg-primary rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-light py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 bg-primary p-6 md:p-8 relative">
              <div className="relative h-[300px] md:h-[500px]">
                <Image
                  src="/placeholder.jpg"
                  alt="Testimonial"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="mt-6 md:mt-96">
                <h3 className="text-xl md:text-2xl font-inter font-bold text-white">Jack Nitzsche</h3>
                <p className="text-white">Investor Group Coordinator</p>
              </div>
            </div>
            <div className="md:w-2/3 p-6 md:p-8">
              <div className="mb-8">
                <div className="w-14 h-14 mb-4">
                  <div className="w-14 h-0.5 bg-black"></div>
                </div>
                <h2 className="text-3xl md:text-4xl font-inter font-semibold mb-4 md:mb-6">Absolutely wonderful!</h2>
                <p className="text-lg md:text-xl text-gray-dark">
                  Error voluptate adipisci. Quas a delectus optio ut. Non consequatur voluptatem quia rerum cum similique enim.
                </p>
              </div>
              <div className="flex items-center gap-4 md:gap-5">
                <div className="flex items-center gap-2">
                  <span className="text-xl md:text-2xl font-medium">01</span>
                  <div className="w-16 md:w-24 h-0.5 bg-black"></div>
                </div>
                <span className="text-xl md:text-2xl font-medium text-gray-medium">02</span>
                <span className="text-xl md:text-2xl font-medium text-gray-medium">03</span>
                <span className="text-xl md:text-2xl font-medium text-gray-medium">04</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12">
            <div className="md:w-1/2">
              <Image
                src="/placeholder.jpg"
                alt="Who we are"
                width={621}
                height={600}
                className="w-full h-auto rounded-3xl"
              />
            </div>
            <div className="md:w-1/2 space-y-6">
              <h2 className="text-3xl md:text-4xl font-inter font-semibold">Who we are</h2>
              <p className="text-base md:text-lg text-gray-dark leading-relaxed">
                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.
              </p>
              <button className="px-6 py-2.5 bg-primary text-white rounded-md font-inter uppercase w-full sm:w-auto">
                LEARN MORE
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-inter font-semibold text-center mb-8 md:mb-12">Our Latest Blog Posts</h2>
          <div className="flex flex-wrap justify-center gap-4 md:gap-10 mb-8 md:mb-12">
            <div className="w-60 h-10 bg-white rounded-full border border-black"></div>
            <div className="text-lg md:text-xl font-medium">Category name</div>
            <div className="text-lg md:text-xl">Industrial Solutions</div>
            <div className="text-lg md:text-xl">Commercial Solutions</div>
            <div className="text-lg md:text-xl">Open yards Solutions</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Blog posts will be added here */}
          </div>
        </div>
      </section>
    </div>
  );
} 