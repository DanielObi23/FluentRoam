import CallSessionStatus from "./CallSessionStatus";
import SpeakingAnimation from "./SpeakingAnimation";
import CallControls from "./CallControls";
import useCall from "@/hooks/conversation/use-call";

export default function Call() {
  const { handleCurrentSession, isAISpeaking } = useCall();
  return (
    <div className="flex flex-1 flex-col gap-4 overflow-hidden">
      <div className="bg-card flex flex-1 flex-col items-center gap-6 overflow-y-auto rounded-lg p-6">
        <CallSessionStatus />
        <SpeakingAnimation isAISpeaking={isAISpeaking} />
      </div>
      <CallControls handleCurrentSession={handleCurrentSession} />
    </div>
  );
}
