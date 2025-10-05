"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import ConversationHistoryTable from "@/components/conversation_page/ConversationHistoryTable";
import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../loading";
import Error from "../error";
import type { UserHistory } from "@/utils/conversationData/types";

export default function ConversationHistory() {
  const isMobile = useIsMobile();
  const [convo, setConvo] = useState<UserHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    async function getHistory() {
      try {
        const result = await axios.post("/api/conversation", {
          pageLimit: isMobile ? 3 : 5,
        });
        setConvo(result.data);
      } catch (err) {
        setHasError(true);
        console.error(err);
      }
      setIsLoading(false);
    }

    getHistory();
  }, [isMobile]);

  if (isLoading) {
    return <Loading />;
  }

  if (hasError) {
    return <Error />;
  }

  return (
    <ConversationHistoryTable
      className="bg-secondary/20 border-secondary/70 border-2 p-3"
      sessionList={convo}
    />
  );
}
