"use client";
//TODO: check max token, as well as speed of speaking and gender change, page reload when mid conversation.
// add speed and duration to type Session later, check out the searchParams, optimise the number of states in the component, there is too many being rerendered
// handle user refreshing the page or leaving the page to home or other mid convo
// handle user starting this page with missing form data
// update conversations avatar
// find a different way to pass the data besides query parameter
//TODO: stop conversation once the page is left, whether back button or end conversation, if microphone access is denied, add toast
// fix the prompting for the vapi scenario7
// fix UI for when device is tilted: mobile
// check use-mobile in hooks, then check to use for conditionally rendering which UI
// put vapi assistant id and change vapi web token from next_public in env

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navigation from "@/components/app_layout/Navigation";
import Call from "@/components/conversation_page/call/Call";
import CallTranscript from "@/components/conversation_page/call/CallTranscript";
import { vapi } from "@/lib/vapi.sdk";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";

type Role = "assistant" | "user";

type Message = {
  type: string;
  transcript: string;
  role: Role;
  transcriptType: "partial" | "final";
  input?: string;
  translation?: string;
};

export default function Session() {
  const router = useRouter();

  const [messages, setMessages] = useState<Message[]>([]);
  const [transcript, setTranscript] = useState("");

  function onMessage(message: Message) {
    if (
      message.type === "voice-input" ||
      (message.type === "transcript" &&
        message.role === "user" &&
        message.transcriptType === "final")
    ) {
      setMessages((prevMessages) => {
        if (prevMessages.length === 0) {
          if (message.type === "voice-input") {
            setTranscript(message.input ?? "");
            const newMessage = {
              type: "voice-input",
              transcript: message.input ?? "",
              role: "assistant" as const,
              transcriptType: "final" as const,
            };
            return [newMessage];
          }
          return [message];
        }

        const lastMessage = prevMessages[prevMessages.length - 1];
        if (message.type === "voice-input") {
          if (lastMessage.role === "assistant") {
            const concatenatedText =
              lastMessage.transcript + " " + message.input;
            const newMessage = {
              type: "voice-input",
              transcript: concatenatedText,
              role: "assistant" as const,
              transcriptType: "final" as const,
            };
            setTranscript(concatenatedText);
            return [...prevMessages.slice(0, -1), newMessage];
          }

          const newMessage = {
            type: "voice-input",
            transcript: message.input ?? "",
            role: "assistant" as const,
            transcriptType: "final" as const,
          };
          setTranscript(message.input ?? "");
          return [...prevMessages, newMessage];
        } else if (lastMessage.role === "user" && message.role === "user") {
          const concatenatedText =
            lastMessage.transcript.length > 0
              ? lastMessage.transcript + " " + message.transcript
              : message.transcript;
          const newUserMessage = {
            type: message.type,
            transcript: concatenatedText,
            role: message.role,
            transcriptType: message.transcriptType,
          };
          return [...prevMessages.slice(0, -1), newUserMessage];
        } else {
          if (message.type === "voice-input") {
            const newMessage = {
              type: "voice-input",
              transcript: message.input ?? "",
              role: "assistant" as const,
              transcriptType: "final" as const,
            };
            return [...prevMessages, newMessage];
          }
          return [...prevMessages, message];
        }
      });
      // if (scrollToMessage.current) {
      //     scrollToMessage.current.scrollIntoView({ behavior: "smooth" });
      // }
    }
  }

  function onError(error: Error) {
    console.log("Error", error);
  }

  async function translate(text: string, index: number) {
    const response = await axios.post("/api/translate", {
      text,
      from: "it",
      to: "es",
    });

    const translation = response.data;

    setMessages((prevMessages) => {
      const newMsgs = [...prevMessages];
      newMsgs[index] = { ...newMsgs[index], translation: translation.message };
      return newMsgs;
    });
  }

  useEffect(() => {
    // if(!user) {
    //     router.replace('/sign-in')
    //     return
    // }

    vapi.on("message", onMessage);
    vapi.on("error", onError);

    return () => {
      vapi.off("message", onMessage);
      vapi.off("error", onError);
    };
  }, []);

  return (
    <div className="bg-background flex h-screen w-full flex-col">
      <Navigation page="Conversation" />
      {/* DESKTOP VIEW */}
      <main className="hidden h-[calc(100vh-5rem)] w-full gap-5 p-4 sm:flex sm:flex-row">
        <Call vapi={vapi} transcript={transcript} />
        <CallTranscript translate={translate} messages={messages} />
      </main>

      {/* MOBILE VIEW */}
      <main className="flex h-[calc(100vh-5rem)] w-full flex-col gap-5 p-4 sm:hidden md:flex-row">
        <Tabs defaultValue="call" className="h-full w-full">
          <TabsList className="h-10 w-full">
            <TabsTrigger value="call">Call</TabsTrigger>
            <TabsTrigger value="transcript">Transcript</TabsTrigger>
          </TabsList>
          <TabsContent
            value="call"
            className="flex h-[calc(100%-40px)] w-full flex-col gap-5 p-2 md:flex-row"
          >
            <Call vapi={vapi} transcript={transcript} />
          </TabsContent>
          <TabsContent
            value="transcript"
            className="flex h-[calc(100%-40px)] w-full flex-col gap-5 p-2 md:flex-row"
          >
            <CallTranscript translate={translate} messages={messages} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
