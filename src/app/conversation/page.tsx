"use client";

import ConversationForms from "@/components/conversation_page/forms/ConversationForms";
import SessionsTable from "@/components/conversation_page/SessionsTable";
import Main from "@/components/tags/Main";
import { useCallSessionStore, useChatSessionStore } from "@/store";
import { useEffect } from "react";

//TODO: use react query to query first 50 pages, then cache it
// maybe empty out messages in call and chat session, to free up storage
export default function Page() {
  //clear chat and call storage
  const setMessages = useChatSessionStore((s) => s.setMessages);
  const setChatId = useChatSessionStore((s) => s.setChatId);
  const updateMessages = useCallSessionStore((s) => s.updateMessages);

  useEffect(() => {
    setMessages([]);
    setChatId("");
    updateMessages([]);
  }, []);

  return (
    <Main page="Conversation" className="flex items-start gap-4">
      <section
        aria-labelledby="Conversation histroy list"
        className="w-full px-8 py-6 md:w-3/5 md:px-10 md:py-8"
      >
        <SessionsTable />
      </section>

      <section
        aria-labelledby="Create conversation form"
        className="hidden h-full overflow-auto md:flex md:w-2/5"
      >
        <div className="mx-auto w-[25rem]">
          <ConversationForms />
        </div>
      </section>
    </Main>
  );
}
