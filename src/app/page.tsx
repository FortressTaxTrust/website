import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="flex items-center px-8 py-12">
        <div className="flex-1 pr-8">
          <h2 className="text-5xl font-inter font-semibold capitalize mb-5">
            Together, we thrive.
          </h2>
          <p className="text-base text-gray-dark leading-7 mb-8">
            Dive into our 2024 Audit Innovation Survey to understand barriers and expectations in the industry.
          </p>
          <button className="px-6 py-2.5 bg-primary text-white rounded-md font-inter uppercase w-40">
            LEARN MORE
          </button>
        </div>
        <div className="flex-1">
          <Image
            src="/placeholder.jpg"
            alt="Hero image"
            width={747}
            height={671}
            className="w-full h-auto"
          />
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-primary px-8 py-12">
        <h2 className="text-5xl font-inter font-semibold text-white capitalize mb-5">
          Our services
        </h2>
        <p className="text-xl text-white leading-7">
          At the heart of Qatar's economic vision, our business offerings play a pivotal role in advancing your business, aligning seamlessly with the nation's overarching strategy for economic growth and diversification.
        </p>
      </section>

      {/* Team Section */}
      <section className="px-8 py-16">
        <h2 className="text-4xl font-inter font-semibold text-center mb-12">Our team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Team Member 1 */}
          <div className="bg-white rounded-lg overflow-hidden border-2 border-gray-light">
            <div className="h-60 relative overflow-hidden">
              <div className="absolute inset-0 bg-black opacity-10"></div>
              <Image
                src="/placeholder.jpg"
                alt="Team member"
                width={253}
                height={380}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
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
            <div className="h-60 relative overflow-hidden">
              <div className="absolute inset-0 bg-black opacity-10"></div>
              <Image
                src="/placeholder.jpg"
                alt="Team member"
                width={237}
                height={354}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
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
            <div className="h-60 relative overflow-hidden">
              <div className="absolute inset-0 bg-black opacity-10"></div>
              <Image
                src="/placeholder.jpg"
                alt="Team member"
                width={348}
                height={232}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
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
            <div className="h-60 relative overflow-hidden">
              <div className="absolute inset-0 bg-black opacity-10"></div>
              <Image
                src="/placeholder.jpg"
                alt="Team member"
                width={205}
                height={258}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
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
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-light py-16">
        <div className="container mx-auto px-8">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 bg-primary p-8 relative">
              <Image
                src="/placeholder.jpg"
                alt="Testimonial"
                width={318}
                height={500}
                className="absolute right-0 top-16"
              />
              <div className="mt-96">
                <h3 className="text-2xl font-inter font-bold text-white">Jack Nitzsche</h3>
                <p className="text-white">Investor Group Coordinator</p>
              </div>
            </div>
            <div className="md:w-2/3 p-8">
              <div className="mb-8">
                <div className="w-14 h-14 mb-4">
                  <div className="w-14 h-0.5 bg-black"></div>
                </div>
                <h2 className="text-4xl font-inter font-semibold mb-6">Absolutely wonderful!</h2>
                <p className="text-xl text-gray-dark">
                  Error voluptate adipisci. Quas a delectus optio ut. Non consequatur voluptatem quia rerum cum similique enim.
                </p>
              </div>
              <div className="flex items-center gap-5">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-medium">01</span>
                  <div className="w-24 h-0.5 bg-black"></div>
                </div>
                <span className="text-2xl font-medium text-gray-medium">02</span>
                <span className="text-2xl font-medium text-gray-medium">03</span>
                <span className="text-2xl font-medium text-gray-medium">04</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="px-8 py-16">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-1/2">
            <Image
              src="/placeholder.jpg"
              alt="Who we are"
              width={621}
              height={600}
              className="w-full h-auto rounded-3xl"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-4xl font-inter font-semibold mb-6">Who we are</h2>
            <p className="text-base text-gray-dark leading-7 mb-8">
              Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem
            </p>
            <button className="px-6 py-2.5 bg-primary text-white rounded-md font-inter uppercase w-40">
              LEARN MORE
            </button>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="px-8 py-16">
        <h2 className="text-4xl font-inter font-semibold text-center mb-12">Our Latest Blog Posts</h2>
        <div className="flex justify-center gap-10 mb-12">
          <div className="w-60 h-10 bg-white rounded-full border border-black"></div>
          <div className="text-xl font-medium">Category name</div>
          <div className="text-xl">Industrial Solutions</div>
          <div className="text-xl">Commercial Solutions</div>
          <div className="text-xl">Open yards Solutions</div>
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <Image
              src="/placeholder.jpg"
              alt="Blog post"
              width={400}
              height={300}
              className="w-full h-auto rounded-lg mb-4"
            />
            <h3 className="text-xl font-inter font-semibold mb-2">Blog Post Title</h3>
            <p className="text-gray-dark mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <Link href="#" className="text-primary font-semibold">
              Read More
            </Link>
          </div>
          <div className="md:w-1/3">
            <Image
              src="/placeholder.jpg"
              alt="Blog post"
              width={400}
              height={300}
              className="w-full h-auto rounded-lg mb-4"
            />
            <h3 className="text-xl font-inter font-semibold mb-2">Blog Post Title</h3>
            <p className="text-gray-dark mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <Link href="#" className="text-primary font-semibold">
              Read More
            </Link>
          </div>
          <div className="md:w-1/3">
            <Image
              src="/placeholder.jpg"
              alt="Blog post"
              width={400}
              height={300}
              className="w-full h-auto rounded-lg mb-4"
            />
            <h3 className="text-xl font-inter font-semibold mb-2">Blog Post Title</h3>
            <p className="text-gray-dark mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <Link href="#" className="text-primary font-semibold">
              Read More
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-primary py-16">
        <div className="container mx-auto px-8">
          <div className="bg-white rounded-3xl p-12">
            <div className="flex flex-col md:flex-row gap-12">
              <div className="md:w-1/2">
                <h2 className="text-4xl font-inter font-semibold mb-6">Digital Marketing FAQs</h2>
                <p className="text-base text-gray-dark mb-8">
                  As a leading digital marketing agency, we are dedicated to providing comprehensive educational resources and answering frequently asked questions to help our clients.
                </p>
                <div className="flex gap-12">
                  <button className="px-4 py-4 bg-primary text-white rounded-md font-inter font-bold">
                    More Questions
                  </button>
                  <a href="#" className="text-base font-semibold underline">Contact Us</a>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="border-t border-b border-black py-6 mb-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-inter font-semibold">Why is digital marketing important for my business?</h3>
                    <div className="w-6 h-6"></div>
                  </div>
                  <p className="text-base text-gray-dark">
                    Digital marketing allows businesses to reach and engage with a wider audience, generate leads, drive website traffic, and increase brand visibility. It provides measurable results, allows for targeted marketing efforts, and enables businesses to adapt and optimize their strategies based on data and insights.
                  </p>
                </div>
                <div className="border-b border-black py-6 mb-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-inter font-semibold">How can digital marketing help improve my website's visibility?</h3>
                    <div className="w-6 h-6"></div>
                  </div>
                </div>
                <div className="border-b border-black py-6 mb-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-inter font-semibold">How long does it take to see results from digital marketing efforts?</h3>
                    <div className="w-6 h-6"></div>
                  </div>
                </div>
                <div className="border-b border-black py-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-inter font-semibold">How do you measure the success of digital marketing campaigns?</h3>
                    <div className="w-6 h-6"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
} 