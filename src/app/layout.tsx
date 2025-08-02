import { type Metadata } from 'next'
import {
  ClerkProvider,
  SignedIn,
  SignedOut
} from '@clerk/nextjs'
import { Inter, Noto_Sans, Source_Serif_4 } from 'next/font/google'
import './globals.css'
import AuthPathHandler from "@/components/AuthPathHandler"
import { SidebarProvider } from "@/components/ui/sidebar"
import AppSidebar from "@/components/app_layout/AppSideBar"
import { ThemeProvider } from "next-themes"
import { Toaster } from '@/components/ui/sonner'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

// Primary font for UI and most content
const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

// Comprehensive multilingual support for language learning content
const notoSans = Noto_Sans({
  variable: '--font-noto-sans',
  subsets: ['latin', 'latin-ext'], // Add more subsets as needed: 'cyrillic', 'arabic', 'chinese-simplified', etc.
  display: 'swap',
})

// For longer reading content and generated stories
const sourceSerif = Source_Serif_4({
  variable: '--font-source-serif',
  subsets: ['latin'],
  weight: ['400', '600'],
  display: 'swap',
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
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.variable} ${notoSans.variable} ${sourceSerif.variable} antialiased`}>
          <SignedOut>
            <AuthPathHandler>{children}</AuthPathHandler>
          </SignedOut>
          <SignedIn>
            <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            >
              <SidebarProvider>
                <AppSidebar />
                <NuqsAdapter>{children}</NuqsAdapter>
                <Toaster />
              </SidebarProvider>
            </ThemeProvider>
          </SignedIn>
        </body>
      </html>
    </ClerkProvider>
  )
}