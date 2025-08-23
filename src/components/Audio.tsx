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
            const time = Math.floor(audio.currentTime || 0);
            const min = Math.floor(time / 60);
            const sec = time % 60;
            setCurrentTime(`${min}:${String(sec).padStart(2, "0")}`);
            if (audio.currentTime === audio.duration) {
                setAudioState("PLAYABLE")
            }
        };

        audio.addEventListener("timeupdate", tick);
        return () => audio.removeEventListener("timeupdate", tick);
    }, []);

    return (
        <div className="rounded-2xl border-2 py-5 flex flex-col justify-center items-center w-full gap-4 bg-background">
            <audio ref={audioRef}>
                <source src={audioUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
            <div className="w-full flex justify-center gap-4 text-lg">
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
            <div className="flex justify-around items-center w-full">
                <a href={audioUrl} download>
                    <Download className="size-8"/><span className="sr-only">download link</span>
                </a>
                <div className="flex justify-center items-center gap-3 mt-3">
                    <button aria-label="rewind" onClick={() => (audioRef.current as HTMLAudioElement).currentTime -= 5} className="cursor-pointer">
                        <Rewind className="fill-white size-6" />
                    </button>
                    <button aria-label={audioState === "PLAYABLE"? "play" : "pause"} onClick={updateAudioState} className="cursor-pointer">
                        {audioState === "PLAYABLE"? <Play className="fill-white size-10"/> : <Pause className="fill-white size-10"/>}
                    </button>
                    <button aria-label="fast-forward" onClick={() => (audioRef.current as HTMLAudioElement).currentTime += 5} className="cursor-pointer">
                        <FastForward className="fill-white size-6" />
                    </button>
                </div>
                <button 
                    aria-label="restart audio" 
                    onClick={() => audio.currentTime = 0} 
                    className="cursor-pointer">
                        <RotateCcw className="size-8"/>
                </button>
            </div>
            <div className="flex justify-around w-full">
                {playback.map((playbackRate, index) => (
                    <label 
                        key={`playbackRate-${index}`}
                        className="flex items-center space-x-2 cursor-pointer" 
                        onClick={() => {audio.playbackRate = playbackRate}}>
                        <input
                            type="radio"
                            name="playback"
                            className="peer hidden"
                        />
                        <span 
                            className="p-3 font-semibold duration-200 transition-discrete transition-all ease-in 
                            peer-checked:-translate-y-2 peer-checked:font-bold peer-checked:border-2  peer-checked:text-secondary">{playbackRate}x</span>
                    </label>
                ))}
            </div>
        </div>
    )
}