import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import defaultProfile from "../../../../public/default_profile.jpg";
import fluentroam from "../../../../public/logo/fluentroam.jpg";
import { useUser } from "@clerk/nextjs";
import Vapi from "@vapi-ai/web";
import { useCallSessionStore } from "@/store";
import axios from "axios";

type UserMessage = {
  type: "transcript";
  transcript: string;
  role: "user";
  transcriptType: "partial" | "final";
  translation?: string;
};

type AssistantMessage = {
  type: "voice-input";
  input: string;
  role: "assistant";
  translation?: string;
};

type Message = UserMessage | AssistantMessage;

export type Conversation = {
  transcript: string;
  role: "user" | "assistant";
  transcriptType: "partial" | "final";
  translation?: string;
};

export default function CallTranscript({ vapi }: { vapi: Vapi }) {
  const [showTranscript, setShowTranscript] = useState(true);
  const messages = useCallSessionStore((state) => state.messages);
  const { user } = useUser();
  const scrollRef = useRef<HTMLDivElement>(null);

  function addAssistantMessage(
    message: AssistantMessage,
    messages: Conversation[],
    lastMessage: Conversation,
    updateMessages: (message: Conversation[]) => void,
    updateTranscript: (text: string) => void,
  ) {
    // first message
    if (messages.length === 0) {
      updateTranscript(message.input ?? "");

      const firstMessage = {
        type: "voice-input",
        transcript: message.input ?? "",
        role: "assistant" as const,
        transcriptType: "final" as const,
      };
      updateMessages([firstMessage]);
      return;
    }

    // Last message was assistant
    if (lastMessage.role === "assistant") {
      if (lastMessage.transcript.includes(message.input ?? "")) return; // avoiding duplicates
      const concatenatedText = lastMessage.transcript + " " + message.input;
      const newMessage = {
        type: "voice-input",
        transcript: concatenatedText,
        role: "assistant" as const,
        transcriptType: "final" as const,
      };
      updateTranscript(concatenatedText);
      updateMessages([...messages.slice(0, -1), newMessage]);
      return;
    }

    // Last message was user
    const newMessage = {
      type: "voice-input",
      transcript: message.input ?? "",
      role: "assistant" as const,
      transcriptType: "final" as const,
    };
    updateMessages([...messages, newMessage]);
    return;
  }

  function addUserMessage(
    message: UserMessage,
    messages: Conversation[],
    lastMessage: Conversation,
    updateMessages: (message: Conversation[]) => void,
    updateTranscript: (text: string) => void,
  ) {
    // first message
    if (messages.length === 0) {
      updateTranscript(message.transcript);

      const firstMessage = {
        type: "transcript",
        transcript: message.transcript,
        role: "user" as const,
        transcriptType: "final" as const,
      };
      updateMessages([firstMessage]);
      return;
    }

    // Last message was user
    if (lastMessage.role === "user") {
      if (
        message.transcript.toLowerCase() ===
        lastMessage.transcript.toLowerCase()
      )
        return; // avoiding duplicates
      const concatenatedText =
        lastMessage.transcript + " " + message.transcript;
      const newMessage = {
        type: "transcript",
        transcript: concatenatedText,
        role: "user" as const,
        transcriptType: "final" as const,
      };
      updateTranscript(concatenatedText);
      updateMessages([...messages.slice(0, -1), newMessage]);
      return;
    }

    // Last message was assistant
    const newMessage = {
      type: "transcript",
      transcript: message.transcript,
      role: "user" as const,
      transcriptType: "final" as const,
    };
    updateTranscript(message.transcript);
    updateMessages([...messages, newMessage]);
    return;
  }

  function onMessage(message: Message) {
    if (
      message.type === "voice-input" ||
      (message.type === "transcript" &&
        message.role === "user" &&
        message.transcriptType === "final")
    ) {
      const { messages, updateMessages, updateTranscript } =
        useCallSessionStore.getState();
      const lastMessage = messages[messages.length - 1];
      if (message.type === "voice-input") {
        addAssistantMessage(
          message,
          messages,
          lastMessage,
          updateMessages,
          updateTranscript,
        );
        return;
      }

      addUserMessage(
        message,
        messages,
        lastMessage,
        updateMessages,
        updateTranscript,
      );
    }
  }

  async function translate(text: string, index: number) {
    const { messages, updateMessages } = useCallSessionStore.getState();
    const response = await axios.post("/api/translate", {
      text,
      from: "it",
      to: "es",
    });

    const translation = response.data;

    const newMsgs = [...messages];
    newMsgs[index] = { ...newMsgs[index], translation: translation.message };
    updateMessages(newMsgs);
  }

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    // if(!user) {
    //     router.replace('/sign-in')
    //     return
    // }

    vapi.on("message", onMessage);

    return () => {
      vapi.off("message", onMessage);
    };
  }, []);

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
