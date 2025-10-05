import Lottie, { LottieRefCurrentProps } from "lottie-react";
import animationData from "../../../../public/lottie-animation/Sound Waves.json";
import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useCallSessionStore } from "@/store";

export default function SpeakingAnimation({
  isAISpeaking,
}: {
  isAISpeaking: boolean;
}) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const captionIsOn = useCallSessionStore((state) => state.captionIsOn);
  const transcript = useCallSessionStore((state) => state.transcript);

  useEffect(() => {
    if (isAISpeaking) {
      lottieRef.current?.play();
    } else {
      lottieRef.current?.pause();
    }
  }, [isAISpeaking]);

  return (
    <div className="flex w-full flex-1 flex-col justify-between gap-3">
      <div
        className={cn(
          "relative mx-auto my-auto flex items-center justify-center rounded-full transition-all duration-300",
          isAISpeaking
            ? "size-40 animate-pulse ring-4 ring-blue-400"
            : "size-32 ring-2 ring-gray-400",
        )}
      >
        <div className="bg-background absolute inset-2 flex items-center justify-center rounded-full">
          <Lottie
            lottieRef={lottieRef}
            autoPlay={false}
            animationData={animationData}
            style={{ height: "70%", width: "70%" }}
          />
        </div>
      </div>

      {captionIsOn && (
        <p className="text-foreground w-full overflow-y-auto rounded-lg bg-gray-600/40 px-4 py-3 text-sm sm:hidden">
          {transcript}
        </p>
      )}
    </div>
  );
}
