"use client";

import { useEffect, useRef } from "react";
import Navigation from "@/components/app_layout/Navigation";
import Call from "@/components/conversation_page/call/Call";
import CallTranscript from "@/components/conversation_page/call/CallTranscript";
import { vapi } from "@/lib/vapi.sdk";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCallSessionStore, CallStatus } from "@/store";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import Main from "@/components/tags/Main";
import Lottie from "lottie-react";
import animationData from "../../../../../public/lottie-animation/loading.json";

export default function Session() {
  const search = useSearchParams();
  const router = useRouter();
  if (!search.get("scenario")) {
    toast("Please create a scenario to start conversation", {
      position: "top-center",
    });
    //redirect("/conversation"); for when retrieving call data from backend
    router.replace("/conversation");

    return (
      <Main page="Conversation">
        <Lottie autoPlay={false} animationData={animationData} />
      </Main>
    );
  }

  const updateClock = useCallSessionStore((s) => s.updateClock);
  const callStatus = useCallSessionStore((s) => s.callStatus);
  const updateCallStatus = useCallSessionStore((s) => s.updateCallStatus);

  const time = useRef(0); //It's here because, putting it in Call > CallSessionStatus, goes to 0 as tab change refreshes the UI & state

  function updateTime() {
    const mins = Math.floor(time.current / 60);
    const secs = time.current % 60;
    updateClock(
      `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`,
    );
    if (callStatus === CallStatus.ACTIVE) {
      time.current += 1;
    }
  }

  useEffect(() => {
    if (callStatus !== CallStatus.ACTIVE) return;
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [callStatus]);

  useEffect(() => {
    updateCallStatus(CallStatus.INACTIVE);
    return () => {
      vapi.stop();
      updateCallStatus(CallStatus.FINISHED);
    };
  }, []);

  return (
    <div className="bg-background flex h-screen w-full flex-col">
      <Navigation page="Conversation" />

      {/* DESKTOP VIEW */}
      <main className="hidden h-[calc(100vh-5rem)] w-full gap-5 p-4 sm:flex sm:flex-row">
        <Call vapi={vapi} time={time.current} />
        <CallTranscript vapi={vapi} />
      </main>

      {/* MOBILE VIEW */}
      <main className="flex h-[calc(100vh-5rem)] w-full flex-col gap-5 p-4 sm:hidden md:flex-row">
        <Tabs defaultValue="call" className="h-full w-full">
          <TabsList className="h-10 w-full">
            <TabsTrigger value="call">Call</TabsTrigger>
            <TabsTrigger value="transcript">Transcript</TabsTrigger>
          </TabsList>
          <TabsContent
            value="call"
            className="flex h-[calc(100%-40px)] w-full flex-col gap-5 p-2 md:flex-row"
          >
            <Call vapi={vapi} time={time.current} />
          </TabsContent>
          <TabsContent
            value="transcript"
            className="flex h-[calc(100%-40px)] w-full flex-col gap-5 p-2 md:flex-row"
          >
            <CallTranscript vapi={vapi} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
