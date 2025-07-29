import Image from "next/image";
import {Mic} from "lucide-react"
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type VideoCall = {
    aiImage: string;
    userImage: string;
    userFirstName: string;
    callStatus: string;
    isAISpeaking: boolean;
    startSession: VoidFunction;
    endSession: VoidFunction;
}

enum CallStatus {
    INACTIVE = 'INACTIVE',
    CONNECTING = 'CONNECTING',
    ACTIVE = 'ACTIVE',
    FINISHED = 'FINISHED',
}

export default function VideoCall({aiImage, userImage, userFirstName, startSession, endSession, callStatus, isAISpeaking}: VideoCall) {
    function handleCurrentSession() {
        if (callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED) {
            startSession()
        } else {
            endSession()
        }
    }
    return (
        <div className="w-full md:w-1/3 flex flex-col gap-4">
            {/* AI Persona Card */}
            <div className="bg-card rounded-lg p-6 flex flex-col items-center justify-center gap-7 h-6/7">
                <div className={cn(isAISpeaking? "animate-pulse ring-accent-600 ring-2 shadow-2xl shadow-accent-600/90" : "", "self-start flex flex-col items-center justify-center")}>
                    <Image
                        src={aiImage} 
                        alt="Anna portrait"
                        width={40}
                        height={40} 
                        className="w-40 h-40 rounded-lg object-cover"
                    />
                    <h3 className="text-xl font-semibold">José</h3>
                </div>
                <div className="self-end flex flex-col items-center justify-center">
                    <Image
                        src={userImage} 
                        alt={`${userFirstName} portrait`} 
                        width={40}
                        height={40}
                        className="w-40 h-40 rounded-lg object-cover"
                    />
                    <h3 className="text-xl font-semibold">{userFirstName}</h3>
                </div>
            </div>
            
            {/* Control Buttons */}
            <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="flex flex-col gap-2 h-16">
                    <Mic className="w-5 h-5" />
                    <span className="text-sm">Turn off mic</span> {/* Don't let them toggle without vapi being on first */}
                </Button>
                <Button 
                    variant={"destructive"}
                    className={cn(callStatus === CallStatus.CONNECTING? "" : "", "flex flex-col gap-2 h-16")} 
                    onClick={handleCurrentSession} 
                    disabled={callStatus === CallStatus.CONNECTING}>
                        {callStatus === CallStatus.INACTIVE
                            ? "Start Conversation"
                            : callStatus === CallStatus.CONNECTING
                            ? "Connecting..."
                            : callStatus === CallStatus.ACTIVE
                            ? "End Conversation"
                            : "Restart Conversation"}
                </Button>
            </div>
        </div>
    )
}