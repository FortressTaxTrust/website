'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: 'Olivia Green',
    position: 'CEO, Company',
    image: '/images/testimonials/person1.jpg',
    content: 'Tax Fortress has been instrumental in helping our business navigate complex tax regulations. Their expertise and dedication have saved us significant time and resources.',
    rating: 4
  },
  {
    id: 2,
    name: 'Michael Johnson',
    position: 'CFO, Tech Solutions',
    image: '/images/testimonials/person2.jpg',
    content: 'The team at Tax Fortress provided exceptional tax planning services that helped us optimize our financial structure. Their attention to detail is unmatched.',
    rating: 5
  },
  {
    id: 3,
    name: 'Sarah Williams',
    position: 'Owner, Small Business',
    image: '/images/testimonials/person3.jpg',
    content: 'As a small business owner, I was struggling with tax compliance. Tax Fortress simplified everything and gave me peace of mind knowing my taxes are in order.',
    rating: 5
  },
  {
    id: 4,
    name: 'David Chen',
    position: 'Director, Finance',
    image: '/images/testimonials/person4.jpg',
    content: 'The tax strategies implemented by Tax Fortress have resulted in substantial savings for our company. Their proactive approach is truly valuable.',
    rating: 4
  },
  {
    id: 5,
    name: 'Emily Rodriguez',
    position: 'Manager, Operations',
    image: '/images/testimonials/person5.jpg',
    content: 'Working with Tax Fortress has transformed how we handle our tax obligations. Their team is responsive, knowledgeable, and always available when needed.',
    rating: 5
  },
  {
    id: 6,
    name: 'James Wilson',
    position: 'Founder, Startup',
    image: '/images/testimonials/person6.jpg',
    content: 'Tax Fortress helped us structure our startup in the most tax-efficient way possible. Their guidance has been invaluable to our growth and success.',
    rating: 5
  },
  {
    id: 7,
    name: 'Lisa Thompson',
    position: 'Accountant, Corporation',
    image: '/images/testimonials/person7.jpg',
    content: 'The tax compliance services provided by Tax Fortress have streamlined our processes and reduced our risk of errors. Highly recommended for any business.',
    rating: 4
  },
  {
    id: 8,
    name: 'Robert Martinez',
    position: 'CEO, Manufacturing',
    image: '/images/testimonials/person8.jpg',
    content: 'Tax Fortress has been our trusted tax advisor for years. Their expertise in manufacturing tax credits has saved us thousands annually.',
    rating: 5
  },
  {
    id: 9,
    name: 'Jennifer Lee',
    position: 'Owner, Retail Business',
    image: '/images/testimonials/person9.jpg',
    content: 'The personalized approach and attention to detail from Tax Fortress have made all the difference. They truly understand our business needs.',
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
              What Our Customers Say
            </h1>
            <p className="text-white text-sm md:text-base max-w-xl">
              Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
            </p>
          </div>
        </div>
      </div>
      
      {/* Testimonials Grid */}
      <div className="py-12 md:py-16 lg:py-20 px-4 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
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