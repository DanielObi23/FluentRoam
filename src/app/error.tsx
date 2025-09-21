"use client";
import Lottie from "lottie-react";
import animationData from "../../public/lottie-animation/505_error.json";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

//TODO: RELOAD ONLY PARALLEL ROUTE
export default function Error() {
  const router = useRouter();
  return (
    <div className="flex aspect-square w-full max-w-xs flex-col items-center">
      <p className="font-ui text-center text-lg font-semibold">
        ⚠️ Error retrieving data
      </p>
      <Lottie animationData={animationData} loop autoPlay />
      <Button onClick={router.refresh}>Reload</Button>
    </div>
  );
}
