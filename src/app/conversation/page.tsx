"use client";
//TODO: use react query to query first 50 pages, then cache it
// fix UI for when phone is tilted, and form for when tablet and phone is tilted

import Navigation from "@/components/app_layout/Navigation";
import ConversationForms from "@/components/conversation_page/forms/ConversationForms";
import SessionsTable from "@/components/conversation_page/SessionsTable";

export default function Page() {
  return (
    <div className="bg-background flex h-screen w-full flex-col">
      <Navigation page="Conversation" />
      <main className="main">
        <section className="flex h-full w-full flex-col items-center justify-center gap-7 px-8 py-6 md:w-3/5 md:px-10 md:py-8">
          <SessionsTable />
        </section>

        <section className="hidden h-full items-center justify-center md:flex md:w-2/5">
          <ConversationForms />
        </section>
      </main>
    </div>
  );
}
