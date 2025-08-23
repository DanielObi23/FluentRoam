"use client"

import Navigation from "@/components/app_layout/Navigation";
import { useParams, useRouter } from "next/navigation";
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
import { BookOpen, HardDriveDownload } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { parseAsInteger, useQueryState } from "nuqs"

export default function Page() {
    const [audioState, setAudioState] = useState<"NONE" | "PLAYABLE" >("NONE")
    const [currentPage, setCurrentPage] = useQueryState("page", parseAsInteger.withDefault(1))
    const {id} = useParams();
    const currentStory = story.filter((story) => story.id === id)[0]
    const router = useRouter()
    // const currentPage = 1
    const storyPage = currentPage - 2 // decide between calling it storyPage and chapter

    function retrieveAudio() {
        // retrieve audio from elevenlabs
        setAudioState("PLAYABLE")
    }

    if (currentPage === 1) {
        // EXPORT TO COMPONENT AND CALL IT PRELOGUE
        return (
            <div className="w-full">
                <Navigation page="Story"/>
                <main className="flex flex-col p-3">
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
                    <div className="flex gap-3">
                        <Button onClick={router.back}>Previous Page</Button>
                        <span className="text-lg font-semibold">Page {currentPage}</span>
                        <Button onClick={()=>router.push(`/story/${id}?page=${currentPage + 1}`)}>
                            Go to next page
                        </Button>
                    </div>
                </main>
            </div>
        )
    }

    return(
        <div className="w-full min-h-screen bg-background">
            <Navigation page="Story"/>
            <main className="w-full flex">
                <section className="w-2/3 flex flex-col items-center p-2">
                    <div className="flex w-full gap-3">
                        <Card className="w-full text-center bg-secondary-300 dark:bg-secondary-950 border-primary-500 dark:border-secondary-950 h-screen overflow-auto">
                            <CardHeader>
                                <CardTitle className="text-2xl text-secondary-950 dark:text-secondary-200 font-bold flex justify-center items-center gap-2">
                                    <BookOpen className="size-8" />
                                    {currentStory.pages[storyPage].chapterTitle.text}
                                </CardTitle>
                            </CardHeader>
                            {/* Think of adding prose */}
                            <CardContent className="place-items-center"> 
                                <div className="indent-8 text-pretty space-y-3 text-start text-primary-950 dark:text-primary-100 leading-relaxed">
                                    {/* Span tag for stories, P tag stage play and poetry*/}
                                    {currentStory.pages[storyPage].sentences.map((sentence, index) => (
                                        <span 
                                            key={`pageStorySentence-${index}`}
                                            className="font-semibold text-lg"
                                            >
                                                {sentence.text}&nbsp;
                                        </span>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>
                <section className="w-1/3 px-4 py-2 space-y-4">
                    <div className="w-full space-y-4 place-items-center">
                        <div className="flex gap-3">
                            <Button onClick={router.back}>Previous Page</Button>
                            <span className="text-lg font-semibold">Page {currentPage}</span>
                            <Button onClick={()=>router.push(`/story/${id}?page=${currentPage + 1}`)}>
                                Go to next page
                            </Button>
                        </div>
                        {audioState === "NONE"? 
                            (    <div className="flex justify-center items-center border-2 p-3">
                                    <button onClick={retrieveAudio} className="cursor-pointer flex gap-2 font-semibold">
                                        Retrieve audio <HardDriveDownload />
                                    </button>
                                </div>
                            ) : (
                                <Audio audioUrl="/story-audio/flash-fiction.mp3"/>  
                            )
                        }         
                    </div>
                    <p className="font-semibold text-lg underline text-center mb-2">VOCABULARY</p>
                    <Accordion type="single" collapsible className="w-full">
                        {currentStory.pages[storyPage].vocab.map((vocab, index) => (
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