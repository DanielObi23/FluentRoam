"use client";

import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { toast } from "sonner";
import { RefObject, useEffect, useMemo, useRef, useState } from "react";
import { useChatSessionStore } from "@/store";
import { useSearchParams } from "next/navigation";

export default function useChatTranscript() {
  const { user } = useUser();
  const search = useSearchParams();
  const setChatId = useChatSessionStore((s) => s.setChatId);
  const languageSourceCode = "es";
  const languageTargetCode = "en";
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  let selectedVoice: SpeechSynthesisVoice | null = null;

  async function startConversation() {
    const setMessages = useChatSessionStore.getState().setMessages;
    setMessages([
      {
        role: "assistant",
        text: "....Retrieving response",
      },
    ]);

    const result = await axios.post("/api/chat", {
      scenario: search.get("scenario") ?? "",
      formality: search.get("formality") ?? "casual",
      response_length: search.get("response_length") ?? "brief",
      proficiency: search.get("proficiency") ?? "B1",
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
  }

  async function sendMessage(
    textMessageRef: RefObject<HTMLTextAreaElement | null>,
  ) {
    const chatId = useChatSessionStore.getState().chatId;
    const addMessage = useChatSessionStore.getState().addMessage;
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

    const result = await axios.post("/api/chat", {
      message,
      chatId,
    });
    setChatId(result.data.chatId);
    addMessage({
      role: "assistant",
      text: result.data.message,
    });
  }

  async function translate(text: string, index: number) {
    const messages = useChatSessionStore.getState().messages;
    const setMessages = useChatSessionStore.getState().setMessages;
    try {
      const response = await axios.post("/api/translate", {
        text,
        from: languageSourceCode,
        to: languageTargetCode,
      });

      const translation = response.data.message;

      const newMsgs = [...messages];
      newMsgs[index] = { ...newMsgs[index], translation };
      setMessages(newMsgs);
    } catch (err) {
      toast("error translating, please try again");
    }
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast("Copied to clipboard", {
      description: "Text has been copied to your clipboard.",
      position: "top-right",
    });
  };

  const playAudio = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      //utterance.getVoices();
      //   utterance.voice = new SpeechSynthesisVoice(
      //     "Microsoft Dalia Online (Natural) - Spanish (Mexico)",
      //   );
      utterance.lang = languageSourceCode;

      if (selectedVoice) utterance.voice = selectedVoice;
      //"Microsoft Jorge Online (Natural) - Spanish (Mexico)"
      // "es-ES" - spain; "es-US" - United states; "es-MX" - Mexico
      // Get available voices
      //   const voices = speechSynthesis.getVoices();

      //   // Pick a specific voice by name or language
      //   const selectedVoice =
      //     voices.find((v) => v.lang === lang) ||
      //     voices.find((v) => v.name.includes("Google Español")) ||
      //     voices[0];

      //   if (selectedVoice) {
      //     utterance.voice = selectedVoice;
      //   }
      speechSynthesis.getVoices;
      speechSynthesis.speak(utterance);
    }
  };

  function recordMessage(
    textMessageRef: RefObject<HTMLTextAreaElement | null>,
  ) {
    // const SpeechRecognition =
    //   window.SpeechRecognition || window.webkitSpeechRecognition;
    // const recognition = new SpeechRecognition();
    const recognition = recognitionRef.current as SpeechRecognition;
    recognition.lang = languageSourceCode;
    recognition.continuous = true;
    recognition.start();
    recognition.onresult = async function (event) {
      const transcript = event.results[event.results.length - 1][0].transcript;
      (textMessageRef.current as HTMLTextAreaElement).value += " " + transcript;
      //setText(transcript);
    };
  }

  //TODO: either automatically save convo, or ask user to save or not
  function restartConversation(
    textMessageRef: RefObject<HTMLTextAreaElement | null>,
  ) {
    (textMessageRef.current as HTMLTextAreaElement).value = "";
    (textMessageRef.current as HTMLTextAreaElement).focus();
    startConversation();
  }

  const voiceList = useMemo(() => {
    const voices = speechSynthesis.getVoices();
    return voices.filter((voice) =>
      voice.lang.includes(`${languageSourceCode}-`),
    );
  }, [languageSourceCode]);

  useEffect(() => {
    console.log(voiceList);
    recognitionRef.current =
      new window.SpeechRecognition() || window.webkitSpeechRecognition;
    const messages = useChatSessionStore.getState().messages;
    if (messages) return;
    startConversation;
  }, []);

  return {
    userImage: user?.imageUrl,
    translate,
    handleCopy,
    playAudio,
    sendMessage,
    recordMessage,
    restartConversation,
    voiceList,
  };
}
