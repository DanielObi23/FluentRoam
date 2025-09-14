"use client";

import ConversationForms from "@/components/conversation_page/forms/ConversationForms";
import SessionsTable from "@/components/conversation_page/SessionsTable";
import Main from "@/components/tags/Main";
import { useChatSessionStore } from "@/store";
import { useEffect } from "react";

//TODO: use react query to query first 50 pages, then cache it
// maybe empty out messages in call and chat session, to free up storage
export default function Page() {
  //clear chat storage
  const setMessages = useChatSessionStore((s) => s.setMessages);
  const setChatId = useChatSessionStore((s) => s.setChatId);

  useEffect(() => {
    setMessages([]);
    setChatId("");
  }, []);

  return (
    <Main page="Conversation" className="flex gap-4">
      <section
        aria-labelledby="Conversation histroy list"
        className="m-auto px-8 py-6 md:w-3/5 md:px-10 md:py-8"
      >
        <SessionsTable />
      </section>

      <section
        aria-labelledby="Create conversation form"
        className="hidden md:flex md:w-2/5"
      >
        <ConversationForms />
      </section>
    </Main>
  );
}
