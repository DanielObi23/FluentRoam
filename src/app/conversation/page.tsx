"use client"
//TODO: use react query to query first 50 pages, then cache it
// fix UI for when phone is tilted, and form for when tablet and phone is tilted

import Navigation from "@/components/app_layout/Navigation";
import LanguageSessionForm from "@/components/conversation_page/LanguageSessionForm";
import SessionsTable from "@/components/conversation_page/SessionsTable";


export default function Conversation() {
    return (
      <div className="h-screen flex flex-col w-full bg-background">
          <Navigation page="Conversation"/>
          <main className="w-full h-full flex">    

            <section className="h-full w-full md:w-3/5 px-8 md:px-10 py-6 md:py-8 flex flex-col items-center justify-center gap-7">
              <SessionsTable/>
            </section>

            <section className="h-full md:w-2/5 md:flex justify-center items-center hidden">
                <LanguageSessionForm />
            </section>
            
          </main>
      </div>
    )
}