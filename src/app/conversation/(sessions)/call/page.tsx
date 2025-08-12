"use client"
//TODO: check max token, as well as speed of speaking and gender change, page reload when mid conversation. 
// add speed and duration to type Session later, check out the searchParams, optimise the number of states in the component, there is too many being rerendered
// handle user refreshing the page or leaving the page to home or other mid convo
// handle user starting this page with missing form data
// update conversations avatar
// find a different way to pass the data besides query parameter
//TODO: stop conversation once the page is left, whether back button or end conversation, if microphone access is denied, add toast
// fix the prompting for the vapi scenario7
// fix UI for when device is tilted: mobile 
// check use-mobile in hooks, then check to use for conditionally rendering which UI
// put vapi assistant id and change vapi web token from next_public in env


import { useEffect, useState } from "react";
import { useRouter, useSearchParams} from "next/navigation"
import { useUser } from "@clerk/nextjs";
import Navigation from "@/components/app_layout/Navigation";
import Call from "@/components/conversation_page/Call";
import CallTranscript from "@/components/conversation_page/CallTranscript";
import {vapi} from "@/lib/vapi.sdk"
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import axios from "axios"
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

enum CallStatus {
    INACTIVE = 'INACTIVE',
    CONNECTING = 'CONNECTING',
    ACTIVE = 'ACTIVE',
    FINISHED = 'FINISHED',
}


export default function Session() {
    const search = useSearchParams();
    const router = useRouter()
    const { user } = useUser()
    const [messages, setMessages] = useState<Message[]>([]);
    const [transcript, setTranscript] = useState("")

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
                        setTranscript(message.input ?? "")
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
                        setTranscript(concatenatedText)
                        return [...prevMessages.slice(0, -1), newMessage];  
                    }

                    const newMessage = {
                        type: "voice-input",
                        transcript: message.input ?? "",
                        role: "assistant" as const,
                        transcriptType: "final" as const
                    }
                    setTranscript(message.input ?? "")
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

    async function translate(text: string, index: number) {
        const response = await axios.post("/api/translate",{
            text,
            from: "it",
            to: "es"
        })

        const translation = response.data

        setMessages(prevMessages => {
            const newMsgs = [...prevMessages];
            newMsgs[index] = { ...newMsgs[index], translation: translation.message };
            return newMsgs;
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

        vapi.on('message', onMessage);
        vapi.on('error', onError);

        return () => {
            vapi.off('message', onMessage);
            vapi.off('error', onError);
        }

    }, [])

    return (
        <div className="h-screen flex flex-col w-full bg-background">
            <Navigation page="Conversation"/>
            {/* DESKTOP VIEW */}
            <main className="w-full h-[calc(100vh-80px)] sm:flex sm:flex-row gap-5 p-4 hidden">
                <Call 
                    vapi={vapi}
                    transcript={transcript}
                    gender={session.gender}
                    assistantOverrides={assistantOverrides}
                />
                <CallTranscript 
                    translate={translate}
                    messages={messages}
                />
            </main>

            {/* MOBILE VIEW */}
            <main className="w-full h-[calc(100vh-80px)] flex flex-col md:flex-row gap-5 p-4 sm:hidden">
                <Tabs defaultValue="call" className="w-full h-full">
                    <TabsList className="w-full h-10">
                        <TabsTrigger value="call">Call</TabsTrigger>
                        <TabsTrigger value="transcript">Transcript</TabsTrigger>
                    </TabsList>
                    <TabsContent value="call" className="w-full flex flex-col md:flex-row gap-5 p-2 h-[calc(100%-40px)]">
                        <Call 
                            vapi={vapi}
                            transcript={transcript}
                            gender={session.gender}
                            assistantOverrides={assistantOverrides}
                        /> 
                    </TabsContent>
                    <TabsContent value="transcript" className="w-full flex flex-col md:flex-row gap-5 p-2 h-[calc(100%-40px)]">
                        <CallTranscript 
                            translate={translate}
                            messages={messages}
                        />
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    )
}