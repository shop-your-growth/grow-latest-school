import { NextRequest, NextResponse } from 'next/server';

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Rate limiting configuration
const RATE_LIMIT_MAX = parseInt(process.env.RATE_LIMIT_MAX || '100');
const RATE_LIMIT_WINDOW = parseInt(process.env.RATE_LIMIT_WINDOW || '900000'); // 15 minutes

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Apply rate limiting to API routes
  if (pathname.startsWith('/api/')) {
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
    const now = Date.now();
    const windowStart = now - RATE_LIMIT_WINDOW;

    // Clean up old entries
    for (const [key, value] of rateLimitStore.entries()) {
      if (value.resetTime < windowStart) {
        rateLimitStore.delete(key);
      }
    }

    // Check rate limit
    const current = rateLimitStore.get(ip) || { count: 0, resetTime: now + RATE_LIMIT_WINDOW };

    if (current.count >= RATE_LIMIT_MAX && current.resetTime > now) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          error: 'Rate limit exceeded. Please try again later.'
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'X-RateLimit-Limit': RATE_LIMIT_MAX.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': current.resetTime.toString(),
          }
        }
      );
    }

    // Update rate limit
    rateLimitStore.set(ip, {
      count: current.count + 1,
      resetTime: current.resetTime
    });
  }

  // Protect admin routes - TEMPORARILY DISABLED FOR TESTING
  // if (pathname.startsWith('/pages/admin')) {
  //   const token = request.cookies.get('auth-token')?.value ||
  //                 request.headers.get('authorization')?.replace('Bearer ', '');

  //   if (!token) {
  //     return NextResponse.redirect(new URL('/pages/login', request.url));
  //   }

  //   try {
  //     const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as any;

  //     // Check if user has admin role
  //     if (decoded.role !== 'admin' && decoded.role !== 'ADMIN') {
  //       return NextResponse.redirect(new URL('/pages/login', request.url));
  //     }
  //   } catch (error) {
  //     return NextResponse.redirect(new URL('/pages/login', request.url));
  //   }
  // }

  // Add security headers
  const response = NextResponse.next();

  // Security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-XSS-Protection', '1; mode=block');

  // CSP header
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:;"
  );

  return response;
}

export const config = {
  matcher: [
    // TEMPORARILY DISABLE ALL MIDDLEWARE FOR TESTING
    // '/api/:path*',
    // '/pages/admin/:path*',
    // '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
