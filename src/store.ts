import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Conversation } from "./components/conversation_page/call/CallTranscript";

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

type BearStore = {
  bears: number;
  addABear: () => void;
};

export const useBearStore = create<BearStore>()(
  persist(
    (set, get) => ({
      bears: 0,
      addABear: () => set({ bears: get().bears + 1 }),
    }),
    {
      name: "food-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  ),
);
