"use client"

import Navigation from "@/components/app_layout/Navigation";
import { useRouter } from "next/navigation";
import LanguageSessionForm from "@/components/conversation_page/LanguageSessionForm";
import { user_sessions } from "@/dummy_data";
import LanguageSessionCard from "@/components/conversation_page/LanguageSessionCard";

export default function Conversation() {
  const router = useRouter()
    return (
      <div className="h-screen flex flex-col w-full bg-background">
          <Navigation page="Conversation"/>
          <div className="w-full h-full flex">
              <div className="bg-green-700 h-full w-2/3">
                {user_sessions.map(session => (
                  <LanguageSessionCard key={session.session_id} />
                ))}
              </div>

              <div className="bg-teal-700 h-full w-1/3 flex justify-center items-center">
                  <LanguageSessionForm />
              </div>
          </div>
      </div>
    )
}