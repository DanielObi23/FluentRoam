import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import defaultProfile from "../../../../public/default_profile.jpg";
import fluentroam from "../../../../public/logo/fluentroam.jpg";
import { Button } from "@/components/ui/button";
import { Volume2, Copy } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { toast } from "sonner";
import { memo } from "react";

interface ChatMessage {
  role: "user" | "assistant";
  text: string;
  loading: boolean;
  translation?: string;
}

function ChatTranscriptMessage({
  message,
  index,
  messages,
  setMessages,
}: {
  message: ChatMessage;
  index: number;
  messages: ChatMessage[];
  setMessages: (text: ChatMessage[]) => void;
}) {
  const { user } = useUser();
  const isAssistant = message.role === "assistant";
  const languageSourceCode = "es";
  const languageTargetCode = "en";

  const playAudio = (text: string, language: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      //utterance.getVoices();
      utterance.lang = "es-MX";
      speechSynthesis.speak(utterance);
    }
  };

  // function populateVoiceList() {
  //   if (typeof speechSynthesis === "undefined") {
  //     return;
  //   }

  //   const voices = speechSynthesis.getVoices();

  //   for (const voice of voices) {
  //     const option = document.createElement("option");
  //     option.textContent = `${voice.name} (${voice.lang})`;

  //     if (voice.default) {
  //       option.textContent += " — DEFAULT";
  //     }

  //     option.setAttribute("data-lang", voice.lang);
  //     option.setAttribute("data-name", voice.name);
  //     document.getElementById("voiceSelect").appendChild(option);
  //   }
  // }

  // populateVoiceList();

  // if (
  //   typeof speechSynthesis !== "undefined" &&
  //   speechSynthesis.onvoiceschanged !== undefined
  // ) {
  //   speechSynthesis.onvoiceschanged = populateVoiceList;
  // }

  async function translate(text: string, index: number) {
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
    });
  };

  return (
    <div
      key={index}
      className={cn(
        isAssistant ? "justify-start self-start" : "justify-end self-end",
        "flex w-8/9 flex-col gap-x-0.5 md:w-5/7",
      )}
    >
      <div
        className={cn(
          isAssistant ? "justify-start" : "justify-end",
          "flex w-full gap-2",
        )}
      >
        <div
          className={cn(
            isAssistant
              ? "order-2 rounded-tl-3xl rounded-tr-3xl rounded-br-3xl bg-blue-600 text-white"
              : "rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl bg-teal-600 text-white",
            "font-content w-6/7 space-y-2.5 px-4 py-3 text-pretty",
          )}
        >
          <p>{message.text}</p>
          {message.translation && (
            <p className="text-foreground w-full rounded-tl-xl rounded-tr-xl rounded-br-xl rounded-bl-xl bg-gray-600/40 px-4 py-3 text-pretty">
              {message.translation}
            </p>
          )}
        </div>

        <Avatar className={cn(isAssistant ? "self-end" : "self-end", "")}>
          <AvatarImage
            src={
              isAssistant
                ? fluentroam.src
                : (user?.imageUrl ?? defaultProfile.src)
            }
            className="object-cover"
          />
          <AvatarFallback>{isAssistant ? "AI" : "YOU"}</AvatarFallback>
        </Avatar>
      </div>

      {/* Message Buttons */}
      <div
        className={cn(
          isAssistant ? "ml-9 self-start" : "mr-9 self-end",
          "mt-1.5 flex items-center gap-2",
        )}
      >
        {!message.translation && (
          <Button
            variant="outline"
            onClick={() => translate(message.text, index)}
          >
            Translate
          </Button>
        )}
        <Button
          variant={"outline"}
          size="icon"
          onClick={() => playAudio(message.text, languageSourceCode)}
        >
          <Volume2 />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() => handleCopy(message.text)}
        >
          <Copy />
        </Button>
      </div>
    </div>
  );
}

export default memo(ChatTranscriptMessage);
