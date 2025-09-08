import Vapi from "@vapi-ai/web";
import { useEffect } from "react";
import { toast } from "sonner";
import { useCallSessionStore, CallStatus } from "@/store";

export default function CallSessionStatus({
  time,
  duration,
  vapi,
}: {
  time: number;
  duration: number;
  vapi: Vapi;
}) {
  const clock = useCallSessionStore((state) => state.clock);
  const updateClock = useCallSessionStore((state) => state.updateClock);
  const callStatus = useCallSessionStore((state) => state.callStatus);

  function timerUpdate() {
    //duration and time are in seconds
    // show toast when half way done
    if (time === Math.floor(duration / 2)) {
      toast(`${Math.floor(time / 60)} mins left.`, {
        position: "top-center",
      });
      return;
    }

    // show toast when 5 minute left
    if (time === Math.floor(duration - 5 * 60)) {
      toast("5 mins left.", { position: "top-center" });
      return;
    }

    // show toast when 1 minute left
    if (time === Math.floor(duration - 1 * 60)) {
      toast("1 min left.", { position: "top-center" });
      vapi.send({
        type: "add-message",
        message: {
          role: "system",
          content: `
              You have less than 1 minute left in this call.  
              - Do not mention the time limit.  
              - Wait until after the learner's next reply before steering toward the ending.  
              - Close the conversation politely and naturally, in character with your current role.  
              - The ending should fit the scenario (e.g., waiter = "Gracias por venir", tutor = "Nos vemos en la próxima clase").  
              - Keep it brief and friendly, like a real conversation winding down.  
                  `,
        },
      });
      return;
    }
  }

  useEffect(() => {
    if (callStatus === CallStatus.CONNECTING) {
      updateClock("00:00");
      return;
    }
    if (callStatus !== CallStatus.ACTIVE) return;
    const interval = setInterval(() => {
      timerUpdate();
      // updateClock();
    }, 1000);

    return () => clearInterval(interval);
  }, [callStatus]);

  return (
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
  );
}
