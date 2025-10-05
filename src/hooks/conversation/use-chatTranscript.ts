"use client";

import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { toast } from "sonner";
import { RefObject, useEffect, useCallback, useRef, useState } from "react";
import { useChatSessionStore } from "@/store";
import { useSearchParams } from "next/navigation";
import { languages } from "@/utils/language";

export default function useChatTranscript() {
  const languageSourceCode = languages.userLanguage.code;
  const languageTargetCode = languages.targetLanguage.code;

  const { user } = useUser();
  const search = useSearchParams();
  const searchValues = {
    scenario: search.get("scenario") ?? "",
    formality: search.get("formality") ?? "casual",
    response_length: search.get("response_length") ?? "brief",
    proficiency: search.get("proficiency") ?? "B1",
  };

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const setChatId = useChatSessionStore((s) => s.setChatId);
  const chatId = useChatSessionStore((s) => s.chatId);
  const transcript = useChatSessionStore((s) => s.messages);
  const setMessages = useChatSessionStore((s) => s.setMessages);
  const addMessage = useChatSessionStore((s) => s.addMessage);
  const [isEnded, setIsEnded] = useState(false);

  const startConversation = useCallback(async () => {
    setMessages([
      {
        role: "assistant",
        text: "....Retrieving response",
      },
    ]);

    const result = await axios.post("/api/conversation/chat", {
      scenario: searchValues.scenario,
      formality: searchValues.formality,
      response_length: searchValues.response_length,
      proficiency: searchValues.proficiency,
      chatId: "",
      message: "",
    });
    setChatId(result.data.chatId);
    setMessages([
      {
        role: "assistant",
        text: result.data.message,
      },
    ]);
  }, [searchValues, setChatId, setMessages]);

  const endConversation = useCallback(async () => {
    setIsEnded(true);
    await axios.post("/api/conversation/chat/save", {
      chatId,
      proficiency: searchValues.proficiency,
      scenario: searchValues.scenario,
      formality: searchValues.formality,
      transcript,
    });
    toast("Chat conversation has been saved", { position: "bottom-right" });
  }, []);

  async function sendMessage(
    textMessageRef: RefObject<HTMLTextAreaElement | null>,
  ) {
    (recognitionRef.current as SpeechRecognition).stop();
    const message = (textMessageRef.current as HTMLTextAreaElement).value;
    if (message.trim().length === 0) {
      return;
    }

    addMessage({
      role: "user",
      text: message,
    });

    (textMessageRef.current as HTMLTextAreaElement).value = "";
    (textMessageRef.current as HTMLTextAreaElement).focus();

    const result = await axios.post("/api/conversation/chat", {
      message,
      chatId,
    });
    setChatId(result.data.chatId);
    addMessage({
      role: "assistant",
      text: result.data.message,
    });
  }

  // ALL useCallback ARE BEING PASED INTO MEMOISED COMPONENT
  const translate = useCallback(
    async (text: string, index: number) => {
      try {
        const response = await axios.post("/api/translate", {
          text,
          from: languageTargetCode,
          to: languageSourceCode,
        });

        const translation = response.data.message;

        const newMsgs = [...transcript];
        newMsgs[index] = { ...newMsgs[index], translation };
        setMessages(newMsgs);
      } catch (err) {
        toast.error("Error translating text.", {
          position: "top-center",
          style: {
            background: "hsl(0, 72%, 51%)",
            color: "white",
            borderRadius: "8px",
            padding: "12px 16px",
          },
        });
        console.error(err);
      }
    },
    [transcript, languageSourceCode, languageTargetCode, setMessages],
  );

  const handleCopy = useCallback((text: string) => {
    navigator.clipboard.writeText(text);
    toast("Copied to clipboard", {
      description: "Text has been copied to your clipboard.",
      position: "top-right",
    });
  }, []);

  function recordMessage(
    textMessageRef: RefObject<HTMLTextAreaElement | null>,
  ) {
    const recognition = recognitionRef.current as SpeechRecognition;
    recognition.lang = languageTargetCode;
    recognition.continuous = true;
    recognition.start();
    recognition.onresult = async function (event) {
      const transcript = event.results[event.results.length - 1][0].transcript;
      (textMessageRef.current as HTMLTextAreaElement).value += " " + transcript;
    };
  }

  useEffect(() => {
    recognitionRef.current =
      new window.SpeechRecognition() || window.webkitSpeechRecognition;
    setIsEnded(false); // endConversation() makes it true
    if (!transcript || transcript.length === 0) {
      startConversation();
    }

    return () => {
      (async () => {
        await endConversation();
      })();
    };
  }, [endConversation, startConversation, transcript]);

  return {
    userImage: user?.imageUrl,
    translate,
    handleCopy,
    sendMessage,
    recordMessage,
    endConversation,
    isEnded,
  };
}
