"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button";
import Vapi from '@vapi-ai/web';

export default function Conversation() {
    const vapi = new Vapi('48c46a80-d52f-482f-91ae-6c8fbeb10b00');
    return (
        <div className="w-full min-h-screen p-3 bg-mint-500">
            <span className="bg-red-300 text-4xl font-bold w-full h-20 flex justify-start items-center gap-2">
                <SidebarTrigger className="cursor-pointer"/> Conversation
            </span>

            <Button className="cursor-pointer mr-5" onClick={() => vapi.start('e3fbfb66-b32e-4c74-b456-c6ea5fb15663')}>
                Start convo
            </Button>
            <Button className="cursor-pointer" onClick={() => vapi.stop()}>
                End convo
            </Button>
        </div>
    )
}