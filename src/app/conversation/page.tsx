"use client";

import ConversationForms from "@/components/conversation_page/forms/ConversationForms";
import SessionsTable from "@/components/conversation_page/SessionsTable";
import Main from "@/components/tags/Main";
import { useCallSessionStore, useChatSessionStore } from "@/store";
import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    useCallSessionStore.getState().reset();
    useChatSessionStore.getState().reset();
  }, []);

  return (
    <Main page="Conversation" className="flex items-start gap-4">
      <section
        aria-labelledby="Conversation histroy list"
        className="h-full w-full px-8 py-6 md:w-3/5 md:px-10 md:py-8"
      >
        <SessionsTable />
      </section>

      <section
        aria-labelledby="Create conversation form"
        className="scrollbar-hover hidden h-full overflow-auto md:flex md:w-2/5"
      >
        <div className="mx-auto w-[25rem]">
          <ConversationForms />
        </div>
      </section>
    </Main>
  );
}
