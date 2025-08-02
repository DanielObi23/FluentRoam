import { create } from "zustand";

type TranscriptStore = {
    transcript: string;
    updateTranscript: (arg0: string) => void;
}

export const useTranscriptStore = create<TranscriptStore>((set) => ({
    transcript: "",
    updateTranscript: (text) => {
        set({transcript: text})
    }    
}))

export const useTranscript = useTranscriptStore((state) => state.updateTranscript)

