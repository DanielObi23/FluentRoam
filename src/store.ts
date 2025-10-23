import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { Conversation } from "./hooks/conversation/use-callTranscript";

/* ---------- CALL CONVERSATION ---------- */
export enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

const initialCallState = {
  captionIsOn: true,
  transcript: "",
  messages: [] as Conversation[],
  callStatus: CallStatus.INACTIVE,
  clock: "00:00",
  callId: "",
};

type CallSessionStore = typeof initialCallState & {
  updateCaptionIsOn: () => void;
  updateTranscript: (text: string) => void;
  updateMessages: (messages: Conversation[]) => void;
  updateCallStatus: (status: CallStatus) => void;
  updateClock: (time: string) => void;
  updateCallId: (id: string) => void;
  reset: () => void; // <-- new
};

export const useCallSessionStore = create<CallSessionStore>()(
  devtools(
    persist(
      (set) => ({
        ...initialCallState,

        updateCaptionIsOn: () => set((s) => ({ captionIsOn: !s.captionIsOn })),

        updateTranscript: (text) => set({ transcript: text }),

        updateMessages: (messages) => set({ messages }),

        updateCallStatus: (status) => set({ callStatus: status }),

        updateClock: (time) => set({ clock: time }),

        updateCallId: (id) => set({ callId: id }),

        reset: () => set(initialCallState, false, "reset"),
      }),
      { name: "call-session-storage" },
    ),
  ),
);

/* ---------- CHAT CONVERSATION ---------- */
interface ChatMessage {
  role: "user" | "assistant";
  text: string;
  translation?: string;
}

const initialChatState = {
  chatId: "",
  messages: [] as ChatMessage[],
  isEnded: false,
};

type ChatSessionStore = typeof initialChatState & {
  setChatId: (id: string) => void;
  setMessages: (messages: ChatMessage[]) => void;
  addMessage: (message: ChatMessage) => void;
  setIsEnded: (bool: boolean) => void;
  reset: () => void;
};

export const useChatSessionStore = create<ChatSessionStore>()(
  devtools(
    persist(
      (set) => ({
        ...initialChatState,

        setChatId: (id) => set({ chatId: id }),

        setMessages: (messages) => set({ messages }),

        addMessage: (message) =>
          set((state) => ({ messages: [...state.messages, message] })),

        setIsEnded: (bool) => set({ isEnded: bool }),
        reset: () => set(initialChatState, false, "reset"),
      }),
      { name: "chat-session-storage" },
    ),
  ),
);

/* ---------- AUDIO ---------- */
type PlayAudioStore = {
  selectedVoiceURI: string;
  setVoiceURI: (voice: string) => void;
};

export const usePlayAudioStore = create<PlayAudioStore>()(
  persist(
    (set) => ({
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
