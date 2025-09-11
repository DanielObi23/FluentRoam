import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import useConversationMessage from "@/hooks/use-conversationMessage";
import CallTranscriptMessage from "./CallTranscriptMessage";

export default function CallTranscript() {
  const [showTranscript, setShowTranscript] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { messages, translate } = useConversationMessage();

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
    //scrollRef.current?.scrollIntoView({ behavior: "auto" });
  }, [messages.length]); //length: to avoid it scrolling when translation is added

  function toggleDisplay() {
    setShowTranscript((prev) => !prev);
  }

  return (
    <div className="bg-card flex h-full w-full flex-col rounded-lg sm:w-2/3">
      <div className="flex items-center justify-between border-b p-4">
        <h2 className="text-xl font-semibold">Call Transcript</h2>
        <Button onClick={toggleDisplay} className="hidden sm:inline">
          Toggle Display
        </Button>
      </div>

      {/* live transcript */}
      <div
        ref={scrollRef}
        className="bg-card hide-scrollbar flex flex-col gap-3 overflow-y-scroll p-4"
      >
        {showTranscript &&
          messages.map((m, i) => (
            <CallTranscriptMessage key={i} message={m} index={i} />
          ))}
      </div>
    </div>
  );
}
