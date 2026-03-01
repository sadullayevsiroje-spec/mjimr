import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
  // Delete the admin access token cookie
  cookies().delete('admin_access_token')
  
  return NextResponse.json({ success: true })
}
