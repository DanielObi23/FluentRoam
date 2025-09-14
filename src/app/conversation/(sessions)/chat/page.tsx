"use client";
//TODO: CHAT PERSISTS ON PAGE RELOAD, ALSO ON COMPONENT DISMOUNT. I'M THINKING GETTING IT DIRECTLY FROM VAPI, JUST STORE chatId and assistantID, instead of localStorage with zustand

import { useRef, useEffect, RefObject } from "react";
import { Button } from "@/components/ui/button";
import { Mic, SendHorizontal } from "lucide-react";
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
  const textMessageRef = useRef<HTMLTextAreaElement>(null);
  const {
    sendMessage,
    recordMessage,
    restartConversation,
    voiceList,
    setSelectedVoice,
    playAudio,
    userImage,
    handleCopy,
    translate,
    selectedVoiceURI,
  } = useChatTranscript();
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
          restartConversation={restartConversation}
          selectedVoiceURI={selectedVoiceURI}
          textMessageRef={textMessageRef as RefObject<HTMLTextAreaElement>}
        />

        {/* CHAT AREA */}
        <div
          ref={scrollRef}
          className="hide-scrollbar dark:bg-primary/10 bg-primary-800/30 flex flex-1 flex-col gap-3 overflow-y-scroll p-4"
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
        </div>
      </section>

      <section className="flex w-2/5 flex-col items-center gap-10 py-10 max-md:hidden">
        <div className="flex h-4/7 w-full flex-col items-center gap-5">
          {/* VOICE SELECT */}
          {voiceList.length > 0 && (
            <div className="grid grid-cols-12 gap-2">
              <Button
                className="col-span-4"
                onClick={() => playAudio("hola, qué tal")}
              >
                Test Voice
              </Button>
              <Select
                onValueChange={(voiceURI) => {
                  setSelectedVoice(voiceURI);
                }}
                defaultValue={selectedVoiceURI}
              >
                <SelectTrigger className="md:w-[10rem] lg:w-[15rem]">
                  <SelectValue placeholder="Voices" />
                </SelectTrigger>
                <SelectContent defaultValue={selectedVoiceURI}>
                  {voiceList.map((voice) => (
                    <SelectItem
                      key={voice.voiceURI}
                      value={voice.voiceURI as string}
                    >{`${voice.name} - ${voice.lang}`}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* TRANSLATOR */}
          <Translator playLearningAudio={playAudio} />
          <Dialog>
            <DialogTrigger asChild className="self-end">
              <Button variant="destructive">Restart Conversation</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Restart Conversation</DialogTitle>
                <DialogDescription>
                  Are you sure you want to restart conversation?
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
                    onClick={() => restartConversation(textMessageRef)}
                    className="self-end"
                  >
                    Restart<span className="max-sm:hidden">Conversation</span>
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
