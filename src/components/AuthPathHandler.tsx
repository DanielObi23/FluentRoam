'use client'

import { usePathname } from 'next/navigation'
import LandingPage from './LandingPage'
import Header from './landing_page/Header'

export default function AuthHandler({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
  // If user is on auth pages, show the auth forms
  if (pathname?.startsWith('/sign-in') || pathname?.startsWith('/sign-up')) {
    return <div className='pt-20 flex justify-center items-center w-full min-h-screen bg-slate-700'><Header />{children}</div>
  }
  
  // Otherwise show landing page
  return <LandingPage />
}