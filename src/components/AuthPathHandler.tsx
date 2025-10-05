"use client";

import { usePathname } from "next/navigation";
import LandingPage from "./LandingPage";
import Header from "./landing_page/Header";

export default function AuthHandler({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // If user is on auth pages, show the auth forms
  if (pathname?.startsWith("/sign-in") || pathname?.startsWith("/sign-up")) {
    return (
      <div className="flex h-screen flex-col items-center gap-3 overflow-auto bg-slate-700">
        <Header />
        <div className="my-auto">{children}</div>
      </div>
    );
  }

  // Otherwise show landing page
  return <LandingPage />;
}
