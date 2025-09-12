"use client";
//TODO: make selected voice to be the voice for translation and messages, do one for english as well, make sure it persists so user doesnt have to keep choosing on page reload,
// and restarting/creating conversation
// memoise the chatTranscriptMessage, and the props being passed down,
// the page is rerendering several times, fix that
// make it so that users can translate, and select voice on mobile as well
// put the restart button somewhere else

//TODO: CHAT PERSISTS ON PAGE RELOAD, ALSO ON COMPONENT DISMOUNT. I'M THINKING GETTING IT DIRECTLY FROM VAPI, JUST STORE chatIdRef and assistantID

//TODO: SEPARATE THE COMPONENTS
//TODO: ADD ANIMATIONS TO TELL USER TO START TYPING, ELEVENLABS AUDIO TRANSCRIBER, TRANSLATOR, ANIMATION LOADER WAITING FOR RESPONSE, ERROR HANDLING

import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mic, RotateCcw, SendHorizontal } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import Main from "@/components/tags/Main";
import { Translator } from "@/components/Translator";
import ChatTranscriptMessage from "@/components/conversation_page/chat/ChatTranscriptMessage";
import { useChatSessionStore } from "@/store";
import useChatTranscript from "@/hooks/use-chatTranscript";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import Lottie from "lottie-react";
import animationData from "../../../../../public/lottie-animation/loading.json";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Page() {
  const search = useSearchParams();
  const router = useRouter();
  if (!search.get("scenario")) {
    toast("Please create a scenario to start conversation", {
      position: "top-center",
    });
    //redirect("/conversation"); for when retrieving call data from backend, remember to pass duration into useTimer when backend is ready
    router.replace("/conversation");

    return (
      <Main page="Conversation">
        <Lottie autoPlay={false} animationData={animationData} />
      </Main>
    );
  }
  const messages = useChatSessionStore((s) => s.messages);
  // const setChatId = useChatSessionStore((s) => s.setChatId);
  //const chatIdRef = useRef("");
  //const languageSourceCode = "es";

  const textMessageRef = useRef<HTMLTextAreaElement>(null);
  const { sendMessage, recordMessage, restartConversation, voiceList } =
    useChatTranscript();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  //Handle another audio being clicked whilst one is playing, it's currently cued, stop the one playing, and start playing the other one

  return (
    <Main page="Chat" className="flex h-[calc(100vh-5rem)] w-full">
      <section className="flex w-3/5 flex-col p-4 max-md:w-full">
        <div
          ref={scrollRef}
          className="hide-scrollbar dark:bg-primary/10 bg-primary-800/30 flex flex-1 flex-col gap-3 overflow-y-scroll p-4"
        >
          {messages?.map((message, index) => (
            <ChatTranscriptMessage
              key={index}
              index={index}
              message={message}
            />
          ))}
        </div>

        {/* TYPING AREA */}
        <div className="flex items-center gap-2 p-3">
          <Button onClick={() => recordMessage(textMessageRef)}>
            <Mic />
          </Button>

          <Textarea
            ref={textMessageRef}
            className="hide-scrollbar max-h-24 min-h-10 flex-1 resize-none overflow-y-auto rounded-2xl px-6 text-wrap"
            placeholder="Type a message"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage(textMessageRef);
              }
            }}
          />

          <Button onClick={() => sendMessage(textMessageRef)} className="">
            <SendHorizontal />
          </Button>
          <Button
            onClick={() => restartConversation(textMessageRef)}
            className=""
          >
            <RotateCcw />
          </Button>
        </div>
      </section>

      <section className="flex w-2/5 flex-col items-center gap-10 py-10 max-md:hidden">
        {/* TRANSLATOR */}
        <div className="flex h-4/7 w-full flex-col items-center gap-3">
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Voices" />
            </SelectTrigger>
            <SelectContent>
              {voiceList.map((voice) => (
                <SelectItem
                  key={voice.voiceURI}
                  value={voice.voiceURI}
                >{`${voice.name} - ${voice.lang}`}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Translator />
        </div>
      </section>
    </Main>
  );
}
