import { redirect } from 'next/navigation'

// This is a secret entry point to the admin panel
// Only you should know this URL
export default function SecretAdminEntry() {
  // Redirect to the actual admin panel
  redirect('/admin')
}
