import { callTranscript } from "@/dummy_data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Role = "assistant" | "user"
type Transcript = {
    translate: (text: string, role: Role, index: number, type: string) => Promise<void>;
    aiImage: string;
    userImage: string
}
export default function CallTranscript({translate, aiImage, userImage}: Transcript) {
    return (
        <div className="w-full md:w-2/3 bg-card rounded-lg flex flex-col">
            <div className="p-4 border-b">
                <h2 className="text-xl font-semibold">Call Transcript</h2>
            </div>

            {/* 4. render the live transcript */}
            <div className="flex flex-col p-4 gap-3 bg-card h-full overflow-y-scroll hide-scrollbar">
                {callTranscript?.map((m, i) => (
                    <div key={i} className={cn(m.role === "assistant"? 
                        "self-start justify-start" : 
                        "self-end justify-end", 
                        "w-8/9 md:w-5/7 flex flex-col gap-x-0.5")} 
                        onDoubleClick={
                            m.role === "assistant"
                                ? () => translate(m.transcript, m.role as Role, i, m.type)
                                : undefined
                        }>
                        <div className={cn(m.role === "assistant"? "justify-start" : "justify-end", "w-full flex gap-2")}>
                            <div className={cn(m.role === "assistant"? 
                                    "text-foreground bg-blue-600 rounded-tr-3xl rounded-br-3xl rounded-tl-3xl order-2" : 
                                    "text-foreground bg-teal-600 rounded-tl-3xl rounded-bl-3xl rounded-tr-3xl", 
                                    "w-6/7 font-content text-pretty py-3 px-4 space-y-2.5")}>
                                <p>{m.transcript}</p>
                                {m.translation && 
                                <p className="text-foreground bg-gray-600/40 w-full text-pretty py-3 px-4 rounded-tr-xl rounded-br-xl rounded-tl-xl rounded-bl-xl">
                                    {m.translation}
                                </p>}
                            </div>
                            
                            <Avatar className={cn(m.role === "assistant"? "self-end" : "self-end", "")}>
                                <AvatarImage src={m.role === "assistant"? aiImage : userImage} />
                                <AvatarFallback>YOU</AvatarFallback>
                            </Avatar>
                        </div>
                        <Button 
                            variant={"outline"} 
                            className={cn(m.role === "assistant"? "ml-9 self-start" : "mr-9 self-end" , "mt-1", m.translation && "hidden")}
                            onClick={() => translate(m.transcript, m.role as Role, i, m.type)}>
                                Translate
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    )
}