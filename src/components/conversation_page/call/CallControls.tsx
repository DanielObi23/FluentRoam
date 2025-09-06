import { Mic, MicOff, Captions, CaptionsOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCallSessionStore } from "@/store";
import Vapi from "@vapi-ai/web";
import { useState } from "react";
import { CallStatus } from "./Call";

export default function CallControls({
  callStatus,
  handleCurrentSession,
  vapi,
}: {
  callStatus: string;
  handleCurrentSession: () => void;
  vapi: Vapi;
}) {
  const captionIsOn = useCallSessionStore((state) => state.captionIsOn);
  const toggleCaption = useCallSessionStore((state) => state.updateCaptionIsOn);
  const [isMuted, setIsMuted] = useState(false);
  return (
    <div className="grid grid-cols-6 gap-3">
      {/* MUTE BUTTON */}
      <Button
        variant="outline"
        className="col-span-3 flex h-16 flex-col gap-2 sm:col-span-6 lg:col-span-2"
        onClick={() => {
          if (callStatus === CallStatus.ACTIVE) {
            const mute = !isMuted;
            vapi.setMuted(mute);
            setIsMuted(mute);
          }
        }}
      >
        {isMuted ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
        <span className="text-sm">Turn {isMuted ? "on" : "off"} mic</span>
      </Button>

      {/* CAPTION BUTTON */}
      <Button
        variant="outline"
        className="col-span-3 flex h-16 flex-col gap-2 sm:hidden"
        onClick={toggleCaption}
      >
        {captionIsOn ? <CaptionsOff /> : <Captions />}
        <span className="text-sm">
          Turn {captionIsOn ? "off" : "on"} transcript
        </span>
      </Button>

      {/* CALL BUTTON */}
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
  );
}
