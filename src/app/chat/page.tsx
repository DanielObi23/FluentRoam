"use client"
//TODO: CHAT PERSISTS ON PAGE RELOAD, ALSO ON COMPONENT DISMOUNT. I'M THINKING GETTING IT DIRECTLY FROM VAPI, JUST STORE chatIdRef and assistantID 
//TODO: SEPARATE THE COMPONENTS

import Navigation from "@/components/app_layout/Navigation";
import { parseAsString, useQueryState } from "nuqs"
import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import defaultProfile from "../../../public/default_profile.jpg"
import fluentroam from "../../../public/logo/fluentroam.jpg"
import { useUser } from "@clerk/nextjs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendHorizontal } from "lucide-react";
import axios from "axios";
import { chatMessages } from "@/dummy_data";

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export default function Page() {
    const [name, setName] = useQueryState("name", parseAsString.withDefault("dan"))
    const { user } = useUser()
    const chatIdRef = useRef("")
    const [messages, setMessages] = useState<ChatMessage[]>([])

    async function sendMessage(message: string) {
        if (message.trim().length === 0 ){
            return
        }

        setMessages((prev) => [...prev, {
            "role": "user",
            "content": message
        }]);
        
        (document.getElementById("message") as HTMLInputElement).value = ""

        const result = await axios.post("/api/chat", {
            message,
            chatId: chatIdRef.current
        })
        chatIdRef.current = result.data.chatId
        setMessages((prev) => [...prev, {
            "role": "assistant",
            "content": result.data.message
        }])       
    }
    
    // useEffect(() => {
    //     // Anything you want to do when the component *mounts*
    //     localStorage.setItem("chatHistory", chatIdRef.current);

    //     async function getChatHistory() {
    //         const chatHistory = await axios.post("/api/chat/chatHistory", {
    //             id: localStorage.getItem("chatHistory")
    //         })
    //         setMessages(chatHistory.data.messages)
    //     }

    //     return () => {
    //         localStorage.removeItem("chatHistory")
    //         if (messages.length === 0 && (localStorage.getItem("chatHistory") as string).length > 0) {
    //             getChatHistory()
    //         }
    //         // // This runs when the component *unmounts*
    //         // console.log('ChatPage unmounting');
    //         // saveChatToStorage();           // e.g. localStorage
    //         // cancelPendingRequests();       // e.g. AbortController
    //     };
    // }, []);

    // useEffect(() => {
    //     if ((localStorage.getItem("chatHistory") as string).length > 0) {
    //         setMessages(JSON.parse(localStorage.getItem("chatHistory") as string))
    //     } else {
    //         localStorage.setItem("chatHistory", JSON.stringify(messages));
    //     }
    //     //console.log(localStorage.getItem("chatHistory") as string);
    // }, [chatIdRef.current])

    return(
        <div className="w-full min-h-screen bg-background">
            <Navigation page="Chat"/>
            <main className="flex h-[calc(100vh-80px)]">
                <section className="w-3/5 h-[calc(100vh-80px)] bg-accent">
                    <div className="flex flex-col p-4 gap-3 h-[calc(100vh-80px-80px)] overflow-y-scroll hide-scrollbar">
                        {messages?.map((m, i) => (
                            <div key={i} className={cn(m.role === "assistant"? 
                                "self-start justify-start" : 
                                "self-end justify-end", 
                                "w-8/9 md:w-5/7 flex flex-col gap-x-0.5")}>
                                <div className={cn(m.role === "assistant"? "justify-start" : "justify-end", "w-full flex gap-2")}>
                                    <div className={cn(m.role === "assistant"? 
                                            "text-foreground bg-blue-600 rounded-tr-3xl rounded-br-3xl rounded-tl-3xl order-2" : 
                                            "text-foreground bg-teal-600 rounded-tl-3xl rounded-bl-3xl rounded-tr-3xl", 
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
                                    onClick={() => translate(m.transcript, i)}>
                                        Translate
                                </Button> */}
                            </div>
                        ))}
                    </div>
                    <div className="w-full h-20 bg-blue-600 flex">
                        <Input id="message"/>
                        <Button onClick={()=>sendMessage((document.getElementById("message") as HTMLInputElement).value)}>
                            <SendHorizontal/>
                        </Button>
                    </div>
                </section>
                <section className="w-2/5 flex flex-col items-center gap-10 py-10">
                    <div className="w-2/3 h-4/7 flex flex-col items-center gap-3">
                        <div className="w-full h-full flex">
                            <div className="w-1/2 bg-primary h-full">
                                <div className="bg-secondary">English</div>
                            </div>
                            <div className="w-1/2 bg-secondary h-full">
                                <div className="bg-primary">Spanish</div>
                            </div>
                        </div>
                        <Button>
                            Add to vocab
                        </Button>
                    </div>
                    <div className="bg-green-400 w-3/5 h-3/7">
                        <div className="bg-blue-700">
                            <p>WORDS TO LEARN</p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}