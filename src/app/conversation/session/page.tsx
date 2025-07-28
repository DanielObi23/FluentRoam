"use client"
//TODO: check max token, as well as speed of speaking and gender change, page reload when mid conversation. 
// add speed and duration to type Session later, check out the searchParams
import Navigation from "@/components/app_layout/Navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import portrait from "../../../../public/spanish/male_spanish.jpeg"
import defaultProfile from "../../../../public/default_profile.jpg"
import {useRouter} from "next/navigation"

import {Mic, RotateCcw} from "lucide-react"
import { useUser } from "@clerk/nextjs";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {vapi} from "@/lib/vapi.sdk"
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { callTranscript } from "@/dummy_data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { translateText, TranslateText } from "@/lib/deepl";
import { SourceLanguageCode, TargetLanguageCode } from 'deepl-node';

type Role = "assistant" | "user"

type Message = {
    type: string;
    transcript: string;
    role: Role;
    transcriptType: "partial" | "final";
    input?: string;
    translation?: string
};

type Session = {
    scenario: string;
    formality: "casual" | "formal";
    response_length: "brief" | "detailed";
    proficiency: "A1" | "A2" | "B1" | "B2";
    gender: "male" | "female";
    duration: number;
    speed: number
}

export default function Session() {
    const search = useSearchParams();
    const router = useRouter()
    const { user } = useUser()
    const callId = useRef("")
    const [messages, setMessages] = useState<Message[]>([]);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isMuted, setIsMuted] = useState(false);


    const char = "male"
    const gender = char === "male"? 'e3fbfb66-b32e-4c74-b456-c6ea5fb15663' : ""
    // const voiceId = char === "male" ? "burt" : "emma"; 
    //const scrollToMessage = useRef<HTMLDivElement>(null)
    

    const session: Session = {
        scenario: search.get("scenario") ?? "",
        gender: (search.get("gender") ?? "male") as "male" | "female",
        formality: (search.get("formality") ?? "casual") as "casual" | "formal",
        response_length: (search.get("response_length") ?? "brief") as "brief" | "detailed",
        proficiency: (search.get("proficiency") ?? "B1") as "A1" | "A2" | "B1" | "B2",
        duration: Number(search.get("duration") ?? 20),
        speed: Number(search.get("speed") ?? 1),
    };

    const assistantOverrides = {
        recordingEnabled: true,
        variableValues: {
            first_message: `Hello ${user?.firstName}, what scenario would you like to start`,
            scenario: session.scenario,
            formality: session.formality,
            response_length: session.response_length,
            proficiency: session.proficiency
        },
        // voice: {
        //     provider: "11labs",
        //     voiceId: voiceId,
        //     stability: 0.4,
        //     similarityBoost: 0.8,
        //     style: 0.5,
        //     useSpeakerBoost: true,
        //     model: "eleven_multilingual_v2"
        // }
    };

    function onMessage(message: Message) {
        if (message.type === "voice-input" || 
            message.type === "transcript" && message.role === "user" && message.transcriptType === "final") {
            setMessages(prevMessages => {
                if (prevMessages.length === 0) {
                    if (message.type === "voice-input") {
                        const newMessage = {
                            type: "voice-input",
                            transcript: message.input ?? "",
                            role: "assistant" as const,
                            transcriptType: "final" as const
                        }
                        return [newMessage];  
                    }
                    return [message];
                }
                
                const lastMessage = prevMessages[prevMessages.length - 1];
                if (message.type === "voice-input") {
                    if (lastMessage.role === "assistant") {
                        const concatenatedText = lastMessage.transcript + " " + message.input
                        const newMessage = {
                            type: "voice-input",
                            transcript: concatenatedText,
                            role: "assistant" as const,
                            transcriptType: "final" as const
                        }
                        return [...prevMessages.slice(0, -1), newMessage];  
                    }

                    const newMessage = {
                        type: "voice-input",
                        transcript: message.input ?? "",
                        role: "assistant" as const,
                        transcriptType: "final" as const
                    }
                    return [...prevMessages, newMessage];                
                    
                } else if (lastMessage.role === "user" && message.role === "user") {
                    const concatenatedText = lastMessage.transcript.length > 0? lastMessage.transcript + " " + message.transcript : message.transcript;                    
                    const newUserMessage = {
                        type: message.type,
                        transcript: concatenatedText,
                        role: message.role,
                        transcriptType: message.transcriptType
                    };
                    
                    return [...prevMessages.slice(0, -1), newUserMessage];
                    
                } else {
                    if (message.type === "voice-input") {
                        const newMessage = {
                            type: "voice-input",
                            transcript: message.input ?? "",
                            role: "assistant" as const,
                            transcriptType: "final" as const
                        }
                        return [...prevMessages, newMessage]; 
                    }
                    return [...prevMessages, message];
                }
            });
            // if (scrollToMessage.current) {
            //     scrollToMessage.current.scrollIntoView({ behavior: "smooth" });
            // }
        }
    }

    function onError(error: Error) {
        console.log("Error", error)
    }

    function onCallStart() {
        console.log("call-Started")
    }

    function onCallEnd() {
        console.log("call ended")
    }

    function onSpeechStart() {
        setIsSpeaking(true)
        console.log("speech started")
    }

    function onSpeechEnd() {
        setIsSpeaking(false)
        console.log("speech ended")
    }

    async function translate(text: string, role: Role, index: number, type: string) {
        const targetLanguageCode = "en-GB" as TargetLanguageCode
        const sourceLanguageCode = "es" as SourceLanguageCode
        const result = await translateText({text, sourceLanguageCode, targetLanguageCode} as TranslateText);
        console.log(result)
        setMessages(prevMessages => {
            const translation: Message = {
                type,
                transcript: result,
                role,
                transcriptType: "final",
                translation: result
            }

            return [...prevMessages.slice(0, index), translation, ...prevMessages.slice(index + 1)]
        })
    }

    useEffect(() => {
        // if(!user) {
        //     router.replace('/sign-in')
        //     return
        // }

        if(!session.scenario) {
            toast("Event has been created")
            router.replace("/conversation")
            return
        }

        vapi.start(gender, assistantOverrides).then(call => {
            callId.current = call?.id || ""  //Adding call-id so it can be added to database and user can reference it for later
        });  

        vapi.on('call-start', onCallStart);
        vapi.on('call-end', onCallEnd);
        vapi.on('message', onMessage);
        vapi.on('error', onError);
        vapi.on('speech-start', onSpeechStart);
        vapi.on('speech-end', onSpeechEnd);

        return () => {
            vapi.off('call-start', onCallStart);
            vapi.off('call-end', onCallEnd);
            vapi.off('message', onMessage);
            vapi.off('error', onError);
            vapi.off('speech-start', onSpeechStart);
            vapi.off('speech-end', onSpeechEnd);
        }

    }, [])
 

    function endConversation() {
        vapi.stop()
        //router.replace("/conversation")
    }

    return (
        <div className="h-screen flex flex-col w-full bg-background">
            <Navigation page="Conversation"/>
            <main className="w-full flex h-full gap-5 p-4">
                {/* Left Panel */}
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
                    <Button variant="destructive" className="w-full py-3" onClick={endConversation}>
                        End Lesson
                    </Button>
                </div>

                {/* Right Panel - Transcript (Image 1) */}
                <div className="w-2/3 bg-card rounded-lg flex flex-col">
                    <div className="p-4 border-b">
                        <h2 className="text-xl font-semibold">Call Transcript</h2>
                    </div>

                    {/* 4. render the live transcript */}
                    <div className="flex flex-col p-4 gap-3 bg-red-200 overflow-y-scroll hide-scrollbar">
                        {messages?.map((m, i) => (
                            <div key={i} className={cn(m.role === "assistant"? 
                                "self-start justify-start" : 
                                "self-end justify-end", 
                                "w-5/7 flex gap-x-0.5")} 
                                onDoubleClick={
                                    m.role === "assistant"
                                        ? () => translate(m.transcript, m.role as Role, i, m.type)
                                        : undefined
                                }>
                                <div className={cn(m.role === "assistant"? "order-2 items-start" : "items-end", "w-full flex flex-col")}>
                                    <Button 
                                        variant={"outline"} 
                                        className={cn(m.role === "assistant"? "ml-3" : "mr-3" , "mb-1", m.translation && "hidden")}
                                        onClick={() => translate(m.transcript, m.role as Role, i, m.type)}>
                                            Translate
                                    </Button>
                                    <div className={cn(m.role === "assistant"? 
                                            "text-foreground bg-blue-600 rounded-tr-3xl rounded-br-3xl rounded-tl-3xl" : 
                                            "text-foreground bg-teal-600 rounded-tl-3xl rounded-bl-3xl rounded-tr-3xl", 
                                            "w-6/7 font-content text-pretty py-3 px-4 space-y-2.5")}>
                                        <p>{m.transcript}</p>
                                        {m.translation && 
                                        <p className="text-foreground bg-gray-600/40 w-full text-pretty py-3 px-4 rounded-tr-xl rounded-br-xl rounded-tl-xl rounded-bl-xl">
                                            {m.translation}
                                        </p>}
                                    </div>
                                </div>
                                <Avatar className={cn(m.role === "assistant"? "self-end order-1" : "self-end", "")}>
                                    <AvatarImage src={m.role === "assistant"? portrait.src : user?.imageUrl || defaultProfile.src} />
                                    <AvatarFallback>YOU</AvatarFallback>
                                </Avatar>
                            </div>
                        ))}
                    </div>
                </div>

            </main>
        </div>
    )
}