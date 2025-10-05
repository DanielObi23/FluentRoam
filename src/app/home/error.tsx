"use client";
import Lottie from "lottie-react";
import animationData from "@/assets/lottie-animation/505_error.json";

export default function Error() {
  return (
    <div className="aspect-square max-w-xs">
      <p className="font-ui text-center text-lg font-semibold">
        ⚠️ Error retrieving history
      </p>
      <Lottie animationData={animationData} loop autoPlay />
    </div>
  );
}
