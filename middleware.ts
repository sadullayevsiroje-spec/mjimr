import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Block direct access to /admin
  // Only allow access through secret URL or login page
  if (pathname.startsWith('/admin')) {
    // Check if user came from secret URL (via cookie/session)
    const secretToken = request.cookies.get('admin_access_token')
    
    if (!secretToken || secretToken.value !== process.env.ADMIN_SECRET_TOKEN) {
      // Redirect to login page instead of 404
      return NextResponse.redirect(new URL('/admin-login', request.url))
    }
  }

  // Secret admin entry point
  if (pathname.startsWith('/secret-admin-panel-x9k2m7p4')) {
    // Set a cookie to allow admin access
    const response = NextResponse.redirect(new URL('/admin', request.url))
    response.cookies.set('admin_access_token', process.env.ADMIN_SECRET_TOKEN || 'default-secret', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60, // 1 hour (changed from 24 hours)
    })
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/secret-admin-panel-x9k2m7p4'],
}
