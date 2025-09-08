import { useEffect, useRef, useState } from "react";
import Vapi from "@vapi-ai/web";
import { vapiPrompt } from "@/conversationData/vapi";
import { useSearchParams } from "next/navigation";
import CallSessionStatus from "./CallSessionStatus";
import SpeakingAnimation from "./SpeakingAnimation";
import CallControls from "./CallControls";
import { toast } from "sonner";
import { useCallSessionStore, CallStatus } from "@/store";

export default function Call({ vapi, time }: { vapi: Vapi; time: number }) {
  const search = useSearchParams();

  const callId = useRef("");
  const [isAISpeaking, setIsAISpeaking] = useState(false);

  const callStatus = useCallSessionStore((s) => s.callStatus);
  const updateCallStatus = useCallSessionStore((s) => s.updateCallStatus);
  const updateTranscript = useCallSessionStore((s) => s.updateTranscript);
  const updateMessages = useCallSessionStore((s) => s.updateMessages);

  const session = {
    name: search.get("name") ?? "José",
    accent: search.get("accent") ?? "generic",
    gender: search.get("gender") ?? "male",
    scenario: search.get("scenario") ?? "",
    formality: (search.get("formality") ?? "casual") as "casual" | "formal",
    response_length: (search.get("response_length") ?? "brief") as
      | "brief"
      | "detailed",
    proficiency: (search.get("proficiency") ?? "B1") as "A2" | "B1" | "B2",
    duration: Number(search.get("duration") ?? 20) * 60,
    speed: Number(search.get("speed") ?? 1),
    voiceId: search.get("voiceId") ?? "bIHbv24MWmeRgasZH58o",
  };

  const assistant = {
    ...vapiPrompt,
    voice: {
      ...vapiPrompt.voice,
      speed: session.speed,
      voiceId: session.voiceId,
    },
  } as object;

  const assistantOverrides = {
    recordingEnabled: true,
    variableValues: {
      name: session.name,
      accent: session.accent,
      gender: session.gender,
      scenario: session.scenario,
      formality: session.formality,
      response_length: session.response_length,
      proficiency: session.proficiency,
    },
    maxDurationSeconds: session.duration,
  };

  // --- VAPI EVENTS ---
  function onCallStart() {
    updateCallStatus(CallStatus.ACTIVE);
    console.log("call-started");
    vapi.setMuted(false);
  }

  function onCallEnd() {
    updateCallStatus(CallStatus.FINISHED);
    toast("Call ended. Thanks for practicing!", { position: "top-center" });
  }

  function startSession() {
    vapi.start(assistant, assistantOverrides).then((call) => {
      callId.current = call?.id || "";
    });
    updateMessages([]);
    updateTranscript("");
    updateCallStatus(CallStatus.CONNECTING);
  }

  function endSession() {
    updateCallStatus(CallStatus.FINISHED);
    vapi.say("This is the end of our conversation, goodbye!", true);
  }

  function handleCurrentSession() {
    if (
      callStatus === CallStatus.INACTIVE ||
      callStatus === CallStatus.FINISHED
    ) {
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

  return (
    <div className="flex w-full flex-col gap-4 sm:h-2/3 sm:w-1/3">
      <div className="bg-card flex h-6/7 flex-col items-center gap-7 rounded-lg p-6">
        <CallSessionStatus
          time={time}
          duration={session.duration}
          vapi={vapi}
        />

        <SpeakingAnimation isAISpeaking={isAISpeaking} />
      </div>

      <CallControls vapi={vapi} handleCurrentSession={handleCurrentSession} />
    </div>
  );
}
