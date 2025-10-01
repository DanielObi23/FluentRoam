"use client";
import Lottie from "lottie-react";
import animationData from "../../../public/lottie-animation/loading.json";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Loading() {
  const router = useRouter();
  return (
    <main className="flex h-full w-full justify-center">
      <div className="flex aspect-square w-full max-w-xs flex-col items-center">
        <p className="font-ui text-center text-lg font-semibold">
          ⚠️ Error retrieving data
        </p>
        <Lottie animationData={animationData} loop autoPlay />
        <Button onClick={router.refresh}>Reload</Button>
      </div>
    </main>
  );
}
