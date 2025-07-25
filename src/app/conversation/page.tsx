"use client"
//TODO: add visual cues for scroll bar as there is none

import Navigation from "@/components/app_layout/Navigation";
import { useRouter } from "next/navigation";
import LanguageSessionForm from "@/components/conversation_page/LanguageSessionForm";
import { user_sessions } from "@/dummy_data";
import LanguageSessionCard from "@/components/conversation_page/LanguageSessionCard";
import { Input } from "@/components/ui/input";

export default function Conversation() {
  const router = useRouter()
    return (
      <div className="h-screen flex flex-col w-full bg-background">
          <Navigation page="Conversation"/>
          <main className="w-full h-full flex bg-linear-to-br from-bg-primary-400 to-primary-800">
            <section className="h-full w-2/3 grid grid-cols-12 gap-3 p-3 overflow-y-scroll hide-scrollbar">
              <Input className="col-span-12 border-primary-400"/>
              {user_sessions.map(session => (
                <LanguageSessionCard 
                  key={session.session_id} 
                  title={session.title}
                  description={session.description}
                  duration={(session.duration/60)}
                  proficiency={session.proficiency_level}
                  formality={session.formality}
                  scenario={session.role_scenario}
                  />
              ))}
            </section>

            <section className="h-full w-1/3 flex justify-center items-center">
                <LanguageSessionForm />
            </section>
          </main>
      </div>
    )
}