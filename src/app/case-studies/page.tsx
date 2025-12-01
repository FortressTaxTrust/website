'use client';

import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from 'react';


interface CaseStudy {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  readTime: string;
  date: string;
  content: {
    cover_image: string;
    description: string;
  } | null;
  // Keep old fields for potential fallback if API is inconsistent
  created_at: string;
}

export default function CaseStudies() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const limit = 9; // items per page

  useEffect(() => {
    const fetchCaseStudies = async () => {
      setLoading(true);
      setError(null);
      try {
        const storedToken = localStorage.getItem("accessToken");
        const headers: HeadersInit = {};
        if (storedToken) {
          headers['Authorization'] = `Bearer ${storedToken}`;
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/casestudies?page=${page}&limit=${limit}`,
          { headers }
        );
        if (!res.ok) throw new Error('Failed to fetch case studies');
        const data = await res.json();
        
        console.log('Case studies response:', data);

        setCaseStudies(data.caseStudies || []);
        const totalCount = data.total || data.caseStudies?.length || 0;
        setTotalPages(Math.ceil(totalCount / limit) || 1);
        setLoading(false);

      } catch (err: any) {
        setError('Something went wrong');
        // setLoading(false);
      } 
    };

    fetchCaseStudies();
  }, [page]);

  const goToPage = (p: number) => setPage(p);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="border-b">
        <div className="container mx-auto px-4 md:px-8 py-12 md:py-16 lg:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-4 text-sm">Case Studies</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 md:mb-6">
              Real Results for Real Businesses
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore how we've helped businesses and individuals navigate complex tax challenges and achieve meaningful financial outcomes.
            </p>
          </div>
        </div>
      </div>

      {/* Case Studies Grid */}
      <div className="container mx-auto px-4 md:px-8 py-12 md:py-16">
        {error && (
          <div className="mb-8 text-center text-red-500 bg-red-100 border border-red-400 p-4 rounded-lg">
            {error}
          </div>
        )}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="animate-pulse flex flex-col items-start p-4 bg-white rounded-lg shadow hover:shadow-md cursor-pointer"
              >
                <div className="w-100 h-100 bg-yellow-300 rounded flex items-center justify-center mb-3">
                  <img 
                    src={ "/images/placeholder.svg"}
                    alt={`${idx}-image`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="h-10 w-3/4 bg-gray-300 rounded mb-2"></div>
                <div className="h-3 w-full bg-gray-300 rounded"></div>
                <div className="h-3 w-full bg-gray-300 rounded mb-2" ></div>
                <div className="h-2 w-1/4 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
        ) : caseStudies.length === 0 ? (
          <div className="text-center text-muted-foreground">No case studies found.</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              
              {caseStudies.map((study) => (
                <Link 
                  key={study.id}
                  href={`/case-studies/${study.id}`}
                  className="group"
                >
                  <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg border-border">
                    <div className="aspect-[16/9] overflow-hidden bg-muted">
                      <img 
                        src={study.content?.cover_image ? study.content?.cover_image :  "/images/placeholder.svg"}
                        alt={study.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge className="text-xs text-white">
                          {study.category || 'General'}
                        </Badge>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">{study.readTime || '5 min read'}</span>
                      </div>
                      <h2 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {study.title}
                      </h2>
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                        {study.content?.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{new Date(study.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</span>
                        <span className="flex items-center gap-1 text-primary group-hover:gap-2 transition-all">
                          Read more
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="16" 
                            height="16" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                          >
                            <path d="M5 12h14"/>
                            <path d="m12 5 7 7-7 7"/>
                          </svg>
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-12 flex-wrap">
                <button
                  onClick={() => goToPage(page - 1)}
                  disabled={page === 1}
                  className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => goToPage(p)}
                    className={`px-3 py-1 rounded border ${
                      p === page
                        ? 'bg-primary text-white border-primary'
                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {p}
                  </button>
                ))}

                <button
                  onClick={() => goToPage(page + 1)}
                  disabled={page === totalPages}
                  className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* CTA Section */}
      <div className="border-t bg-muted/30">
        <div className="container mx-auto px-4 md:px-8 py-12 md:py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Want Results Like These?
            </h2>
            <p className="text-base md:text-lg text-muted-foreground mb-6">
              Let's discuss how our strategic tax planning can help your business thrive.
            </p>
            <Link 
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-white"
            >
              Schedule a Consultation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}