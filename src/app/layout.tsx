import { type Metadata, type Viewport } from "next";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
import { Inter, Noto_Sans, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import AuthPathHandler from "@/components/AuthPathHandler";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app_layout/AppSideBar";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { NuqsAdapter } from "nuqs/adapters/next/app";

// Primary font for UI and most content
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Comprehensive multilingual support for language learning content
const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin", "latin-ext"], // Add more subsets as needed: 'cyrillic', 'arabic', 'chinese-simplified', etc.
  display: "swap",
});

// For longer reading content and generated stories
const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "FluentRoam",
    template: "%s | FluentRoam",
  },
  description: "AI powered language learning platform",
  icons: [
    { rel: "icon", url: "/favicon/favicon.ico" },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/favicon/favicon-16x16.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/favicon/favicon-32x32.png",
    },
    {
      rel: "apple-touch-icon",
      url: "/favicon/apple-touch-icon.png",
      sizes: "180x180",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "192x192",
      url: "/favicon/android-chrome-192x192.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "512x512",
      url: "/favicon/android-chrome-512x512.png",
    },
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${inter.variable} ${notoSans.variable} ${sourceSerif.variable} antialiased`}
        >
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
  );
}
