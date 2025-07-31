import {Mic, MicOff, Captions, CaptionsOff} from "lucide-react"
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Lottie, {LottieRefCurrentProps} from "lottie-react"
import animationData from "../../../public/Sound Waves.json"
import { useRef, useState } from "react";
import Vapi from "@vapi-ai/web";

type Call = {
    ref: React.RefObject<HTMLDivElement | null>;
    transcript: string;
    callStatus: string;
    isAISpeaking: boolean;
    timer: string;
    vapi: Vapi;
    startSession: VoidFunction;
    endSession: VoidFunction;
}

enum CallStatus {
    INACTIVE = 'INACTIVE',
    CONNECTING = 'CONNECTING',
    ACTIVE = 'ACTIVE',
    FINISHED = 'FINISHED',
}

export default function Call({ref, transcript, startSession, endSession, callStatus, isAISpeaking, timer}: Call) {
    const [captionIsOn, setCaptionIsOn] = useState(true)
    function handleCurrentSession() {
        if (callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED) {
            const stimer = 0
            startSession()
        } else {
            endSession()
        }
    }

    const lottieRef = useRef<LottieRefCurrentProps>(null);
    isAISpeaking? lottieRef.current?.play() : lottieRef.current?.pause();

    return (
        <div className="w-full sm:h-2/3 sm:w-1/3 flex flex-col gap-4" ref={ref}>
            {/* AI Persona Card */}
            <div className="bg-card rounded-lg p-6 flex flex-col items-center gap-7 h-6/7">
                <div className="self-start font-semibold flex items-center justify-between gap-2 w-full">
                    <div className="flex items-center gap-2">
                        <div className="bg-primary py-2 px-3 rounded-xl text-center">{timer}</div> 
                        <div className="flex gap-2 items-center">
                            <div className="size-2 bg-red-700 rounded-full animate-pulse"></div> 
                            {callStatus}
                        </div>
                    </div>
                </div>

                <div className="h-full self-center flex flex-col items-center justify-center w-full">
                    <div
                        className={cn(
                        'w-40 h-40 rounded-full flex items-center justify-center text-4xl font-bold',
                        isAISpeaking ? 'ring-2 ring-blue-400 animate-pulse' : 'ring-1 ring-gray-300',
                        'bg-gradient-to-br from-blue-500 to-indigo-600 text-white'
                        )}
                    >
                        <Lottie lottieRef={lottieRef} autoPlay={false} animationData={animationData} />
                    </div>
                    
                    <p className="md:hidden text-foreground bg-gray-600/40 w-full max-h-48 overflow-auto text-pretty py-3 px-4 rounded-tr-xl rounded-br-xl rounded-tl-xl rounded-bl-xl mt-4">
                        {captionIsOn && transcript}
                    </p>
                </div>
            </div>
            
            {/* Control Buttons */}
            <div className="grid grid-cols-6 gap-3">
                <Button variant="outline" className="flex flex-col gap-2 h-16 col-span-3 sm:col-span-6 lg:col-span-2">
                    <MicOff className="w-5 h-5" />
                    <span className="text-sm">Turn off mic</span> {/* Don't let them toggle without vapi being on first */}
                </Button>
                <Button variant="outline" className="flex flex-col gap-2 h-16 col-span-3 sm:hidden" onClick={()=>setCaptionIsOn(prev=>!prev)}>
                    {captionIsOn? <CaptionsOff /> : <Captions />}
                    <span className="text-sm">Turn {captionIsOn? "off" : "on"} transcript</span> {/* Don't let them toggle without vapi being on first */}
                </Button>
                <Button 
                    variant={"destructive"}
                    className={cn(callStatus === CallStatus.CONNECTING? "" : "", "col-span-6 lg:col-span-4 flex flex-col gap-2 h-16 mb-3")} 
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