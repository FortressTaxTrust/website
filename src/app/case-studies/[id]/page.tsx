"use client";

import Link from "next/link";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useParams, useRouter } from "next/navigation";
import NextImage from "next/image";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TiptapLink from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import CodeBlock from "@tiptap/extension-code-block";
import Dropcursor from "@tiptap/extension-dropcursor";

const ResubscribeDialog = ({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="sm:max-w-md bg-background">
      <DialogHeader>
        <DialogTitle>Subscription Expired</DialogTitle>
        <DialogDescription>
          Your subscription has expired. Please resubscribe to continue accessing our premium case studies.
        </DialogDescription>
      </DialogHeader>
      <Button asChild><Link href="/subscription/pricing">Resubscribe Now</Link></Button>
    </DialogContent>
  </Dialog>
);

interface CaseStudy {
  id: string;
  title: string;
  content: {
    cover_image: string;
    description: string;
  };
  category?: string;
  metadata: any;
  readTime?: string;
  created_at: string;
}

export default function CaseStudyDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [study, setStudy] = useState<CaseStudy | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  type AuthStatus = 'loading' | 'loggedOut' | 'loggedInActive' | 'loggedInExpired';
  const [authStatus, setAuthStatus] = useState<AuthStatus>('loading');
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TiptapLink.configure({ openOnClick: true }),
      Placeholder.configure({ placeholder: "..." }),
      Image,
      CodeBlock,
      Dropcursor,
    ],
    editable: false,
    immediatelyRender: false,
  });

  useEffect(() => {
    setAuthStatus('loading');

    if (id) {
      const fetchStudy = async () => {
        try {
          setLoading(true);
          setError(null);

          const publicRes = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/casestudies/${id}/public`
          );
          if (!publicRes.ok) throw new Error("Case study not found");

          const publicData = await publicRes.json();
          setStudy(publicData.caseStudy);

          const token = localStorage.getItem("accessToken");
          if (token) {
            const headers: HeadersInit = {
              Authorization: `Bearer ${token}`,
            };
            const userRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profile`, { headers });

            if (!userRes.ok) {
              setAuthStatus('loggedOut');
              return;
            }
            const userData = await userRes.json();
            const subscriptionEndDate = userData.user_data?.end_date;
            const subscriptionStatus = userData.user_data?.subscription_status;
            const isSubscriptionActive = subscriptionStatus === 'active' && subscriptionEndDate && new Date(subscriptionEndDate) > new Date();

            if (isSubscriptionActive) {
              const protectedRes = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/casestudies/${id}/private`,
                { headers }
              );
              if (protectedRes.ok) {
                const protectedData = await protectedRes.json();
                setStudy(protectedData.caseStudy);
                editor?.commands.setContent(protectedData.caseStudy.metadata);
                setAuthStatus('loggedInActive');
              } else {
                setError("Could not load premium content.");
                setAuthStatus('loggedOut'); 
              }
            } else {
              setAuthStatus('loggedInExpired');
            }
          } else {
            setAuthStatus('loggedOut');
          }
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchStudy();
    }
  }, [id, editor]);

  useEffect(() => {
    if (authStatus === 'loggedInExpired') {
      setShowLoginDialog(true);
    }
  }, [authStatus]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="border-b">
          <div className="container mx-auto px-4 md:px-8 py-6">
            {/* Skeleton for "Back to Case Studies" link */}
            <div className="h-5 w-48 bg-muted rounded animate-pulse"></div>
          </div>
        </div>
        <article className="container mx-auto px-4 md:px-8 py-12">
          <div className="max-w-3xl mx-auto animate-pulse">
            {/* Skeleton for Article Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-6 w-24 bg-muted rounded"></div>
              <div className="h-2 w-2 bg-muted rounded-full"></div>
              <div className="h-5 w-20 bg-muted rounded"></div>
              <div className="h-2 w-2 bg-muted rounded-full"></div>
              <div className="h-5 w-36 bg-muted rounded"></div>
            </div>

            {/* Skeleton for Title Block */}
            <div className="space-y-3 mb-8">
              <div className="h-10 bg-muted rounded w-4/5"></div>
              <div className="h-10 bg-muted rounded w-5/6"></div>
            </div>

            {/* Featured Image Skeleton */}
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-muted mb-12"></div>

            {/* Skeleton for Summary Section */}
            <div className="prose prose-lg max-w-none mb-8">
              {/* Skeleton for Summary h2 */}
              <div className="h-10 bg-muted rounded w-1/3 mb-4"></div>
              {/* Skeleton for Summary p */}
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-4 bg-muted rounded w-5/6"></div>
              </div>
            </div>

            {/* Skeleton for Rich Content Body */}
            <div className="space-y-12">
              {/* Block 1 */}
              <div>
                <div className="h-7 bg-muted rounded w-1/3 mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-muted rounded w-full"></div>
                  <div className="h-4 bg-muted rounded w-full"></div>
                  <div className="h-4 bg-muted rounded w-5/6"></div>
                </div>
              </div>

              {/* Block 2 */}
              <div>
                <div className="h-7 bg-muted rounded w-1/2 mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-muted rounded w-full"></div>
                  <div className="h-4 bg-muted rounded w-11/12"></div>
                </div>
              </div>

              {/* Block 3 */}
              <div>
                <div className="h-7 bg-muted rounded w-1/3 mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-muted rounded w-10/12"></div>
                  <div className="h-4 bg-muted rounded w-8/12"></div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    );
  }


  if (error || !study) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            {error || "Case Study Not Found"}
          </h1>
          <Link href="/case-studies" className="text-primary hover:underline">
            Back to Case Studies
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="container mx-auto px-4 md:px-8 py-6">
          <Link
            href="/case-studies"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
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
              className="mr-2"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
            Back to Case Studies
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <article className="container mx-auto px-4 md:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary">{study.category}</Badge>
              <span className="text-sm text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">
                {study.readTime || "8 min read"}
              </span>
              <span className="text-sm text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">
                {new Date(study.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                })}
              </span>
            </div>
            <h1
              className="text-4xl md:text-5xl font-bold mb-6"
              style={{ color: "#535353" }}
            >
              {study.title}
            </h1>
          </div>

          {/* Featured Image */}
          <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-muted mb-12">
            <NextImage
              src={study.content?.cover_image ? study.content?.cover_image :  "/images/placeholder.svg"}
              alt={study.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Preview Content */}
          <div className="prose prose-lg max-w-none mb-8">
            <h2
              className="text-4xl font-bold mb-4"
              style={{ color: "#535353" }}
            >
              Summary
            </h2>
            <p
              className="text-muted-foreground leading-relaxed mb-8"
              style={{ color: "#535353" }}
            >
              {study?.content?.description || "No Case Study Description"} 
            </p>
          </div>

          {/* Paywall */}
          {authStatus !== 'loggedInActive' ? (
            <div className="relative">
              {/* Gradient Fade */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background pointer-events-none h-48 -top-24"></div>

              {/* Paywall Card */}
              <Card className="relative z-10 p-8 border-2 border-primary/20 bg-card">
                <div className="text-center max-w-xl mx-auto">
                  <div className="mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mx-auto text-primary"
                    >
                      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </div>
                  <h3
                    className="text-2xl font-bold mb-2"
                    style={{ color: "#535353" }}
                  >
                    Continue Reading with Premium Access
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Subscribe to unlock the full case study including
                    implementation details, results, and key takeaways.
                  </p>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-center gap-2 text-sm">
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
                        className="text-primary"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      <span>Unlimited access to all case studies</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm">
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
                        className="text-primary"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      <span>Exclusive insights and strategies</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm">
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
                        className="text-primary"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      <span>New case studies added monthly</span>
                    </div>
                  </div>
                  <Button
                    onClick={() => {
                      sessionStorage.setItem("redirect_after_login", window.location.pathname);
                      router.push("/client-portal/signup");
                    }}
                    size="lg"
                    className="w-full sm:w-auto text-white"
                  >
                    Subscribe for $199/year
                  </Button>
                  <p className="text-xs text-muted-foreground mt-4">
                    Already a subscriber?{" "}
                    <button
                      className="text-primary hover:underline"
                      onClick={() => {
                        sessionStorage.setItem("redirect_after_login", window.location.pathname);
                        router.push("/client-portal");
                      }}
                    >
                      Log in
                    </button>
                  </p>
                </div>
              </Card>
            </div>
          ) : (
            <div
              className="editor-content"
              style={{
                minHeight: "300px",
                marginTop: "16px",
              }}
            >
              <EditorContent editor={editor} />
            </div>
          )}
        </div>
      </article>
      {authStatus === 'loggedInExpired' ? (
        <ResubscribeDialog open={showLoginDialog} onOpenChange={setShowLoginDialog} />
      ) : (
        <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Subscribe to Access Premium Content</DialogTitle>
              <DialogDescription>
                log in to access all case studies and premium
                content.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <input id="email" type="email" placeholder="you@example.com" className="w-full px-3 py-2 border border-input rounded-md bg-background" />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">Password</label>
                <input id="password" type="password" placeholder="••••••••" className="w-full px-3 py-2 border border-input rounded-md bg-background" />
                <Button className="w-full" onClick={() => {
                  sessionStorage.setItem("redirect_after_login", window.location.pathname);
                  router.push('/client-portal');
                  setShowLoginDialog(false); 
                }}>Login</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Related CTA */}
      <div className="border-t bg-muted/30 mt-16">
        <div className="container mx-auto px-4 md:px-8 py-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2
              className="text-2xl md:text-3xl font-bold mb-4"
              style={{ color: "#535353" }}
            >
              Ready to Write Your Success Story?
            </h2>
            <p className="text-muted-foreground mb-6">
              Let's discuss how we can help your business achieve similar
              results.
            </p>
            <Link
              href="/contact"
              className="text-white inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              Schedule a Consultation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
