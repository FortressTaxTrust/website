'use client';

import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />
      {/* Coming Soon Section */}
      <div className="container mx-auto px-4 md:px-8 py-6 md:py-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-3 md:mb-4">
            <svg className="w-12 h-12 md:w-16 md:h-16 mx-auto text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 md:mb-3">Coming Soon</h2>
          <p className="text-base md:text-lg lg:text-xl text-gray-600 mb-4 md:mb-6">
            We're currently collecting case studies from our satisfied clients. 
            This page will showcase real stories and experiences from our customers 
            who have benefited from our tax services.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-2 md:gap-3">
            <Link 
              href="/contact" 
              className="w-full sm:w-auto px-5 md:px-6 py-2 md:py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm md:text-base font-medium"
            >
              Contact Us
            </Link>
            <Link 
              href="/" 
              className="w-full sm:w-auto px-5 md:px-6 py-2 md:py-2.5 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors text-sm md:text-base font-medium"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
} 