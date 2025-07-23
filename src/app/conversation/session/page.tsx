"use client"

import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import Vapi from '@vapi-ai/web';
import Image from "next/image";
import portrait from "../../../../public/spanish/male_spanish.jpeg"
import defaultProfile from "../../../../public/default_profile.jpg"
import {useRouter} from "next/navigation"

import {Mic, RotateCcw} from "lucide-react"
import { useUser } from "@clerk/nextjs";

export default function Session() {
    const vapi = new Vapi('48c46a80-d52f-482f-91ae-6c8fbeb10b00');
    const { user } = useUser()
    const router = useRouter()
    {/* <Button className="cursor-pointer mr-5 bg-background" onClick={() => vapi.start('e3fbfb66-b32e-4c74-b456-c6ea5fb15663')}>
                <span className="text-foreground">Start convo</span>
            </Button>
            <Button className="cursor-pointer" onClick={() => vapi.stop()}>
                End convo
            </Button> */}
    return (
        <div className="h-screen flex flex-col w-full bg-background">
            <Navigation page="Conversation"/>
            <main className="w-full flex flex-1 gap-5 p-4">
            {/* Left Panel - Controls (Image 2) */}
            <div className="w-1/3 flex flex-col gap-4">
                {/* AI Persona Card */}
                <div className="bg-card rounded-lg p-6 flex flex-col items-center justify-center gap-7 h-6/7">
                    <div className="self-start flex flex-col items-center justify-center">
                        <Image
                            src={portrait} 
                            alt="Anna portrait" 
                            className="w-40 h-40 rounded-lg object-cover"
                        />
                        <h3 className="text-xl font-semibold">José</h3>
                    </div>
                    <div className="self-end flex flex-col items-center justify-center">
                        <Image
                            src={user?.imageUrl || defaultProfile} 
                            alt={`${user?.firstName} portrait`} 
                            width={40}
                            height={40}
                            className="w-40 h-40 rounded-lg object-cover"
                        />
                        <h3 className="text-xl font-semibold">{user?.firstName || "user"}</h3>
                    </div>
                </div>
                
                {/* Control Buttons */}
                <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="flex flex-col gap-2 h-16">
                        <Mic className="w-5 h-5" />
                        <span className="text-sm">Turn off mic</span>
                    </Button>
                    <Button variant="outline" className="flex flex-col gap-2 h-16">
                        <RotateCcw className="w-5 h-5" />
                        <span className="text-sm">Repeat</span>
                    </Button>
                </div>
                
                {/* End Lesson Button */}
                <Button variant="destructive" className="w-full py-3" onClick={()=>router.replace("/conversation")}>
                    End Lesson
                </Button>
            </div>

            {/* Right Panel - Transcript (Image 1) */}
            <div className="w-2/3 bg-card rounded-lg flex flex-col">
                {/* Header */}
                <div className="p-4 border-b">
                    <h2 className="text-xl font-semibold">Call Transcript</h2>
                </div>
                
                {/* Messages */}
                <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                    {/* Assistant Message */}
                    <div className="space-y-2">
                        <div className="text-sm text-accent font-medium">Assistant</div>
                        <div className="text-muted-foreground">
                        Hello. What topic would you like to practice today?
                        </div>
                    </div>
                    
                    {/* User Message */}
                    <div className="space-y-2">
                        <div className="text-sm text-primary font-medium">You</div>
                        <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                        Gustaría hablar de las reglas de las mujeres durante...
                        </div>
                    </div>
                    
                    {/* Assistant Response */}
                    <div className="space-y-2">
                        <div className="text-sm text-accent font-medium">Assistant</div>
                        <div className="text-muted-foreground">
                        Claro que sí, La dictadura de Franco fue un período...
                        </div>
                    </div>
                    </div>
                    
                    {/* Voice Indicator */}
                    <div className="p-4 flex justify-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                        <Mic className="w-6 h-6 text-white" />
                    </div>
                </div>
            </div>
            </main>
        </div>
    )
}