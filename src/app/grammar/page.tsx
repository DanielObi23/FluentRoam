"use client";

import Navigation from "@/components/app_layout/Navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  return (
    <div className="bg-background min-h-screen w-full">
      <Navigation page="Grammar" />
      <div>
        <div>
          <Link href={"/grammar/lesson/1"}>lesson 1: </Link>
          <span>The Spanish Alphabet, Pronunciation & Greetings</span>
        </div>
      </div>
    </div>
  );
}
