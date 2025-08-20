"use client"

import Navigation from "@/components/app_layout/Navigation";
import { useParams } from "next/navigation";
import { story } from "@/story";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import Audio from "@/components/Audio";
import { useState } from "react";
import { HardDriveDownload } from "lucide-react";

export default function Page() {
    const [audioState, setAudioState] = useState<"NONE" | "PLAYABLE" >("NONE")
    const {id} = useParams();
    const currentStory = story.filter((story) => story.id === id)[0]
    const currentPage = 0

    function retrieveAudio() {
        // retrieve audio from elevenlabs
        setAudioState("PLAYABLE")
    }

    return(
        <div className="w-full min-h-screen bg-background">
            <Navigation page="Story"/>
            <main className="w-full flex">
                <section className="w-3/4 flex flex-col items-center bg-accent p-2">
                    {/* Figure out what order you want these to be, maybe make into a component */}
                    <Table className="w-2/3">
                        <TableBody>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell>{currentStory.title}</TableCell>
                            </TableRow>
                            <TableRow>
                                {/* SEE MORE */}
                                <TableCell>Plot</TableCell>
                                <TableCell>{currentStory.storySeed}</TableCell>
                            </TableRow>
                            <TableRow>
                                {/* SEE MORE */}
                                <TableCell>Tags</TableCell>
                                <TableCell>
                                    <Collapsible>
                                        <CollapsibleTrigger className="cursor-pointer">Genre, Theme, Tone</CollapsibleTrigger>
                                        <CollapsibleContent>
                                            <Table>
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell>Genre</TableCell>
                                                        <TableCell>{currentStory.tags.genre.join(', ')}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>Theme</TableCell>
                                                        <TableCell>{currentStory.tags.theme.join(', ')}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>Tone</TableCell>
                                                        <TableCell>{currentStory.tags.tone.join(', ')}</TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </CollapsibleContent>
                                    </Collapsible>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Story Type</TableCell>
                                <TableCell>{currentStory.storyType}</TableCell>
                            </TableRow>
                            <TableRow>
                                {/* SEE MORE */}
                                <TableCell>Summary</TableCell>
                                <TableCell>{currentStory.summary.text}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

                    <div className="flex flex-col">
                        <div>
                            <h1 className="text-center">{currentStory.pages[currentPage].chapterTitle.text}</h1>
                            <div className="flex justify-center items-center border-2 py-3">
                                {audioState === "NONE"? 
                                    (    <div>
                                            <button onClick={retrieveAudio} className="cursor-pointer flex gap-2">
                                                retrieve audio <HardDriveDownload />
                                            </button>
                                        </div>
                                    ) : (
                                        <Audio audioUrl="/story-audio/flash-fiction.mp3"/>  
                                    )
                                }                            
                            </div>
                        </div>
                        <ul>
                            {currentStory.pages[currentPage].sentences.map((sentence, index) => (
                                <li key={`pageStorySentence-${index}`}>{sentence.text}</li>
                            ))}
                        </ul>
                    </div>
                </section>
                <section className="w-1/4 px-4 py-2">
                    <p className="font-semibold text-lg underline text-center mb-2">VOCABULARY</p>
                    <Accordion type="single" collapsible className="w-full">
                        {currentStory.pages[currentPage].vocab.map((vocab, index) => (
                            <AccordionItem value={`vocab-${index}`} key={`vocab-${index}`}>
                                <AccordionTrigger className="p-3 flex justify-center">{vocab.text.toUpperCase()}</AccordionTrigger>
                                <AccordionContent className="max-h-120 overflow-auto hide-scrollbar">
                                    <Table>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>Text</TableCell>
                                                <TableCell>{vocab.text}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>P.O.S</TableCell>
                                                <TableCell>{vocab.pos}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Translation</TableCell>
                                                <TableCell>{vocab.translation}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Context</TableCell>
                                                <TableCell>{vocab.sentence_context}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                    <div className="w-full flex justify-between p-2 mt-6">
                        <Button>
                            EXPORT TO CSV
                        </Button>
                        <Button>
                            ADD TO VOCAB LIST
                        </Button>
                    </div>
                </section>   
            </main>
        </div>
    )
}