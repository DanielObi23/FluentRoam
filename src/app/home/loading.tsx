"use client";
import Lottie from "lottie-react";
import animationData from "../../../public/lottie-animation/loading.json";

export default function Loading() {
  return (
    <div className="aspect-square max-w-xs self-center">
      <Lottie animationData={animationData} loop autoPlay />
    </div>
  );
}
