import Lottie, { LottieRefCurrentProps } from "lottie-react";
import animationData from "../../../../public/lottie-animation/Sound Waves.json";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useCallSessionStore } from "@/store";

export default function SpeakingAnimation({
  isAISpeaking,
  transcript,
}: {
  isAISpeaking: boolean;
  transcript: string;
}) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  isAISpeaking ? lottieRef.current?.play() : lottieRef.current?.pause();
  const captionIsOn = useCallSessionStore((state) => state.captionIsOn);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center self-center">
      <div
        className={cn(
          "flex h-40 w-40 items-center justify-center rounded-full text-4xl font-bold",
          isAISpeaking
            ? "animate-pulse ring-2 ring-blue-400"
            : "ring-1 ring-gray-300",
          "bg-gradient-to-br from-blue-500 to-indigo-600 text-white",
        )}
      >
        <Lottie
          lottieRef={lottieRef}
          autoPlay={false}
          animationData={animationData}
        />
      </div>

      <p className="text-foreground mt-4 max-h-48 w-full overflow-auto rounded-tl-xl rounded-tr-xl rounded-br-xl rounded-bl-xl bg-gray-600/40 px-4 py-3 text-pretty sm:hidden">
        {captionIsOn && transcript}
      </p>
    </div>
  );
}
