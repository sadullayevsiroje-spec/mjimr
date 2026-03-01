import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Block direct access to /admin
  // Only allow access through secret URL
  if (pathname.startsWith('/admin')) {
    // Check if user came from secret URL (via cookie/session)
    const secretToken = request.cookies.get('admin_access_token')
    
    if (!secretToken || secretToken.value !== process.env.ADMIN_SECRET_TOKEN) {
      // Pretend the page doesn't exist - return 404
      return new NextResponse(null, {
        status: 404,
        statusText: 'Not Found',
      })
    }

    // If they have the token, check password
    const authHeader = request.headers.get('authorization')
    
    if (!authHeader) {
      return new NextResponse('Authentication required', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Admin Area"',
        },
      })
    }

    const auth = authHeader.split(' ')[1]
    const [user, password] = Buffer.from(auth, 'base64').toString().split(':')

    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'change-this-password'

    if (password !== ADMIN_PASSWORD) {
      return new NextResponse('Invalid credentials', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Admin Area"',
        },
      })
    }
  }

  // Secret admin entry point
  if (pathname.startsWith('/secret-admin-panel-x9k2m7p4')) {
    // Set a cookie to allow admin access
    const response = NextResponse.next()
    response.cookies.set('admin_access_token', process.env.ADMIN_SECRET_TOKEN || 'default-secret', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 24 hours
    })
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/secret-admin-panel-x9k2m7p4'],
}
