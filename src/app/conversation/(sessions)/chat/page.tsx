"use client";
//TODO: CHAT PERSISTS ON PAGE RELOAD, ALSO ON COMPONENT DISMOUNT. I'M THINKING GETTING IT DIRECTLY FROM VAPI, JUST STORE chatIdRef and assistantID
//TODO: SEPARATE THE COMPONENTS
//TODO: ADD ANIMATIONS TO TELL USER TO START TYPING, ELEVENLABS AUDIO TRANSCRIBER, TRANSLATOR, ANIMATION LOADER WAITING FOR RESPONSE, ERROR HANDLING

import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mic, SendHorizontal } from "lucide-react";
import axios from "axios";
import { Textarea } from "@/components/ui/textarea";
import { useSearchParams } from "next/navigation";
import Main from "@/components/tags/Main";
import { Translator } from "@/components/Translator";
import ChatTranscriptMessage from "@/components/conversation_page/chat/ChatTranscriptMessage";

interface ChatMessage {
  role: "user" | "assistant";
  text: string;
  loading: boolean;
  translation?: string;
}

export default function Page() {
  const search = useSearchParams();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const chatIdRef = useRef("");

  const textMessageRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef(
    new window.SpeechRecognition() || window.webkitSpeechRecognition,
  );

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  async function startConversation() {
    setMessages([
      {
        role: "assistant",
        text: "....Retrieving response",
        loading: true,
      },
    ]);
    //HANDLE IF ANY DATA IS MISSING
    const result = await axios.post("/api/chat", {
      scenario: search.get("scenario"),
      formality: search.get("formality"),
      response_length: search.get("response_length"),
      proficiency: search.get("proficiency"),
      chatId: "",
      message: "",
    });
    chatIdRef.current = result.data.chatId;
    setMessages([
      {
        role: "assistant",
        text: result.data.message,
        loading: false,
      },
    ]);
  }

  async function sendMessage() {
    recognitionRef.current.stop();
    const message = (textMessageRef.current as HTMLTextAreaElement).value;
    if (message.trim().length === 0) {
      return;
    }

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: message,
        loading: false,
      },
      {
        role: "assistant",
        text: "....Retrieving response",
        loading: true,
      },
    ]);

    (textMessageRef.current as HTMLTextAreaElement).value = "";
    (textMessageRef.current as HTMLTextAreaElement).focus();

    const result = await axios.post("/api/chat", {
      message,
      chatId: chatIdRef.current,
    });
    chatIdRef.current = result.data.chatId;
    setMessages((prev) => [
      ...prev.slice(0, prev.length - 1),
      {
        role: "assistant",
        text: result.data.message,
        loading: false,
      },
    ]);
  }

  function recordMessage() {
    // const SpeechRecognition =
    //   window.SpeechRecognition || window.webkitSpeechRecognition;
    // const recognition = new SpeechRecognition();
    recognitionRef.current.lang = "es";
    recognitionRef.current.continuous = true;
    recognitionRef.current.start();
    recognitionRef.current.onresult = async function (event) {
      const transcript = event.results[event.results.length - 1][0].transcript;
      (textMessageRef.current as HTMLTextAreaElement).value += " " + transcript;
      //setText(transcript);
    };
  }

  useEffect(() => {
    startConversation();
  }, []);

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
              messages={messages}
              message={message}
              setMessages={setMessages}
            />
          ))}
        </div>

        {/* TYPING AREA */}
        <div className="flex items-center gap-2 p-3">
          <Button onClick={recordMessage} className="">
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
                sendMessage();
              }
            }}
          />

          <Button onClick={sendMessage} className="">
            <SendHorizontal />
          </Button>
        </div>
      </section>

      <section className="flex w-2/5 flex-col items-center gap-10 py-10 max-md:hidden">
        {/* TRANSLATOR */}
        <div className="flex h-4/7 w-full flex-col items-center gap-3">
          {/* <select id="voiceSelect"></select> */}
          <Translator />
        </div>
      </section>
    </Main>
  );
}
