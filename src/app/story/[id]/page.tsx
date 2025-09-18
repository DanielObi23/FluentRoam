"use client";

import { useParams, useRouter } from "next/navigation";
import { Story, story } from "@/story";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Audio from "@/components/Audio";
import { useState } from "react";
import { BookOpen, HardDriveDownload } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { parseAsInteger, useQueryState } from "nuqs";
import Main from "@/components/tags/Main";
import Prelogue from "@/components/story_page/Prelogue";

// ADD A WAY FOR USERS TO JUMP TO ANY PAGE WITHIN THE NUMBER OF POSSIBLE PAGES
// USE COMBINATION OF SELECT AND PAGINATION

export default function Page() {
  const [audioState, setAudioState] = useState<"NONE" | "PLAYABLE">("NONE");
  const [currentPage, setCurrentPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(1),
  );
  const { id } = useParams();
  const currentStory = story.filter((story) => story.id === id)[0];
  const router = useRouter();
  // const currentPage = 1
  const storyPage = currentPage - 2; // decide between calling it storyPage and chapter

  function retrieveAudio() {
    // retrieve audio from elevenlabs
    setAudioState("PLAYABLE");
  }

  if (currentPage === 1) {
    // EXPORT TO COMPONENT AND CALL IT PRELOGUE
    return <Prelogue currentStory={currentStory} id={id} />;
  }

  return (
    <Main page="Story">
      {/* <div className="flex w-full gap-3 overflow-auto max-md:h-[calc(100vh-6rem)]"></div> */}
      <section className="flex flex-col items-center p-2 max-lg:w-full max-md:h-[calc(100vh-6rem)]">
        <Card className="bg-secondary-300 dark:bg-secondary-950 border-primary-500 dark:border-secondary-950 h-screen w-full overflow-auto text-center">
          <CardHeader>
            <CardTitle className="text-secondary-950 dark:text-secondary-200 flex items-center justify-center gap-2 text-2xl font-bold">
              <BookOpen className="size-8" />
              {currentStory.pages[storyPage].chapterTitle.text}
            </CardTitle>
          </CardHeader>
          {/* Think of adding prose */}
          <CardContent className="place-items-center">
            <div className="text-primary-950 dark:text-primary-100 space-y-3 text-start indent-8 leading-relaxed text-pretty">
              {/* Span tag for stories, P tag stage play and poetry*/}
              {currentStory.pages[storyPage].sentences.map(
                (sentence, index) => (
                  <p
                    key={`pageStorySentence-${index}`}
                    className="text-lg font-semibold"
                  >
                    {sentence.text}&nbsp;
                  </p>
                ),
              )}
            </div>
          </CardContent>
        </Card>
      </section>
      <section className="w-1/3 space-y-4 px-4 py-2 max-md:hidden">
        <div className="w-full place-items-center space-y-4">
          <div className="flex gap-3">
            <Button onClick={router.back}>Previous Page</Button>
            <span className="text-lg font-semibold">Page {currentPage}</span>
            <Button
              onClick={() =>
                router.push(`/story/${id}?page=${currentPage + 1}`)
              }
              disabled={storyPage + 1 === currentStory.pages.length}
            >
              Go to next page
            </Button>
          </div>
          {audioState === "NONE" ? (
            <div className="flex items-center justify-center border-2 p-3">
              <button
                onClick={retrieveAudio}
                className="flex cursor-pointer gap-2 font-semibold"
              >
                Retrieve audio <HardDriveDownload />
              </button>
            </div>
          ) : (
            <Audio audioUrl="/story-audio/flash-fiction.mp3" />
          )}
        </div>
        <p className="mb-2 text-center text-lg font-semibold underline">
          VOCABULARY
        </p>
        <Accordion type="single" collapsible className="w-full">
          {currentStory.pages[storyPage].vocab.map((vocab, index) => (
            <AccordionItem value={`vocab-${index}`} key={`vocab-${index}`}>
              <AccordionTrigger className="flex justify-center p-3">
                {vocab.text.toUpperCase()}
              </AccordionTrigger>
              <AccordionContent className="hide-scrollbar max-h-120 overflow-auto">
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
        <div className="mt-6 flex w-full justify-between p-2">
          <Button>EXPORT TO CSV</Button>
          <Button>ADD TO VOCAB LIST</Button>
        </div>
      </section>
    </Main>
  );
}
