"use client"
//TODO: CHAT PERSISTS ON PAGE RELOAD, ALSO ON COMPONENT DISMOUNT. I'M THINKING GETTING IT DIRECTLY FROM VAPI, JUST STORE chatIdRef and assistantID 
//TODO: SEPARATE THE COMPONENTS
//TODO: ADD ANIMATIONS TO TELL USER TO START TYPING, ELEVENLABS AUDIO TRANSCRIBER, TRANSLATOR, ANIMATION LOADER WAITING FOR RESPONSE, ERROR HANDLING

import Navigation from "@/components/app_layout/Navigation";
import { parseAsString, useQueryState } from "nuqs"
import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import defaultProfile from "../../../../../public/default_profile.jpg"
import fluentroam from "../../../../../public/logo/fluentroam.jpg"
import { useUser } from "@clerk/nextjs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Volume2, Mic, SendHorizontal } from "lucide-react";
import axios from "axios";
import { chatMessages } from "@/dummy_data";
import { Textarea } from "@/components/ui/textarea";
import { useSearchParams} from "next/navigation"

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  loading: boolean;
  translation?: string;
  audio?: string;
}

export default function Page() {
    const search = useSearchParams();
    //const [name, setName] = useQueryState("name", parseAsString.withDefault("dan"))
    const [messages, setMessages] = useState<ChatMessage[]>([])
    const { user } = useUser()
    const chatIdRef = useRef("")

    const textMessageRef = useRef<HTMLTextAreaElement>(null)
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }, [messages]);

    const messageToTranslateRef = useRef<HTMLTextAreaElement>(null)
    const translatedMessageRef = useRef<HTMLParagraphElement>(null)

    const dictionarySearchRef = useRef<HTMLInputElement>(null)
    const dictionaryRef = useRef<HTMLParagraphElement>(null)

    async function startConversation() {
        setMessages([{
            "role": "assistant",
            "content": "....Retrieving response",
            "loading": true
        }]);
        //HANDLE IF ANY DATA IS MISSING
        const result = await axios.post("/api/chat", {
            scenario: search.get("scenario"),
            formality: search.get("formality"),
            response_length: search.get("response_length"),
            proficiency: search.get("proficiency"),
            chatId: "",
            message: ""
        })
        chatIdRef.current = result.data.chatId
        setMessages([{
            "role": "assistant",
            "content": result.data.message,
            "loading": false
        }])  
    }

    async function sendMessage() {
        const message = (textMessageRef.current as HTMLTextAreaElement).value
        if (message.trim().length === 0 ){
            return
        }

        setMessages((prev) => [...prev, {
            "role": "user",
            "content": message,
            "loading": false
        }, {
            "role": "assistant",
            "content": "....Retrieving response",
            "loading": true
        }]);
        
        (textMessageRef.current as HTMLTextAreaElement).value = "";
        (textMessageRef.current as HTMLTextAreaElement).focus()

        const result = await axios.post("/api/chat", {
            message,
            chatId: chatIdRef.current
        })
        chatIdRef.current = result.data.chatId
        setMessages((prev) => [...prev.slice(0, prev.length - 1), {
            "role": "assistant",
            "content": result.data.message,
            "loading": false
        }])       
    }

    async function translate() {
        const text = messageToTranslateRef.current?.value
        const response = await axios.post("/api/translate",{
            text,
            from: "en",
            to: "es"
        });

        (translatedMessageRef.current as HTMLParagraphElement).innerHTML = response.data.message
    }

    async function searchDictionary() {
        const word = (dictionarySearchRef.current as HTMLInputElement).value
        const response = await axios.post("/api/dictionary", {word})
    }

    
    useEffect(() => {
        startConversation();
    }, [])

    return(
        <div className="w-full flex flex-col h-screen bg-background">
            <Navigation page="Chat"/>
            <main className="flex h-[calc(100vh-5rem)] w-full">
                <section className="w-3/5 flex flex-col p-4">
                    {/* ADD IF MESSAGES ARE EMPTY, ADD SOME SORT OF UI OR LOTTIE ANIMATION TO TELL USERS TO START TYPING, OR MAKE AI TEXT FIRST */}
                    <div ref={scrollRef} className="flex flex-col p-4 gap-3 flex-1 overflow-y-scroll hide-scrollbar bg-foreground">
                        {messages?.map((m, i) => (
                            <div key={i} className={cn(m.role === "assistant"? 
                                "self-start justify-start" : 
                                "self-end justify-end", 
                                "w-8/9 md:w-5/7 flex flex-col gap-x-0.5")}>
                                <div className={cn(m.role === "assistant"? "justify-start" : "justify-end", "w-full flex gap-2")}>
                                    <div className={cn(m.role === "assistant"? 
                                            "text-white bg-blue-600 rounded-tr-3xl rounded-br-3xl rounded-tl-3xl order-2" : 
                                            "text-white bg-teal-600 rounded-tl-3xl rounded-bl-3xl rounded-tr-3xl", 
                                            "w-6/7 font-content text-pretty py-3 px-4 space-y-2.5")}>
                                        <p>{m.content}</p>
                                        {/* {m.translation && 
                                        <p className="text-foreground bg-gray-600/40 w-full text-pretty py-3 px-4 rounded-tr-xl rounded-br-xl rounded-tl-xl rounded-bl-xl">
                                            {m.translation}
                                        </p>} */}
                                    </div>
                                    
                                    <Avatar className={cn(m.role === "assistant"? "self-end" : "self-end", "")}>
                                        <AvatarImage src={m.role === "assistant"? fluentroam.src : user?.imageUrl ?? defaultProfile.src}  className="object-cover"/>
                                        <AvatarFallback>{m.role === "assistant"? "AI" : "YOU"}</AvatarFallback>
                                    </Avatar>
                                </div>
                                {/* <Button 
                                    variant={"outline"} 
                                    className={cn(m.role === "assistant"? "ml-9 self-start" : "mr-9 self-end" , "mt-1", m.translation && "hidden")}
                                    onClick={() => translate(m.content, i)}>
                                        Translate
                                </Button> */}
                                <Button 
                                    variant={"outline"} 
                                    className={cn(m.role === "assistant"? "ml-9 self-start" : "hidden" , "mt-1")}
                                    //onClick={() => playAudio(m.content)}
                                    >
                                        <Volume2 />
                                </Button>
                            </div>
                        ))}
                    </div>
                        
                    {/* CHANGE ALL IDs TO useRef */}
                    <div className="flex items-center gap-2 p-3">
                        <Textarea
                            ref={textMessageRef}
                            className="rounded-2xl flex-1 resize-none px-6 text-wrap
                                        min-h-10 max-h-24 overflow-y-auto hide-scrollbar"
                            placeholder="Type a message"
                            autoFocus
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    sendMessage();
                                }
                            }}
                            />

                        <Button 
                            onClick={sendMessage}
                            className=""
                            >
                            <SendHorizontal/>
                        </Button>
                    </div>
                    
                </section>
                <section className="w-2/5 flex flex-col items-center gap-10 py-10">
                    {/* TRANSLATOR */}
                    <div className="w-2/3 h-4/7 flex flex-col items-center gap-3">
                        <div className="w-full h-full flex">
                            <div className="w-1/2 bg-foreground h-full">
                                <div className="bg-secondary h-10 text-center grid place-items-center text-xl font-semibold">English</div>
                                <Textarea 
                                    ref={messageToTranslateRef}
                                    className="w-full bg-foreground rounded-none border-0 resize-none max-h-[calc(100%-2.5rem)] min-h-[calc(100%-2.5rem)]"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            translate();
                                        }
                                    }}
                                    />
                            </div>
                            <div className="w-1/2 bg-secondary h-full">
                                <div  className="bg-primary h-10 text-center grid place-items-center text-xl font-semibold">Spanish</div>
                                <div className="w-full py-1 px-2 h-[calc(100%-2.5rem)]">
                                    <p ref={translatedMessageRef}></p>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between items-center w-full">
                            <Button>
                                Add to vocab
                            </Button>
                            <Button onClick={translate}>
                                Translate
                            </Button>
                        </div>
                    </div>

                    {/* DICTIONARY */}
                    <div className="bg-green-400 w-3/5 h-3/7 p-2 flex flex-col gap-2 items-center justify-center">
                        <div className="flex gap-2 w-full">
                            <Input ref={dictionarySearchRef} className=""/>
                            <Button onClick={searchDictionary}>Search</Button>
                        </div>
                        <div className="w-full bg-background flex-1">
                            <p ref={dictionaryRef}></p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}