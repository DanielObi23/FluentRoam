import { useCallSessionStore, CallStatus } from "@/store";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { vapi } from "@/lib/vapi.sdk";

export default function useTimer() {
  const search = useSearchParams();
  const updateClock = useCallSessionStore((s) => s.updateClock);
  const callStatus = useCallSessionStore((s) => s.callStatus);

  const time = useRef(0);

  function updateTime() {
    const mins = Math.floor(time.current / 60);
    const secs = time.current % 60;
    updateClock(
      `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`,
    );
    if (callStatus === CallStatus.ACTIVE) {
      time.current += 1;
    }
  }

  function timerUpdate(duration: number) {
    //DURATION AND TIME ARE IN SECONDS
    // show toast when half way done
    if (time.current === Math.floor(duration / 2)) {
      toast(`${Math.floor(time.current / 60)} mins left.`, {
        position: "top-center",
      });
      return;
    }

    // show toast when 5 minute left
    if (duration > 5 * 60 && time.current === Math.floor(duration - 5 * 60)) {
      toast("5 mins left.", { position: "top-center" });
      return;
    }

    // show toast when 1 minute left
    if (time.current === Math.floor(duration - 1 * 60)) {
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
      time.current = 0;
      updateClock("00:00");
      return;
    }
    if (callStatus !== CallStatus.ACTIVE) return;
    const interval = setInterval(() => {
      timerUpdate((Number(search.get("duration")) ?? 20) * 60);
    }, 1000);

    return () => clearInterval(interval);
  }, [callStatus]);

  useEffect(() => {
    if (callStatus !== CallStatus.ACTIVE) return;
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [callStatus]);
}
