import { NextResponse } from 'next/server'

export async function POST() {
  const response = NextResponse.json({ success: true })
  
  // Delete the admin authentication cookie
  response.cookies.delete('admin_authenticated')
  
  return response
}
