"use client"
//TODO: add visual cues for scroll bar as there is none
// fix UI for when phone is tilted, and form for when tablet and phone is tilted

import Navigation from "@/components/app_layout/Navigation";
import { useRouter } from "next/navigation";
import LanguageSessionForm from "@/components/conversation_page/LanguageSessionForm";
import { userSessions } from "@/dummy_data";
import LanguageSessionCard from "@/components/conversation_page/LanguageSessionCard";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogDescription} from "@/components/ui/dialog"

export default function Conversation() {
  const router = useRouter()
    return (
      <div className="h-screen flex flex-col w-full bg-background">
          <Navigation page="Conversation"/>
          <main className="w-full h-full flex bg-red-600">
            <section className="h-full w-full md:w-3/5 grid grid-cols-12 grid-rows-12 gap-3 p-3 overflow-y-scroll hide-scrollbar bg-blue-900">
              <div className="col-span-12 grid grid-cols-12 bg-green-900 row-span-1">
                <Input className="col-span-8 border-primary-400 md:col-span-12"/>
                <div className="col-span-4 justify-self-end md:hidden">
                  <Dialog>
                    <DialogTrigger className="bg-green-800 button">Start Session</DialogTrigger>
                    <DialogContent className="flex items-center justify-center h-[calc(100vh-20px)]">
                      <DialogTitle className="hidden">Create Session Form</DialogTitle>
                      <DialogDescription className="hidden">
                        This action is to create a language form
                      </DialogDescription>
                      <LanguageSessionForm />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              <div className="grid grid-cols-12 col-span-12 row-span-11 gap-3 overflow-y-scroll bg-red-700">
                {userSessions.map(session => (
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
              </div>
            </section>

            <section className="h-full w-2/5 md:flex justify-center items-center hidden">
                <LanguageSessionForm />
            </section>
          </main>
      </div>
    )
}