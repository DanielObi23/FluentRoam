import { create } from "zustand";

type CallSessionStore = {
  captionIsOn: boolean;
  updateCaptionIsOn: () => void;
};

export const useCallSessionStore = create<CallSessionStore>((set) => ({
  captionIsOn: true,
  updateCaptionIsOn: () => {
    set((state) => ({
      captionIsOn: !state.captionIsOn,
    }));
  },
}));
