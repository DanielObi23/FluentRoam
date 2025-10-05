import { Mic, MicOff, Captions, CaptionsOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CallStatus, useCallSessionStore } from "@/store";
import { vapi } from "@/lib/vapi.sdk";
import { useState } from "react";

export default function CallControls({
  handleCurrentSession,
}: {
  handleCurrentSession: () => void;
}) {
  const captionIsOn = useCallSessionStore((state) => state.captionIsOn);
  const toggleCaption = useCallSessionStore((state) => state.updateCaptionIsOn);
  const callStatus = useCallSessionStore((state) => state.callStatus);
  const [isMuted, setIsMuted] = useState(false);
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-6">
      {/* MUTE BUTTON */}
      <Button
        variant="outline"
        className="flex h-14 flex-col gap-1 sm:col-span-2"
        onClick={() => {
          if (callStatus === CallStatus.ACTIVE) {
            const mute = !isMuted;
            vapi.setMuted(mute);
            setIsMuted(mute);
          }
        }}
      >
        {isMuted ? <Mic /> : <MicOff />}
        <span className="text-xs sm:text-sm">Mic {isMuted ? "on" : "off"}</span>
      </Button>

      {/* CAPTION BUTTON (mobile only) */}
      <Button
        variant="outline"
        className="flex h-14 flex-col gap-1 sm:hidden"
        onClick={toggleCaption}
      >
        {captionIsOn ? <CaptionsOff /> : <Captions />}
        <span className="text-xs">Transcript {captionIsOn ? "off" : "on"}</span>
      </Button>

      {/* CALL BUTTON */}
      <Button
        variant="destructive"
        className="col-span-2 h-14 sm:col-span-4"
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
  );
}
