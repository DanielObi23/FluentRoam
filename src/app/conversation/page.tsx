"use client"

import Navigation from "@/components/Navigation";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Conversation() {
  const router = useRouter()
    return (
      <div className="h-screen flex flex-col w-full bg-background">
        <Navigation page="Conversation"/>
        <Button onClick={() => router.push("/conversation/form")}>
          Create Session
        </Button>
      </div>
    )
}