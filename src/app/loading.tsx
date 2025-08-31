"use client";
import Lottie from "lottie-react";
import animationData from "../../public/lottie-animation/loading.json";

export default function Loading() {
  return (
    <main className="flex h-screen w-full items-center justify-center">
      <Lottie autoPlay={false} animationData={animationData} />
    </main>
  );
}
