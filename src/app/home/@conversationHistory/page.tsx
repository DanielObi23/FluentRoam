"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { userSessions, UserSession } from "@/userSessions";
import ConversationHistoryTable from "@/components/conversation_page/ConversationHistoryTable";

export default function ConversationHistory() {
  const isMobile = useIsMobile();
  const limit = isMobile ? 3 : 5;
  const sessionList = (userSessions as UserSession[]).slice(-limit);

  return (
    <ConversationHistoryTable
      className="bg-secondary/70 border-secondary/70 border-2 p-3"
      sessionList={sessionList}
    />
  );
}
