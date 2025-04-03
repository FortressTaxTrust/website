import Image from 'next/image'
import Link from 'next/link'

export default function BlogPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[605px]">
        <Image
          src="/placeholder.jpg"
          alt="Blog hero"
          width={1440}
          height={605}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-[#242A2829]/31 to-[#5A6863]" />
        <div className="absolute left-[50px] top-[240px]">
          <h1 className="text-[55px] font-inter font-bold text-white capitalize leading-[67px]">
            Blogs
          </h1>
          <div className="w-[128px] h-[34px] bg-[#5A6863] rotate-[7deg] origin-top-left" />
        </div>
      </section>

      {/* Featured Blog Post */}
      <section className="px-8 py-12">
        <div className="max-w-[761px] bg-white p-[51px] rounded-2xl shadow-lg">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-5">
              <div className="inline-flex px-3 py-1.5 bg-[#5A6863] rounded-md">
                <span className="text-white text-sm font-medium">Technology</span>
              </div>
              <h2 className="text-4xl font-bold leading-[51px]">
                The Impact of Technology on the Workplace: How Technology is Changing
              </h2>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4">
                <Image
                  src="/placeholder.jpg"
                  alt="Author"
                  width={46}
                  height={46}
                  className="rounded-full"
                />
                <span className="text-base font-medium">Jason Francisco</span>
              </div>
              <span className="text-xl">August 20, 2022</span>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="px-8 py-16">
        <div className="max-w-[1337px] mx-auto">
          <h2 className="text-4xl font-semibold text-center mb-12 capitalize">Our Latest Blog Posts</h2>
          
          {/* Category Filter */}
          <div className="flex justify-center items-center gap-10 mb-12">
            <div className="w-60 h-10 bg-white rounded-full border border-black" />
            <span className="text-xl font-medium">Category name</span>
            <span className="text-xl">Industrial Solutions</span>
            <span className="text-xl">Commercial Solutions</span>
            <span className="text-xl">Open yards Solutions</span>
          </div>

          {/* Blog Posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Blog Post 1 */}
            <div className="bg-white rounded-lg overflow-hidden">
              <Image
                src="/placeholder.jpg"
                alt="Blog post"
                width={425}
                height={270}
                className="w-full h-auto"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Manateq Honors its Partners in Success: QHSE Excellence A...</h3>
                <p className="text-gray-600 mb-4">
                  Blessing welcomed ladyship she met humoured sir breeding her. Six curiosity day assurance bed necessary.
                </p>
                <div className="flex justify-between text-sm font-semibold">
                  <span>08-11-2021</span>
                  <span>Category</span>
                </div>
              </div>
            </div>

            {/* Blog Post 2 */}
            <div className="bg-white rounded-lg overflow-hidden">
              <Image
                src="/placeholder.jpg"
                alt="Blog post"
                width={425}
                height={270}
                className="w-full h-auto"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Manateq and QU Forge Strategic Partnership to Advance Coo...</h3>
                <p className="text-gray-600 mb-4">
                  Blessing welcomed ladyship she met humoured sir breeding her. Six curiosity day assurance bed necessary.
                </p>
                <div className="flex justify-between text-sm font-semibold">
                  <span>08-11-2021</span>
                  <span>Category</span>
                </div>
              </div>
            </div>

            {/* Blog Post 3 */}
            <div className="bg-white rounded-lg overflow-hidden">
              <Image
                src="/placeholder.jpg"
                alt="Blog post"
                width={425}
                height={270}
                className="w-full h-auto"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Manateq and Qatar Credit Bureau Sign a Membership Agreeme...</h3>
                <p className="text-gray-600 mb-4">
                  Blessing welcomed ladyship she met humoured sir breeding her. Six curiosity day assurance bed necessary.
                </p>
                <div className="flex justify-between text-sm font-semibold">
                  <span>08-11-2021</span>
                  <span>Category</span>
                </div>
              </div>
            </div>
          </div>

          {/* See All Button */}
          <div className="flex justify-center mt-12">
            <button className="px-4 py-4 border border-gray-200 rounded-md font-bold">
              See all
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-[#5A6863] py-16">
        <div className="max-w-[1338px] mx-auto px-8">
          <div className="bg-white rounded-3xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-12">
                <h2 className="text-5xl font-semibold">Digital Marketing FAQs</h2>
                <p className="text-gray-600 max-w-[531px]">
                  As a leading digital marketing agency, we are dedicated to providing comprehensive educational resources and answering frequently asked questions to help our clients.
                </p>
                <div className="flex items-center gap-12">
                  <button className="px-4 py-4 bg-[#5A6863] text-white rounded-md font-bold">
                    More Questions
                  </button>
                  <Link href="/contact" className="text-lg font-semibold underline">
                    Contact Us
                  </Link>
                </div>
              </div>

              <div className="space-y-6">
                {/* FAQ Item 1 */}
                <div className="border-y border-black py-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-semibold">Why is digital marketing important for my business?</h3>
                    <div className="w-6 h-6" />
                  </div>
                  <p className="text-gray-600 mt-4">
                    Digital marketing allows businesses to reach and engage with a wider audience, generate leads, drive website traffic, and increase brand visibility. It provides measurable results, allows for targeted marketing efforts, and enables businesses to adapt and optimize their strategies based on data and insights.
                  </p>
                </div>

                {/* FAQ Item 2 */}
                <div className="border-b border-black py-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-semibold">How can digital marketing help improve my website's visibility?</h3>
                    <div className="w-6 h-6" />
                  </div>
                </div>

                {/* FAQ Item 3 */}
                <div className="border-b border-black py-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-semibold">How long does it take to see results from digital marketing efforts?</h3>
                    <div className="w-6 h-6" />
                  </div>
                </div>

                {/* FAQ Item 4 */}
                <div className="border-b border-black py-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-semibold">How do you measure the success of digital marketing campaigns?</h3>
                    <div className="w-6 h-6" />
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