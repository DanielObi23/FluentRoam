import { useEffect, useRef, useState } from "react";
import Vapi from "@vapi-ai/web";
import { vapiPrompt } from "@/conversationData/vapi";
import { parseAsString, useQueryState } from "nuqs";
import { useRouter, useSearchParams } from "next/navigation";
import CallSessionStatus from "./CallSessionStatus";
import SpeakingAnimation from "./SpeakingAnimation";
import CallControls from "./CallControls";
import { toast } from "sonner";

export enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

export default function Call({
  vapi,
  transcript,
}: {
  transcript: string;
  vapi: Vapi;
}) {
  const search = useSearchParams();
  const [isAISpeaking, setIsAISpeaking] = useState(false);
  const [callStatus, setCallStatus] = useQueryState(
    "call-status",
    parseAsString.withDefault(CallStatus.INACTIVE),
  );
  const router = useRouter();
  const callId = useRef("");

  // VAPI CALL SETTINGS
  const session = {
    scenario: search.get("scenario") ?? "",
    gender: (search.get("gender") ?? "male") as "male" | "female",
    formality: (search.get("formality") ?? "casual") as "casual" | "formal",
    response_length: (search.get("response_length") ?? "brief") as
      | "brief"
      | "detailed",
    proficiency: (search.get("proficiency") ?? "B1") as "A2" | "B1" | "B2",
    duration: Number(search.get("duration") ?? 20) * 60,
    speed: Number(search.get("speed") ?? 1),
    voiceId: search.get("voiceId") ?? "bIHbv24MWmeRgasZH58o",
  };

  const assistant: object = {
    ...vapiPrompt,
    voice: {
      ...vapiPrompt.voice,
      speed: session.speed,
      voiceId: session.voiceId,
    },
  };

  const assistantOverrides = {
    recordingEnabled: true,
    variableValues: {
      scenario: session.scenario,
      formality: session.formality,
      response_length: session.response_length,
      proficiency: session.proficiency,
    },
    maxDurationSeconds: session.duration,
  };

  // VAPI EVENTS
  function onCallStart() {
    setCallStatus(CallStatus.ACTIVE);
    vapi.setMuted(false);
  }

  function onCallEnd() {
    setCallStatus(CallStatus.FINISHED);
    toast("Call ended. Thanks for practicing!", {
      position: "top-center",
      style: {
        "--normal-bg":
          "light-dark(var(--color-green-600), var(--color-green-400))",
        "--normal-text": "var(--color-white)",
        "--normal-border":
          "light-dark(var(--color-green-600), var(--color-green-400))",
      } as React.CSSProperties,
    });
    // save call-id and messages to database, as well as feedback and other necessary form data
  }

  function startSession() {
    vapi.start(assistant, assistantOverrides).then((call) => {
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
      startSession();
    } else {
      endSession();
    }
  }

  useEffect(() => {
    if (!session.scenario) {
      toast("Please create a scenario to start conversation");
      router.replace("/conversation");
      return;
    }
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
        {/* Time and Call status*/}
        <CallSessionStatus
          status={callStatus}
          duration={session.duration}
          vapi={vapi}
        />

        {/* Speaking animation and Caption */}
        <SpeakingAnimation
          isAISpeaking={isAISpeaking}
          transcript={transcript}
        />
      </div>

      {/* Control Buttons */}
      <CallControls
        callStatus={callStatus}
        vapi={vapi}
        handleCurrentSession={handleCurrentSession}
      />
    </div>
  );
}
