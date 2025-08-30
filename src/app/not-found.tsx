"use client";
// ADD ANIMATION FOR LOADING AND ERROR FOR BOTH INTERNAL ERROR AND NOT FOUND PAGE
import Navigation from "@/components/app_layout/Navigation";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Lottie from "lottie-react";
import animationData from "../../public/lottie-animation/404_Error.json";

export default function NotFound() {
  const pathname = usePathname();
  const router = useRouter();

  // IF A USER GOES TO "/conversation/feedback", which doesnt exists
  if (pathname === "/conversation/feedback")
    return (
      <Button onClick={() => router.replace("/conversation")}>
        Go to conversations
      </Button>
    );
  return (
    <div className="h-screen w-full">
      <Navigation page="Not Found Page" />
      <main className="main flex items-center justify-center overflow-clip">
        <Lottie
          //lottieRef={lottieRef}
          autoPlay={false}
          animationData={animationData}
        />
      </main>
    </div>
  );
}
