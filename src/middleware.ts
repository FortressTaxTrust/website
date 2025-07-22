import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Define protected routes
  const isProtectedRoute = path.startsWith('/client-portal/dashboard');
  
  // Check for authentication tokens
  const accessToken = request.cookies.get('access_token')?.value;
  const isAuthenticated = !!accessToken;
  
  // Redirect to login if accessing protected route without auth
  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL('/client-portal', request.url);
    return NextResponse.redirect(loginUrl);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/client-portal/:path*']
};
