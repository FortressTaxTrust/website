import Image from 'next/image'
import Link from 'next/link'

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[300px] md:h-[400px] lg:h-[605px]">
        <Image
          src="/placeholder.jpg"
          alt="Blog hero"
          width={1440}
          height={605}
          className="w-full h-full object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-[#242A2829]/31 to-[#5A6863]" />
        <div className="absolute left-4 md:left-8 lg:left-[50px] top-[120px] md:top-[180px] lg:top-[240px]">
          <h1 className="text-3xl md:text-4xl lg:text-[55px] font-inter font-bold text-white capitalize leading-tight md:leading-[67px]">
            Blogs
          </h1>
          <div className="w-16 md:w-24 lg:w-[128px] h-4 md:h-6 lg:h-[34px] bg-[#5A6863] rotate-[7deg] origin-top-left" />
        </div>
      </section>

      {/* Featured Blog Post */}
      <section className="px-4 md:px-8 py-8 md:py-12">
        <div className="max-w-[761px] mx-auto bg-white p-6 md:p-8 lg:p-[51px] rounded-xl md:rounded-2xl shadow-lg">
          <div className="flex flex-col gap-4 md:gap-5">
            <div className="flex flex-col gap-4 md:gap-5">
              <div className="inline-flex px-3 py-1.5 bg-[#5A6863] rounded-md">
                <span className="text-white text-xs md:text-sm font-medium">Technology</span>
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight md:leading-[51px]">
                The Impact of Technology on the Workplace: How Technology is Changing
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6">
              <div className="flex items-center gap-3 md:gap-4">
                <Image
                  src="/placeholder.jpg"
                  alt="Author"
                  width={46}
                  height={46}
                  className="w-10 h-10 md:w-[46px] md:h-[46px] rounded-full"
                />
                <span className="text-sm md:text-base font-medium">Jason Francisco</span>
              </div>
              <span className="text-base md:text-xl">August 20, 2022</span>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="px-4 md:px-8 py-12 md:py-16">
        <div className="max-w-[1337px] mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-center mb-8 md:mb-12 capitalize">Our Latest Blog Posts</h2>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-10 mb-8 md:mb-12">
            <div className="w-40 md:w-60 h-8 md:h-10 bg-white rounded-full border border-black" />
            <span className="text-base md:text-xl font-medium">Category name</span>
            <span className="text-base md:text-xl">Industrial Solutions</span>
            <span className="text-base md:text-xl">Commercial Solutions</span>
            <span className="text-base md:text-xl">Open yards Solutions</span>
          </div>

          {/* Blog Posts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Blog Post 1 */}
            <div className="bg-white rounded-lg overflow-hidden">
              <Image
                src="/placeholder.jpg"
                alt="Blog post"
                width={425}
                height={270}
                className="w-full h-auto"
              />
              <div className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-semibold mb-2">Manateq Honors its Partners in Success: QHSE Excellence A...</h3>
                <p className="text-gray-600 text-sm md:text-base mb-4">
                  Blessing welcomed ladyship she met humoured sir breeding her. Six curiosity day assurance bed necessary.
                </p>
                <div className="flex justify-between text-xs md:text-sm font-semibold">
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
              <div className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-semibold mb-2">Manateq and QU Forge Strategic Partnership to Advance Coo...</h3>
                <p className="text-gray-600 text-sm md:text-base mb-4">
                  Blessing welcomed ladyship she met humoured sir breeding her. Six curiosity day assurance bed necessary.
                </p>
                <div className="flex justify-between text-xs md:text-sm font-semibold">
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
              <div className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-semibold mb-2">Manateq and Qatar Credit Bureau Sign a Membership Agreeme...</h3>
                <p className="text-gray-600 text-sm md:text-base mb-4">
                  Blessing welcomed ladyship she met humoured sir breeding her. Six curiosity day assurance bed necessary.
                </p>
                <div className="flex justify-between text-xs md:text-sm font-semibold">
                  <span>08-11-2021</span>
                  <span>Category</span>
                </div>
              </div>
            </div>
          </div>

          {/* See All Button */}
          <div className="flex justify-center mt-8 md:mt-12">
            <button className="px-4 py-3 md:py-4 border border-gray-200 rounded-md font-bold text-sm md:text-base">
              See all
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-[#5A6863] py-12 md:py-16">
        <div className="max-w-[1338px] mx-auto px-4 md:px-8">
          <div className="bg-white rounded-xl md:rounded-2xl lg:rounded-3xl p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="space-y-8 md:space-y-12">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold">Digital Marketing FAQs</h2>
                <p className="text-gray-600 text-sm md:text-base max-w-[531px]">
                  As a leading digital marketing agency, we are dedicated to providing comprehensive educational resources and answering frequently asked questions to help our clients.
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-12">
                  <button className="w-full sm:w-auto px-4 py-3 md:py-4 bg-[#5A6863] text-white rounded-md font-bold text-sm md:text-base">
                    More Questions
                  </button>
                  <Link href="/contact" className="text-base md:text-lg font-semibold underline">
                    Contact Us
                  </Link>
                </div>
              </div>

              <div className="space-y-4 md:space-y-6">
                {/* FAQ Item 1 */}
                <div className="border-y border-black py-4 md:py-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg md:text-xl lg:text-2xl font-semibold">Why is digital marketing important for my business?</h3>
                    <div className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <p className="text-gray-600 text-sm md:text-base mt-4">
                    Digital marketing allows businesses to reach and engage with a wider audience, generate leads, drive website traffic, and increase brand visibility. It provides measurable results, allows for targeted marketing efforts, and enables businesses to adapt and optimize their strategies based on data and insights.
                  </p>
                </div>

                {/* FAQ Item 2 */}
                <div className="border-b border-black py-4 md:py-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg md:text-xl lg:text-2xl font-semibold">How can digital marketing help improve my website's visibility?</h3>
                    <div className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                </div>

                {/* FAQ Item 3 */}
                <div className="border-b border-black py-4 md:py-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg md:text-xl lg:text-2xl font-semibold">How long does it take to see results from digital marketing efforts?</h3>
                    <div className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                </div>

                {/* FAQ Item 4 */}
                <div className="border-b border-black py-4 md:py-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg md:text-xl lg:text-2xl font-semibold">How do you measure the success of digital marketing campaigns?</h3>
                    <div className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 