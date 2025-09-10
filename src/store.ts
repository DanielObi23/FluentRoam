import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Conversation } from "./hooks/use-conversationMessage";

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
    }),
    {
      name: "call-session-storage",
    },
  ),
);
