import { useCallback, useEffect } from "react";
import { vapi } from "@/lib/vapi.sdk";
import { useCallSessionStore } from "@/store";
import axios from "axios";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import { languages } from "@/utils/language";

type UserMessage = {
  type: "transcript";
  transcript: string;
  role: "user";
  transcriptType: "partial" | "final";
  translation?: string;
};

type AssistantMessage = {
  type: "voice-input";
  input: string;
  role: "assistant";
  translation?: string;
};

type Message = UserMessage | AssistantMessage;

export type Conversation = {
  transcript: string;
  role: "user" | "assistant";
  translation?: string;
};

export default function useCallTranscript() {
  const { user } = useUser();
  const messages = useCallSessionStore((state) => state.messages);
  const addMessage = useCallback(
    (transcript: string, role: "assistant" | "user") => {
      const { messages, updateMessages, updateTranscript } =
        useCallSessionStore.getState();
      const lastMessage = messages.at(-1);
      let newMessages;
      let TranscriptMessage = transcript;

      if (!lastMessage) {
        // first message
        newMessages = [{ transcript, role }];
      } else if (lastMessage.role === role) {
        // same role
        if (
          lastMessage.transcript
            .toLowerCase()
            .includes(transcript.toLowerCase())
        )
          // to avoid duplicates
          return;

        TranscriptMessage = `${lastMessage.transcript} ${transcript}`;
        newMessages = [
          ...messages.slice(0, -1),
          { transcript: TranscriptMessage, role },
        ];
      } else {
        // different role
        newMessages = [...messages, { transcript, role }];
      }

      updateTranscript(TranscriptMessage);
      updateMessages(newMessages);
    },
    [], // memoised because being passed into onMessage
  );

  const onMessage = useCallback(
    (message: Message) => {
      if (
        message.type === "voice-input" ||
        (message.type === "transcript" &&
          message.role === "user" &&
          message.transcriptType === "final")
      ) {
        if (message.type === "voice-input") {
          addMessage(message.input, "assistant");
          return;
        }

        addMessage(message.transcript, "user");
      }
    },
    [addMessage],
  );

  const translate = useCallback(async (text: string, index: number) => {
    const { messages, updateMessages } = useCallSessionStore.getState();
    try {
      const response = await axios.post("/api/translate", {
        text,
        from: languages.targetLanguage.code,
        to: languages.userLanguage.code,
      });

      const translation = response.data.message;

      const newMsgs = [...messages];
      newMsgs[index] = { ...newMsgs[index], translation };
      updateMessages(newMsgs);
    } catch (err) {
      toast.error("Error translating text, please try again.", {
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
  }, []); // being passed into memoised component TranscriptMessages

  useEffect(() => {
    vapi.on("message", onMessage);

    return () => {
      vapi.off("message", onMessage);
    };
  }, [onMessage]);

  return { translate, messages, userImage: user?.imageUrl };
}
