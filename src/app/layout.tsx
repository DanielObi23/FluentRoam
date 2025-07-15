import { type Metadata } from 'next'
import {
  ClerkProvider,
  SignedIn,
  SignedOut
} from '@clerk/nextjs'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import AuthPathHandler from "@/components/AuthPathHandler"
import Navigation from '@/components/Navigation'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: "PolySermo",
    template: "%s | PolySermo"
  },
  description: 'AI powered language learning platform',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <SignedOut>
            <AuthPathHandler>{children}</AuthPathHandler>
          </SignedOut>
          <SignedIn>
            <Navigation />
            {children}
          </SignedIn>
        </body>
      </html>
    </ClerkProvider>
  )
}