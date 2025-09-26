"use client";

import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { toast } from "sonner";
import {
  RefObject,
  useEffect,
  useMemo,
  useCallback,
  useRef,
  useState,
} from "react";
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

  async function startConversation() {
    const setMessages = useChatSessionStore.getState().setMessages;
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
  }

  //TODO: either automatically save convo, or ask user to save or not
  function restartConversation(
    textMessageRef: RefObject<HTMLTextAreaElement | null>,
  ) {
    (textMessageRef.current as HTMLTextAreaElement).value = "";
    (textMessageRef.current as HTMLTextAreaElement).focus();
    startConversation();
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

  // ALL useCallback ARE BEING PASED INTO MEMOISED COMPONENT
  const translate = useCallback(async (text: string, index: number) => {
    const messages = useChatSessionStore.getState().messages;
    const setMessages = useChatSessionStore.getState().setMessages;
    try {
      const response = await axios.post("/api/translate", {
        text,
        from: languageTargetCode,
        to: languageSourceCode,
      });

      const translation = response.data.message;

      const newMsgs = [...messages];
      newMsgs[index] = { ...newMsgs[index], translation };
      setMessages(newMsgs);
    } catch (err) {
      toast("error translating, please try again");
    }
  }, []);

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

  async function endConversation() {
    const chatId = useChatSessionStore.getState().chatId;
    const transcript = useChatSessionStore.getState().messages;
    const result = axios.post("/api/conversation/chat/save", {
      chatId,
      proficiency: searchValues.proficiency,
      scenario: searchValues.scenario,
      formality: searchValues.formality,
      transcript,
    });
  }

  useEffect(() => {
    recognitionRef.current =
      new window.SpeechRecognition() || window.webkitSpeechRecognition;
    const messages = useChatSessionStore.getState().messages;
    if (!messages || messages.length === 0) {
      startConversation();
    }
  }, []);

  return {
    userImage: user?.imageUrl,
    translate,
    handleCopy,
    sendMessage,
    recordMessage,
    restartConversation,
    endConversation,
  };
}
