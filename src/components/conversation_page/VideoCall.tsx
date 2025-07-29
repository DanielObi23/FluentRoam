import Image from "next/image";
import {Mic, MicOff, Captions, CaptionsOff} from "lucide-react"
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type VideoCall = {
    ref: React.RefObject<HTMLDivElement | null>;
    transcript: string;
    userImage: string;
    callStatus: string;
    isAISpeaking: boolean;
    timer: string;
    startSession: VoidFunction;
    endSession: VoidFunction;
    toggleDisplay: VoidFunction;
}

enum CallStatus {
    INACTIVE = 'INACTIVE',
    CONNECTING = 'CONNECTING',
    ACTIVE = 'ACTIVE',
    FINISHED = 'FINISHED',
}

export default function VideoCall({ref, transcript, userImage, startSession, endSession, toggleDisplay, callStatus, isAISpeaking, timer}: VideoCall) {
    function handleCurrentSession() {
        if (callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED) {
            const stimer = 0
            startSession()
        } else {
            endSession()
        }
    }
    return (
        <div className="w-full h-full py-2 md:w-1/3 flex flex-col gap-4" ref={ref}>
            {/* AI Persona Card */}
            <div className="bg-card rounded-lg p-6 flex flex-col items-center justify-center gap-7 h-6/7">
                <div className="self-start font-semibold flex items-center justify-between gap-2 w-full">
                    <div className="flex items-center gap-2">
                        <div className="bg-primary py-2 px-3 rounded-xl text-center">{timer}</div> 
                        <div className="flex gap-2 items-center">
                            <div className="size-2 bg-red-700 rounded-full"></div> 
                            {callStatus}
                        </div>
                    </div>
                    <Button onClick={toggleDisplay}>Toggle Display</Button>
                </div>

                <div className="w-full flex items-center justify-end">
                    <img
                        src={userImage} 
                        alt={"user portrait"} 
                        className="size-20 rounded-lg object-cover"
                    />
                </div>

                <div className="self-center flex flex-col items-center justify-center">
                    <div
                        className={cn(
                        'w-40 h-40 rounded-full flex items-center justify-center text-4xl font-bold',
                        isAISpeaking ? 'ring-2 ring-blue-400 animate-pulse' : 'ring-1 ring-gray-300',
                        'bg-gradient-to-br from-blue-500 to-indigo-600 text-white'
                        )}
                    >
                        VAPI
                    </div>
                    <p className="text-foreground bg-gray-600/40 w-full text-pretty py-3 px-4 rounded-tr-xl rounded-br-xl rounded-tl-xl rounded-bl-xl mt-2">
                        {transcript}
                    </p>
                </div>
            </div>
            
            {/* Control Buttons */}
            <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="flex flex-col gap-2 h-16">
                    <MicOff className="w-5 h-5" />
                    <span className="text-sm">Turn off mic</span> {/* Don't let them toggle without vapi being on first */}
                </Button>
                <Button variant="outline" className="flex flex-col gap-2 h-16">
                    <CaptionsOff />
                    <span className="text-sm">Turn off transcript</span> {/* Don't let them toggle without vapi being on first */}
                </Button>
                <Button 
                    variant={"destructive"}
                    className={cn(callStatus === CallStatus.CONNECTING? "" : "", "col-span-2 flex flex-col gap-2 h-16")} 
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