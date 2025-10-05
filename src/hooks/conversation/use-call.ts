import { useCallback, useEffect, useMemo, useState } from "react";
import { vapi } from "@/lib/vapi.sdk";
import { vapiPrompt } from "@/utils/conversationData/vapi";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useCallSessionStore, CallStatus } from "@/store";
import axios from "axios";

export default function useCall() {
  const [isAISpeaking, setIsAISpeaking] = useState(false);

  const callStatus = useCallSessionStore((s) => s.callStatus);
  const updateCallStatus = useCallSessionStore((s) => s.updateCallStatus);
  const updateTranscript = useCallSessionStore((s) => s.updateTranscript);
  const updateMessages = useCallSessionStore((s) => s.updateMessages);
  const updateCallId = useCallSessionStore((s) => s.updateCallId);

  const search = useSearchParams();
  const session = useMemo(() => {
    return {
      name: search.get("name") ?? "José",
      accent: search.get("accent") ?? "generic",
      gender: search.get("gender") ?? "male",
      scenario: search.get("scenario") ?? "",
      formality: (search.get("formality") ?? "casual") as "casual" | "formal",
      response_length: (search.get("response_length") ?? "brief") as
        | "brief"
        | "detailed",
      proficiency: (search.get("proficiency") ?? "B1") as "A2" | "B1" | "B2",
      duration: Number(search.get("duration") ?? 20) * 60, //vapi duration timer is in seconds
      speed: Number(search.get("speed") ?? 1),
      voiceId: search.get("voiceId") ?? "bIHbv24MWmeRgasZH58o",
    };
  }, [search]);

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
  const onCallStart = useCallback(() => {
    updateCallStatus(CallStatus.ACTIVE);
    vapi.setMuted(false);
  }, [updateCallStatus]);

  const onCallEnd = useCallback(() => {
    updateCallStatus(CallStatus.FINISHED);
    const callId = useCallSessionStore.getState().callId;
    setTimeout(async () => {
      await axios.post("/api/conversation/call", {
        scenario: session.scenario,
        formality: session.formality,
        proficiency: session.proficiency,
        callId,
      });
    }, 5000); //Time buffer so vapi api can be updated with the new data

    toast("Call ended. Thanks for practicing!", { position: "top-center" });
  }, [session, updateCallStatus]);

  function startSession() {
    // updateClock("00:00");
    vapi.start(assistant, assistantOverrides).then((call) => {
      updateCallId(call?.id || "");
    });
    updateMessages([]);
    updateTranscript("");
    updateCallStatus(CallStatus.CONNECTING);
  }

  function endSession() {
    updateCallStatus(CallStatus.FINISHED);
    vapi.stop();
  }

  function onSpeechStart() {
    setIsAISpeaking(true);
  }
  function onSpeechEnd() {
    setIsAISpeaking(false);
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
    vapi.on("speech-start", () => onSpeechStart);
    vapi.on("speech-end", () => onSpeechEnd);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("speech-start", () => onSpeechStart);
      vapi.off("speech-end", () => onSpeechEnd);
    };
  }, [onCallEnd, onCallStart, session]); // to prevent recreating event listeners and removing on every render

  return { handleCurrentSession, isAISpeaking };
}
