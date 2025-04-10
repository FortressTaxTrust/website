'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: 'Mike A.',
    position: 'Cranston, R.I.',
    image: '/images/Testimonial Mike A..jpg',
    content: 'I was referred to Fortress Tax & Trust by a business associate. Their ability to use my pass through and business trusts in order to significantly reduce tax liabilities has been nothing short of amazing. When I have tax questions, they have answers. I have been sleeping much better at night.',
    rating: 5
  },
  {
    id: 2,
    name: 'Shelly W.',
    position: 'Seattle, WA',
    image: '/images/Testimonial Shelly W..jpg',
    content: 'The Team at Fortress have been so easy to work with. From tax planning to filing my business and trust taxes, they have gone above and beyond my expectations!',
    rating: 5
  },
  {
    id: 3,
    name: 'Mitchell R.',
    position: 'Provo, UT',
    image: '/images/Testimonial Mitchell R Provo, UT.jpg',
    content: 'After my CPA retired, I was referred to Fortress and the attention to detail and the way the Took the time to learn about me and my business and the results have been extraordinary.',
    rating: 5
  },
  {
    id: 4,
    name: 'Priya G.',
    position: 'Chicago, IL',
    image: '/images/Testimonial Priya G..jpg',
    content: 'I needed help figuring out how to sell my business, direct the assets, and figure out how To transition to my next venture. The proferssionals at Fortress Tax & Trust stood by me and Saved me so much time and money.',
    rating: 5
  },
  {
    id: 5,
    name: 'Evan W.',
    position: 'Seattle, WA',
    image: '/images/Testimonial Evan W..jpg',
    content: 'I needed someone to help me file 6 years of business and personal Taxes. Fortress made the process easy and as painless as it can be. They explained eVerything and helped me deal with the IRS.  I feel like A massive weight has been lifted off of me.',
    rating: 5
  }
];

// Star rating component
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <div key={star} className="w-4 h-4 relative">
          <div 
            className={`w-3.5 h-3.5 absolute left-0.5 top-0.5 ${
              star <= rating ? 'bg-primary' : 'bg-gray-200'
            }`}
          />
        </div>
      ))}
    </div>
  );
};

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <div className="relative h-[300px] md:h-[400px] lg:h-[605px]">
        <Image
          src="/images/testimonials-hero.jpg"
          alt="Testimonials Hero"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-[#5A6863]/30 to-[#5A6863]" />
        
        <div className="absolute inset-0 flex flex-col justify-center px-4 md:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto w-full">
            <div className="text-white text-sm md:text-base mb-2 md:mb-4">
              Home / Testimonials
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
              What Our Clients Say
            </h1>
            <p className="text-white text-sm md:text-base max-w-xl">
               
            </p>
          </div>
        </div>
      </div>
      
      {/* Testimonials Grid */}
      <div className="py-12 md:py-16 lg:py-20 px-4 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 md:mb-12 text-center">Client Testimonials</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id} 
                className="border border-gray-200 rounded-lg p-6 md:p-8 flex flex-col"
              >
                <div className="flex items-start mb-6">
                  <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full border border-primary overflow-hidden mr-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">
                      {testimonial.name}
                    </h3>
                    <p className="text-primary text-sm md:text-base font-medium uppercase">
                      {testimonial.position}
                    </p>
                  </div>
                </div>
                
                <div className="border-t-4 border-gray-200 mb-6"></div>
                
                <p className="text-gray-700 text-sm md:text-base mb-6 flex-grow">
                  "{testimonial.content}"
                </p>
                
                <StarRating rating={testimonial.rating} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 