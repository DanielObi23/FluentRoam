import { Play, Pause, FastForward, Rewind, Download, RotateCcw } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider"

export default function Audio({audioUrl}: {audioUrl: string}) {
    const playback = [0.5, 0.75, 1.0, 1.25, 1.5]
    const [audioState, setAudioState] = useState<"PLAYABLE" | "PAUSED">("PLAYABLE")
    const [currentTime, setCurrentTime] = useState("0:00")
    const audioRef = useRef<HTMLAudioElement>(null)
    const audio = (audioRef.current as HTMLAudioElement)

    function updateAudioState() {
        if (audioState === "PLAYABLE") {
            (audioRef.current as HTMLAudioElement).play()
            setAudioState("PAUSED")
        } else {
            (audioRef.current as HTMLAudioElement).pause()
            setAudioState("PLAYABLE")
        }
    }

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const tick = () => {
            const t = Math.floor(audio.currentTime || 0);
            const min = Math.floor(t / 60);
            const sec = t % 60;
            setCurrentTime(`${min}:${String(sec).padStart(2, "0")}`);
        };

        audio.addEventListener("timeupdate", tick);
        return () => audio.removeEventListener("timeupdate", tick);
    }, []);

    return (
        // UPDATE SO THAT CURRENT TIME IS A SEPARATE COMPONENT OR HOOK, SO THAT IT'S THE ONLY BEING RERENDERED FOR BETTER PERFORMANCE, DO THE SAME FOR TIME/CLOCK IN CALL
        <div className="flex flex-col justify-center items-center w-full gap-2">
            <audio ref={audioRef}>
                <source src={audioUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
            <div className="w-full flex justify-center gap-4">
                <span>{currentTime}</span>
                <Slider 
                    onValueChange={([val]) => {                     
                        if (audio) audio.currentTime = val;
                    }} 
                    value={[Math.floor(audio?.currentTime || 0)]} 
                    max={audio?.duration || 0} 
                    step={1} 
                    className="w-5/7"/>
                <span>{
                    `${Math.trunc(audio?.duration/ 60 || 0)}:${audio?.duration % 60 | 0 || "00"}`
                }</span>
            </div>
            <div className="space-x-3 mt-3">
                <button aria-label="rewind" onClick={() => (audioRef.current as HTMLAudioElement).currentTime -= 5} className="cursor-pointer">
                    <Rewind />
                </button>
                <button aria-label={audioState === "PLAYABLE"? "play" : "pause"} onClick={updateAudioState} className="cursor-pointer">
                    {audioState === "PLAYABLE"? <Play /> : <Pause />}
                </button>
                <button aria-label="fast-forward" onClick={() => (audioRef.current as HTMLAudioElement).currentTime += 5} className="cursor-pointer">
                    <FastForward />
                </button>
            </div>
            <div className="flex justify-around w-full">
                <a href="/story-audio/flash-fiction.mp3" download>
                    <Download /><span className="sr-only">download link</span>
                </a>
                <button 
                    aria-label="restart" 
                    onClick={() => audio.currentTime = 0} 
                    className="cursor-pointer">
                        <RotateCcw />
                </button>
            </div>
            <div className="flex justify-around w-full">
                {playback.map((playbackRate, index) => (
                    <label 
                        key={`playbackRate-${index}`}
                        className="flex items-center space-x-2 cursor-pointer" 
                        onClick={() => {audio.playbackRate = playbackRate;  audio.play()}}>
                        <input
                            type="radio"
                            name="playback"
                            className="peer hidden"
                        />
                        <span className="peer-checked:text-blue-500">{playbackRate}x</span>
                    </label>
                ))}
            </div>
        </div>
    )
}