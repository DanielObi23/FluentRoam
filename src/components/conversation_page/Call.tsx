// TODO: Fix mic toggle, assistant id, remove

import { Mic, MicOff, Captions, CaptionsOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import animationData from "../../../public/lottie-animation/Sound Waves.json";
import { useEffect, useRef, useState } from "react";
import Vapi from "@vapi-ai/web";
import { AssistantOverrides } from "@vapi-ai/web/dist/api";
import { parseAsString, useQueryState } from "nuqs";

type Call = {
  transcript: string;
  vapi: Vapi;
  gender: "male" | "female";
  assistantOverrides: AssistantOverrides;
};

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

export default function Call({
  vapi,
  transcript,
  gender,
  assistantOverrides,
}: Call) {
  const [captionIsOn, setCaptionIsOn] = useState(true);
  const [callStatus, setCallStatus] = useQueryState(
    "call-status",
    parseAsString.withDefault(CallStatus.INACTIVE),
  );
  const [isAISpeaking, setIsAISpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const callId = useRef("");
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  isAISpeaking ? lottieRef.current?.play() : lottieRef.current?.pause();

  function onCallStart() {
    setCallStatus(CallStatus.ACTIVE);
  }

  function onCallEnd() {
    setCallStatus(CallStatus.FINISHED);
    // save call-id and messages to database, as well as feedback and other necessary form data
  }

  function startSession() {
    const voiceGender =
      gender === "male"
        ? "e3fbfb66-b32e-4c74-b456-c6ea5fb15663"
        : "0a7e23ff-2173-4722-9473-e86aa8afb45e";
    vapi.start(voiceGender, assistantOverrides).then((call) => {
      callId.current = call?.id || ""; //Adding call-id so it can be added to database and user can reference it for later
    });
    setCallStatus(CallStatus.CONNECTING);
  }

  function endSession() {
    setCallStatus(CallStatus.FINISHED);
    vapi.say("This is the end of our conversation, goodbye!", true); // or vapi.stop()
    //router.replace("/conversation")
  }

  function handleCurrentSession() {
    if (
      callStatus === CallStatus.INACTIVE ||
      callStatus === CallStatus.FINISHED
    ) {
      const stimer = 0;
      startSession();
    } else {
      endSession();
    }
  }

  useEffect(() => {
    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("speech-start", () => setIsAISpeaking(true));
    vapi.on("speech-end", () => setIsAISpeaking(false));

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("speech-start", () => setIsAISpeaking(true));
      vapi.off("speech-end", () => setIsAISpeaking(false));
    };
  }, []);

  const [clock, setClock] = useState("00:00");
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => {
        const next = prev + 1;
        const mins = Math.floor(next / 60);
        const secs = next % 60;
        setClock(
          `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`,
        );
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex w-full flex-col gap-4 sm:h-2/3 sm:w-1/3">
      {/* AI Persona Card */}
      <div className="bg-card flex h-6/7 flex-col items-center gap-7 rounded-lg p-6">
        <div className="flex w-full items-center justify-between gap-2 self-start font-semibold">
          <div className="flex items-center gap-2">
            <div className="bg-primary rounded-xl px-3 py-2 text-center">
              {clock}
            </div>
            <div className="flex items-center gap-2">
              <div className="size-2 animate-pulse rounded-full bg-red-700"></div>
              {callStatus}
            </div>
          </div>
        </div>

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
      </div>

      {/* Control Buttons */}
      <div className="grid grid-cols-6 gap-3">
        <Button
          variant="outline"
          className="col-span-3 flex h-16 flex-col gap-2 sm:col-span-6 lg:col-span-2"
        >
          <MicOff className="h-5 w-5" />
          <span className="text-sm">Turn off mic</span>{" "}
          {/* Don't let them toggle without vapi being on first */}
        </Button>
        <Button
          variant="outline"
          className="col-span-3 flex h-16 flex-col gap-2 sm:hidden"
          onClick={() => setCaptionIsOn((prev) => !prev)}
        >
          {captionIsOn ? <CaptionsOff /> : <Captions />}
          <span className="text-sm">
            Turn {captionIsOn ? "off" : "on"} transcript
          </span>{" "}
          {/* Don't let them toggle without vapi being on first */}
        </Button>
        <Button
          variant={"destructive"}
          className={cn(
            callStatus === CallStatus.CONNECTING ? "" : "",
            "col-span-6 mb-3 flex h-16 flex-col gap-2 lg:col-span-4",
          )}
          onClick={handleCurrentSession}
          disabled={callStatus === CallStatus.CONNECTING}
        >
          {callStatus === CallStatus.INACTIVE
            ? "Start Conversation"
            : callStatus === CallStatus.CONNECTING
              ? "Connecting..."
              : callStatus === CallStatus.ACTIVE
                ? "End Conversation"
                : "Restart Conversation"}
        </Button>
      </div>
    </div>
  );
}
