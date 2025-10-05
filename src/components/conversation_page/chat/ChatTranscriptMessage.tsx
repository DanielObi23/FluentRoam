import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import defaultProfile from "@/assets/default_profile.jpg";
import fluentroam from "@/assets/logo/fluentroam.jpg";
import { Button } from "@/components/ui/button";
import { Volume2, Copy } from "lucide-react";
import { memo } from "react";

interface ChatMessage {
  role: "user" | "assistant";
  text: string;
  translation?: string;
}

function ChatTranscriptMessage({
  message,
  index,
  playAudio,
  userImage,
  handleCopy,
  translate,
}: {
  message: ChatMessage;
  index: number;
  playAudio: (text: string) => void;
  userImage: string | undefined;
  handleCopy: (text: string) => void;
  translate: (text: string, index: number) => void;
}) {
  const isAssistant = message.role === "assistant";

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
            <p className="w-full rounded-tl-xl rounded-tr-xl rounded-br-xl rounded-bl-xl bg-gray-600/40 px-4 py-3 text-pretty text-gray-200">
              {message.translation}
            </p>
          )}
        </div>

        <Avatar className={cn(isAssistant ? "self-end" : "self-end", "")}>
          <AvatarImage
            src={
              isAssistant ? fluentroam.src : (userImage ?? defaultProfile.src)
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
          onClick={() => playAudio(message.text)}
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
