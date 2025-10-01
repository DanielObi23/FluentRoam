"use client";

import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mic, SendHorizontal } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import Main from "@/components/tags/Main";
import { Translator } from "@/components/Translator";
import ChatTranscriptMessage from "@/components/conversation_page/chat/ChatTranscriptMessage";
import { useChatSessionStore } from "@/store";
import useChatTranscript from "@/hooks/conversation/use-chatTranscript";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import Lottie from "lottie-react";
import animationData from "../../../../../public/lottie-animation/loading.json";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ChatFeatures from "@/components/conversation_page/chat/ChatFeatures";
import VoiceSelect from "@/components/VoiceSelect";
import usePlayAudio from "@/hooks/use-playAudio";
import { cn } from "@/lib/utils";

export default function Page() {
  const search = useSearchParams();
  const router = useRouter();

  if (!search.get("scenario")) {
    toast("Please create a scenario to start conversation", {
      position: "top-center",
    });
    router.replace("/conversation");

    return (
      <Main page="Conversation">
        <Lottie autoPlay={false} animationData={animationData} />
      </Main>
    );
  }

  const messages = useChatSessionStore((s) => s.messages);
  const textMessageRef = useRef<HTMLTextAreaElement>(null);

  const {
    sendMessage,
    recordMessage,
    userImage,
    handleCopy,
    translate,
    endConversation,
    isEnded,
  } = useChatTranscript();

  const { voiceList, setSelectedVoice, playAudio, selectedVoiceURI } =
    usePlayAudio();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <Main page="Chat" className="flex h-[calc(100vh-5rem)] w-full">
      <section className="relative flex w-3/5 flex-col p-4 max-md:w-full">
        <ChatFeatures
          voiceList={voiceList}
          playAudio={playAudio}
          setSelectedVoice={setSelectedVoice}
          endConversation={endConversation}
          selectedVoiceURI={selectedVoiceURI}
        />

        {/* CHAT AREA */}
        <div
          ref={scrollRef}
          className="scrollbar-hover dark:bg-primary/10 bg-primary-800/30 flex flex-1 flex-col gap-3 overflow-y-scroll p-4"
        >
          {messages?.map((message, index) => (
            <ChatTranscriptMessage
              key={index}
              index={index}
              message={message}
              playAudio={playAudio}
              userImage={userImage}
              handleCopy={handleCopy}
              translate={translate}
            />
          ))}
        </div>

        {/* TYPING AREA */}
        <div
          className={cn(isEnded ? "hidden" : "flex items-center", "gap-2 p-3")}
        >
          <Button onClick={() => recordMessage(textMessageRef)}>
            <Mic />
          </Button>

          <Textarea
            ref={textMessageRef}
            className="scrollbar-hover max-h-24 min-h-10 flex-1 resize-none overflow-y-auto rounded-2xl px-6 text-wrap"
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
        </div>
      </section>

      <section className="flex w-2/5 flex-col items-center gap-10 py-10 max-md:hidden">
        <div className="flex h-4/7 w-full flex-col items-center gap-5">
          {/* VOICE SELECT */}
          <VoiceSelect />

          {/* TRANSLATOR */}
          <Translator playLearningAudio={playAudio} />
          <Dialog>
            <DialogTrigger asChild className="self-end">
              <Button variant="destructive">End Conversation</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>End Conversation</DialogTitle>
                <DialogDescription>
                  Are you sure you want to end conversation?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="flex items-center sm:justify-between">
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Close
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button
                    variant={"destructive"}
                    onClick={endConversation}
                    className="self-end"
                  >
                    End<span className="max-sm:hidden">Conversation</span>
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </section>
    </Main>
  );
}
