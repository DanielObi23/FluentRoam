"use client"

import Navigation from "@/components/app_layout/Navigation";
import CallSessionForm from "@/components/conversation_page/forms/CallSessionForm";
import ChatSessionForm from "@/components/conversation_page/forms/ChatSessionForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Page() {
    return (
        <div className="h-screen flex flex-col w-full bg-background">
          <Navigation page="Conversation"/>
          <main className="w-full h-full flex justify-center items-center">    
            <Tabs defaultValue="call" className="w-[400px]">
                <TabsList>
                    <TabsTrigger value="call">Call</TabsTrigger>
                    <TabsTrigger value="chat">Chat</TabsTrigger>
                </TabsList>
                <TabsContent value="call"><CallSessionForm /></TabsContent>
                <TabsContent value="chat"><ChatSessionForm /></TabsContent>
            </Tabs>
          </main>
      </div>
    )
}