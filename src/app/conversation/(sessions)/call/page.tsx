"use client";

import { useEffect } from "react";
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
import useTimer from "@/hooks/conversation/use-timer";

export default function Session() {
  const search = useSearchParams();
  const updateCallStatus = useCallSessionStore((s) => s.updateCallStatus);

  useTimer(); //It's here because, putting it in Call > CallSessionStatus, goes to 0 as tab change refreshes the UI & state
  useEffect(() => {
    updateCallStatus(CallStatus.INACTIVE);
    return () => {
      vapi.stop();
      updateCallStatus(CallStatus.FINISHED);
    };
  }, [updateCallStatus]);

  const router = useRouter();
  if (!search.get("scenario")) {
    toast("Please create a scenario to start conversation", {
      position: "top-center",
    });
    router.replace("/conversation");

    return (
      <Main page="Conversation">
        <Lottie autoPlay={false} animationData={animationData} />
      </Main>
    );
  }

  return (
    <div className="bg-background flex h-screen w-full flex-col">
      <Navigation page="Conversation" />

      {/* DESKTOP VIEW */}
      <main className="hidden h-[calc(100vh-5rem)] w-full gap-5 p-4 sm:flex sm:flex-row">
        <Call />
        <CallTranscript />
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
            <Call />
          </TabsContent>
          <TabsContent
            value="transcript"
            className="flex h-[calc(100%-40px)] w-full flex-col gap-5 p-2 md:flex-row"
          >
            <CallTranscript />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
