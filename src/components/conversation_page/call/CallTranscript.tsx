import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { callTranscript } from "@/dummy_data";
import defaultProfile from "../../../../public/default_profile.jpg";
import fluentroam from "../../../../public/logo/fluentroam.jpg";
import { useUser } from "@clerk/nextjs";

type Role = "assistant" | "user";
type Message = {
  type: string;
  transcript: string;
  role: Role;
  transcriptType: "partial" | "final";
  input?: string;
  translation?: string;
};

type Transcript = {
  translate: (text: string, index: number) => Promise<void>;
  messages: Message[];
};
export default function CallTranscript({ translate, messages }: Transcript) {
  const [showTranscript, setShowTranscript] = useState(true);
  const { user } = useUser();
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

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
          messages?.map((m, i) => (
            <div
              key={i}
              className={cn(
                m.role === "assistant"
                  ? "justify-start self-start"
                  : "justify-end self-end",
                "flex w-8/9 flex-col gap-x-0.5 md:w-5/7",
              )}
              onDoubleClick={
                m.role === "assistant"
                  ? () => translate(m.transcript, i)
                  : undefined
              }
            >
              <div
                className={cn(
                  m.role === "assistant" ? "justify-start" : "justify-end",
                  "flex w-full gap-2",
                )}
              >
                <div
                  className={cn(
                    m.role === "assistant"
                      ? "text-foreground order-2 rounded-tl-3xl rounded-tr-3xl rounded-br-3xl bg-blue-600"
                      : "text-foreground rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl bg-teal-600",
                    "font-content w-6/7 space-y-2.5 px-4 py-3 text-pretty",
                  )}
                >
                  <p>{m.transcript}</p>
                  {m.translation && (
                    <p className="text-foreground w-full rounded-tl-xl rounded-tr-xl rounded-br-xl rounded-bl-xl bg-gray-600/40 px-4 py-3 text-pretty">
                      {m.translation}
                    </p>
                  )}
                </div>

                <Avatar
                  className={cn(
                    m.role === "assistant" ? "self-end" : "self-end",
                    "",
                  )}
                >
                  <AvatarImage
                    src={
                      m.role === "assistant"
                        ? fluentroam.src
                        : (user?.imageUrl ?? defaultProfile.src)
                    }
                    className="object-cover"
                  />
                  <AvatarFallback>
                    {m.role === "assistant" ? "AI" : "YOU"}
                  </AvatarFallback>
                </Avatar>
              </div>

              <Button
                variant={"outline"}
                className={cn(
                  m.role === "assistant" ? "ml-9 self-start" : "mr-9 self-end",
                  "mt-1",
                  m.translation && "hidden",
                )}
                onClick={() => translate(m.transcript, i)}
              >
                Translate
              </Button>
            </div>
          ))}
      </div>
    </div>
  );
}
