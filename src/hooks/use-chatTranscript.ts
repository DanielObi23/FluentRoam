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

export default function useChatTranscript() {
  const languageSourceCode = "es";
  const languageTargetCode = "en";

  const { user } = useUser();
  const search = useSearchParams();

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [voiceList, setVoiceList] = useState<SpeechSynthesisVoice[]>([]);

  const setChatId = useChatSessionStore((s) => s.setChatId);
  const selectedVoiceURI = useChatSessionStore((s) => s.selectedVoiceURI);
  const setVoiceURI = useChatSessionStore((s) => s.setVoiceURI);

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

  function setSelectedVoice(selectedVoice: string) {
    setVoiceURI(selectedVoice);
  }

  // ALL useCallback ARE BEING PASED INTO MEMOISED COMPONENT
  const translate = useCallback(async (text: string, index: number) => {
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
  }, []);

  const handleCopy = useCallback((text: string) => {
    navigator.clipboard.writeText(text);
    toast("Copied to clipboard", {
      description: "Text has been copied to your clipboard.",
      position: "top-right",
    });
  }, []);

  const playAudio = useCallback(
    (text: string) => {
      if (!("speechSynthesis" in window)) return;
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);

      const voiceURI = useChatSessionStore.getState().selectedVoiceURI;
      const voice =
        voiceList.find((voice) => voice.voiceURI === voiceURI) || null;
      if (voice) {
        utterance.voice = voice;
        utterance.lang = voice.lang || languageSourceCode;
      } else {
        utterance.lang = languageSourceCode;
      }
      window.speechSynthesis.speak(utterance);
    },
    [selectedVoiceURI, voiceList],
  );

  function recordMessage(
    textMessageRef: RefObject<HTMLTextAreaElement | null>,
  ) {
    const recognition = recognitionRef.current as SpeechRecognition;
    recognition.lang = languageSourceCode;
    recognition.continuous = true;
    recognition.start();
    recognition.onresult = async function (event) {
      const transcript = event.results[event.results.length - 1][0].transcript;
      (textMessageRef.current as HTMLTextAreaElement).value += " " + transcript;
    };
  }

  useEffect(() => {
    const handleVoicesChanged = () => {
      const voices = window.speechSynthesis.getVoices();
      setVoiceList(
        voices.filter((v) => v.lang.startsWith(`${languageSourceCode}-`)),
      );
      if (!selectedVoiceURI) setVoiceURI(voices[0].voiceURI); // if no voice selected previously, default is first option
    };

    // Run once
    handleVoicesChanged();

    // Run again when voices finish loading
    window.speechSynthesis.onvoiceschanged = handleVoicesChanged;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

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
    playAudio,
    sendMessage,
    recordMessage,
    restartConversation,
    voiceList,
    setSelectedVoice,
    selectedVoiceURI,
  };
}
