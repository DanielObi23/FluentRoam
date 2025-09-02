"use client";
//TODO: use react query to query first 50 pages, then cache it
// fix UI for when phone is tilted, and form for when tablet and phone is tilted

import ConversationForms from "@/components/conversation_page/forms/ConversationForms";
import SessionsTable from "@/components/conversation_page/SessionsTable";
import Main from "@/components/tags/Main";

//TODO: fix forms, and change page navigation ui
export default function Page() {
  return (
    <Main page="Conversation">
      <section
        aria-labelledby="Conversation histroy list"
        className="space-y-7 px-8 py-6 md:w-3/5 md:px-10 md:py-8"
      >
        <SessionsTable />
      </section>

      <section
        aria-labelledby="Create conversation form"
        className="hidden h-full items-center justify-center md:flex md:w-2/5"
      >
        <ConversationForms />
      </section>
    </Main>
  );
}
