"use client"

import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import Vapi from '@vapi-ai/web';

export default function Conversation() {
    const vapi = new Vapi('48c46a80-d52f-482f-91ae-6c8fbeb10b00');
    return (
        <div className="w-full min-h-screen bg-background">
            <Navigation page="Conversation"/>

            <Button className="cursor-pointer mr-5 bg-background" onClick={() => vapi.start('e3fbfb66-b32e-4c74-b456-c6ea5fb15663')}>
                <span className="text-foreground">Start convo</span>
            </Button>
            <Button className="cursor-pointer" onClick={() => vapi.stop()}>
                End convo
            </Button>
        </div>
    )
}