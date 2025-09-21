import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Conversation } from "./hooks/use-callTranscript";

export enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

type CallSessionStore = {
  captionIsOn: boolean;
  updateCaptionIsOn: () => void;
  transcript: string;
  updateTranscript: (text: string) => void;
  messages: Conversation[];
  updateMessages: (message: Conversation[]) => void;
  callStatus: CallStatus;
  updateCallStatus: (status: CallStatus) => void;
  clock: string;
  updateClock: (time: string) => void;
  callId: string;
  updateCallId: (text: string) => void;
};

export const useCallSessionStore = create<CallSessionStore>()(
  persist(
    (set, get) => ({
      captionIsOn: true,
      updateCaptionIsOn: () => {
        set((state) => ({
          captionIsOn: !state.captionIsOn,
        }));
      },
      transcript: "",
      updateTranscript: (text) => {
        set({ transcript: text });
      },
      messages: [],
      updateMessages: (message) => {
        set({ messages: message });
      },
      callStatus: CallStatus.INACTIVE,
      updateCallStatus: (status) => {
        set({ callStatus: status });
      },
      clock: "00:00",
      updateClock: (time) => {
        set({ clock: time });
      },
      callId: "",
      updateCallId: (id) => {
        set({ callId: id });
      },
    }),
    {
      name: "call-session-storage",
    },
  ),
);

interface ChatMessage {
  role: "user" | "assistant";
  text: string;
  translation?: string;
}

type ChatSessionStore = {
  chatId: string;
  setChatId: (id: string) => void;
  messages: ChatMessage[];
  setMessages: (message: ChatMessage[]) => void;
  addMessage: (message: ChatMessage) => void;
};

export const useChatSessionStore = create<ChatSessionStore>()(
  persist(
    (set, get) => ({
      chatId: "",
      setChatId: (id) => {
        set({ chatId: id });
      },
      messages: [],
      setMessages: (message) => {
        set({ messages: message });
      },
      addMessage: (message) => {
        set((state) => ({ messages: [...state.messages, message] }));
      },
    }),
    {
      name: "chat-session-storage",
    },
  ),
);

type PlayAudioStore = {
  selectedVoiceURI: string;
  setVoiceURI: (voice: string) => void;
};

export const usePlayAudioStore = create<PlayAudioStore>()(
  persist(
    (set, get) => ({
      selectedVoiceURI: "",
      setVoiceURI: (voice) => {
        set({ selectedVoiceURI: voice });
      },
    }),
    {
      name: "play-audio-storage",
    },
  ),
);
