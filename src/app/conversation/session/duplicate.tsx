"use client"
//TODO: check max token, as well as speed of speaking and gender change, page reload when mid conversation
import Navigation from "@/components/app_layout/Navigation";
import { Button } from "@/components/ui/button";
import Vapi from '@vapi-ai/web';
import Image from "next/image";
import portrait from "../../../../public/spanish/male_spanish.jpeg"
import defaultProfile from "../../../../public/default_profile.jpg"
import {useRouter} from "next/navigation"

import {Mic, RotateCcw} from "lucide-react"
import { useUser } from "@clerk/nextjs";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {vapi} from "@/lib/vapi.sdk"
type Message = {
    type: string;
    transcript: string;
    role: "assistant" | "user";
    transcriptType: "partial" | "final";
};

export default function Session() {
    const [messages, setMessages] = useState<Message[]>([]);
    //const [userMessage, setUserMessage] = useState("");
    let userMessage: string = "";
    const scenario = "hell"
    const char = "male"
    const gender = char === "male"? 'e3fbfb66-b32e-4c74-b456-c6ea5fb15663' : ""
    const voiceId = char === "male" ? "burt" : "emma"; 
    
    const router = useRouter()
    const { user } = useUser()

    const assistantOverrides = {
        recordingEnabled: true,
        variableValues: {
            first_message: `Hello ${user?.firstName}, what scenario would you like to start`,
            scenario: "booking a hotel in benidorm over the phone",
            formality: "casual",
            response_length: "brief",
            proficiency: "B1"
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
        console.log(message)
        if (message.type === "transcript" && message.role === "assistant" || 
            message.type === "transcript" && message.role === "user" && message.transcriptType === "final") {
            setMessages(prevMessages => {
                if (prevMessages.length === 0) {
                    return [message];
                }
                
                const lastMessage = prevMessages[prevMessages.length - 1];
                if (lastMessage.role === "assistant" && message.role === "assistant") {
                    
                    //console.log({type: "partial", lastMessage: lastMessage.transcript, message: message.transcript});
                    if (lastMessage.transcriptType === "final") {
                        // console.log({type: "final", lastMessage: lastMessage.transcript, message: message.transcript});
                        // // console.log({type: "final", lastMessage: lastMessage.transcript, message: message.transcript});
                        // // const concatenatedText = lastMessage.transcript.length > 0? lastMessage.transcript + " " + message.transcript : message.transcript;
                        // const newMessage = lastMessage.transcript + " " + message.transcript
                        // console.log({newMessage, lastMessage: lastMessage.transcript, message: message.transcript});
                        // const updatedMessage = {
                        //     type: message.type,
                        //     transcript: newMessage,
                        //     role: message.role,
                        //     transcriptType: message.transcriptType
                        // }
                        // return [...prevMessages.slice(0, -1), updatedMessage];
                        // const newUserMessage = {
                        //     type: message.type,
                        //     transcript: concatenatedText,
                        //     role: message.role,
                        //     transcriptType: message.transcriptType
                        // };
                        
                        // return [...prevMessages.slice(0, -1), newUserMessage];
                        // const newMessage = lastMessage.transcript + " " + message.transcript
                        // console.log({newMessage, lastMessage: lastMessage.transcript, message: message.transcript});
                        // const updatedMessage = {
                        //     type: message.type,
                        //     transcript: newMessage,
                        //     role: message.role,
                        //     transcriptType: message.transcriptType
                        // }
                        // return [...prevMessages.slice(0, -1), updatedMessage];
                        return [...prevMessages, message];
                    }
                    return [...prevMessages.slice(0, -1), message];
                    
                } else if (lastMessage.role === "user" && message.role === "user") {
                    // Concatenate directly without relying on state
                    const concatenatedText = lastMessage.transcript.length > 0? lastMessage.transcript + " " + message.transcript : message.transcript;
                    // console.log({concatenatedText, lastMessage: lastMessage.transcript, message: message.transcript});
                    
                    const newUserMessage = {
                        type: message.type,
                        transcript: concatenatedText,
                        role: message.role,
                        transcriptType: message.transcriptType
                    };
                    
                    return [...prevMessages.slice(0, -1), newUserMessage];
                    
                } else {
                    return [...prevMessages, message];
                }
            });
        }
    }

    const onError = (error: Error) => console.log('Error', error);

    useEffect(() => {
        if(!user) {
            router.replace('/sign-in')
            return
        }

        if(!scenario) {
            toast("Event has been created")
            router.replace("/conversation")
            return
        }

        vapi.start(gender, assistantOverrides)  

    //     vapi.on('message', (msg) => {
    //        if (msg.type === 'transcript' && msg.transcriptType === "final") {
    //            setMessages((prev) => [...prev, msg]); // append new chunk
    //        }
    //    });

       // cleanup on unmount
       //return () => vapi.off('message');
        // vapi.on('call-start', onCallStart);
        // vapi.on('call-end', onCallEnd);
        vapi.on('message', onMessage);
        vapi.on('error', onError);
        // vapi.on('speech-start', onSpeechStart);
        // vapi.on('speech-end', onSpeechEnd);

        return () => {
            // vapi.off('call-start', onCallStart);
            // vapi.off('call-end', onCallEnd);
            vapi.off('message', onMessage);
            vapi.off('error', onError);
            // vapi.off('speech-start', onSpeechStart);
            // vapi.off('speech-end', onSpeechEnd);
        }

    }, [])
 

    function endConversation() {
        vapi.stop()
        router.replace("/conversation")
    }

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
                    <Button variant="destructive" className="w-full py-3" onClick={endConversation}>
                        End Lesson
                    </Button>
                </div>

                {/* Right Panel - Transcript (Image 1) */}
                <div className="w-2/3 bg-card rounded-lg flex flex-col ">
                    <div className="p-4 border-b">
                        <h2 className="text-xl font-semibold">Call Transcript</h2>
                    </div>

                    {/* 4. render the live transcript */}
                    <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                        {messages?.map((m, i) => (
                            <div key={i} className="space-y-1">
                                <div className="text-sm font-medium capitalize"
                                    style={{color: m.role === 'user' ? 'var(--primary)' : 'var(--accent)'}}>
                                    {m.role}
                                </div>
                                <div className={m.role === 'user'
                                        ? 'bg-muted rounded-lg p-3 max-w-[80%]'
                                        : 'text-muted-foreground'}>
                                    {m.transcript}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="p-4 flex justify-center">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                            <Mic className="w-6 h-6 text-white"/>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    )
}

// top level
import { useRef } from 'react';

export default function Session() {
  const [messages, setMessages] = useState<Message[]>([]);
  const assistantTextRef = useRef('');   // <-- NEW

  function onMessage(message: Message) {
    if (
      message.type !== 'transcript' ||
      (message.role === 'user' && message.transcriptType === 'partial')
    )
      return;

    setMessages(prev => {
      // -----------------------------------------------
      // 1. brand-new conversation
      // -----------------------------------------------
      if (prev.length === 0) {
        if (message.role === 'assistant') {
          assistantTextRef.current = message.transcript; // first final
        }
        return [message];
      }

      const last = prev[prev.length - 1];

      // -----------------------------------------------
      // 2. role change (assistant ↔ user)
      // -----------------------------------------------
      if (last.role !== message.role) {
        if (message.role === 'assistant') {
          assistantTextRef.current = message.transcript; // first final of new block
        } else {
          assistantTextRef.current = '';                 // clear for next assistant block
        }
        return [...prev, message];
      }

      // -----------------------------------------------
      // 3. same role
      // -----------------------------------------------
      if (message.role === 'assistant') {
        if (message.transcriptType === 'partial') {
          // show ref + current partial, do NOT mutate ref yet
          const merged = (assistantTextRef.current + ' ' + message.transcript).trimStart();
          return [
            ...prev.slice(0, -1),
            { ...message, transcript: merged }
          ];
        } else { // final
          // ref = previous final + this final
          assistantTextRef.current = (
            assistantTextRef.current + ' ' + message.transcript
          ).trimStart();
          return [
            ...prev.slice(0, -1),
            { ...message, transcript: assistantTextRef.current }
          ];
        }
      }

      // -----------------------------------------------
      // 4. user continues speaking
      // -----------------------------------------------
      const merged = (last.transcript + ' ' + message.transcript).trimStart();
      return [
        ...prev.slice(0, -1),
        { ...message, transcript: merged }
      ];
    });
  }

  /* … rest of your component … */
}