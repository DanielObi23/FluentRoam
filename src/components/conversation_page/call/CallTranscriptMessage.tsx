import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import defaultProfile from "../../../../public/default_profile.jpg";
import fluentroam from "../../../../public/logo/fluentroam.jpg";
import { Conversation } from "@/hooks/use-conversationMessage";
import { memo } from "react";
import { useUser } from "@clerk/nextjs";
import useConversationMessage from "@/hooks/use-conversationMessage";

function CallTranscriptMessage({
  message,
  index,
}: {
  message: Conversation;
  index: number;
}) {
  const { user } = useUser();
  const { translate } = useConversationMessage();
  const isAssistant = message.role === "assistant";

  return (
    <div
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
              ? "text-foreground order-2 rounded-tl-3xl rounded-tr-3xl rounded-br-3xl bg-blue-600"
              : "text-foreground rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl bg-teal-600",
            "font-content w-6/7 space-y-2.5 px-4 py-3 text-pretty",
          )}
        >
          <p>{message.transcript}</p>
          {message.translation && (
            <p className="text-foreground w-full rounded-xl bg-gray-600/40 px-4 py-3 text-pretty">
              {message.translation}
            </p>
          )}
        </div>

        <Avatar className="self-end">
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

      {!message.translation && (
        <Button
          variant="outline"
          className={cn(
            isAssistant ? "ml-9 self-start" : "mr-9 self-end",
            "mt-1",
          )}
          onClick={() => translate(message.transcript, index)}
        >
          Translate
        </Button>
      )}
    </div>
  );
}

export default memo(CallTranscriptMessage);
