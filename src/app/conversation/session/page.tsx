"use client"
//TODO: check max token, as well as speed of speaking and gender change, page reload when mid conversation. 
// add speed and duration to type Session later, check out the searchParams, optimise the number of states in the component, there is too many being rerendered
// handle user refreshing the page or leaving the page to home or other mid convo
// handle user starting this page with missing form data
// update conversations avatar

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams} from "next/navigation"
import { useUser } from "@clerk/nextjs";
import Navigation from "@/components/app_layout/Navigation";
import Call from "@/components/conversation_page/Call";
import CallTranscript from "@/components/conversation_page/CallTranscript";
import { Button } from "@/components/ui/button";
import portrait from "../../../../public/spanish/male_spanish.jpeg"
import defaultProfile from "../../../../public/default_profile.jpg"
import {vapi} from "@/lib/vapi.sdk"
import { toast } from "sonner";
import { translateText, TranslateText } from "@/lib/deepl";
import { SourceLanguageCode, TargetLanguageCode } from 'deepl-node';
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
    const callId = useRef("")
    const videoCall = useRef<HTMLDivElement>(null)
    const [messages, setMessages] = useState<Message[]>([]);
    const [currentCallStatus, setCurrentCallStatus] = useState(CallStatus.INACTIVE)
    const [isAISpeaking, setIsAISpeaking] = useState(false);
    const [transcript, setTranscript] = useState("")
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

    function onCallStart() {
        setCurrentCallStatus(CallStatus.ACTIVE)
    }

    function onCallEnd() {
        setCurrentCallStatus(CallStatus.FINISHED)
    }

    function onSpeechStart() {
        setIsAISpeaking(true)
        console.log("speech started")
    }

    function onSpeechEnd() {
        setIsAISpeaking(false)
        console.log("speech ended")
    }

    async function translate(text: string, role: Role, index: number, type: string) {
        const targetLanguageCode = "en-GB" as TargetLanguageCode
        const sourceLanguageCode = "es" as SourceLanguageCode
        const result = await translateText({text, sourceLanguageCode, targetLanguageCode} as TranslateText);
        console.log(result)
        setMessages(prevMessages => {
            const newMsgs = [...prevMessages];
            newMsgs[index] = { ...newMsgs[index], translation: result };
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
 
    function startSession() {
        vapi.start(gender, assistantOverrides).then(call => {
            callId.current = call?.id || ""  //Adding call-id so it can be added to database and user can reference it for later
        });  
        setCurrentCallStatus(CallStatus.CONNECTING)
        
    }

    function endSession() {
        setCurrentCallStatus(CallStatus.FINISHED)
        vapi.say("This is the end of our conversation, goodbye!", true) // or vapi.stop()
        //router.replace("/conversation")
    }

    const isVisibleInViewport = (element: HTMLElement) => {
        const rect = element.getBoundingClientRect()
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        )
    }

    const [clock, setClock] = useState("00:00")
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds((prev) => {
                const next = prev + 1;
                const mins = Math.floor(next / 60);
                const secs = next % 60;
                setClock(`${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`);
                return next;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // const duration = useRef(0)
    // function updateDuration() {
    //     duration.current++;
    //     const minutes = Math.floor(duration.current / 60);
    //     const seconds = duration.current % 60;
    //     setClock(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`)
    // }

    // setInterval(updateDuration, 1000);

    return (
        <div className="h-screen flex flex-col w-full bg-background">
            <Navigation page="Conversation"/>
            {/* DESKTOP VIEW */}
            <main className="w-full h-[calc(100vh-80px)] sm:flex sm:flex-row gap-5 p-4 hidden">
                <Call 
                    ref={videoCall}
                    startSession={startSession}
                    endSession={endSession}
                    callStatus={currentCallStatus}
                    isAISpeaking={isAISpeaking}
                    timer={clock}
                    transcript={transcript}
                    vapi={vapi}
                />
                <CallTranscript 
                    userImage={user?.imageUrl || defaultProfile.src}
                    aiImage={portrait.src}
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
                            ref={videoCall}
                            startSession={startSession}
                            endSession={endSession}
                            callStatus={currentCallStatus}
                            isAISpeaking={isAISpeaking}
                            timer={clock}
                            transcript={transcript}
                        /> 
                    </TabsContent>
                    <TabsContent value="transcript" className="w-full flex flex-col md:flex-row gap-5 p-2 h-[calc(100%-40px)]">
                        <CallTranscript 
                            userImage={user?.imageUrl || defaultProfile.src}
                            aiImage={portrait.src}
                            translate={translate}
                            messages={messages}
                        />
                    </TabsContent>
                </Tabs>
            </main>

            {/*check the visibility toggle*/}
            {/* <Button className={cn(videoCall.current && isVisibleInViewport(videoCall.current)? "hidden": "fixed bottom-2 right-3")} onClick={() => videoCall.current?.scrollIntoView({ behavior: "smooth" })}>
                <ArrowUp size={28} strokeWidth={2.5} />
            </Button> */}
        </div>
    )
}