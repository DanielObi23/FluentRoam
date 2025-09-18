"use client";

import { useParams, useRouter } from "next/navigation";
import { story } from "@/story";
import { Button } from "@/components/ui/button";
import { ArrowBigLeft, ArrowBigRight, PlayCircle } from "lucide-react";
import { parseAsInteger, useQueryState } from "nuqs";
import Main from "@/components/tags/Main";
import Prelogue from "@/components/story_page/Prelogue";
import { ScrollArea } from "@/components/ui/scroll-area";
import VoiceSelect from "@/components/VoiceSelect";
import usePlayAudio from "@/hooks/use-playAudio";
import { Separator } from "@/components/ui/separator";
import StoryChapterVocabList from "@/components/story_page/StoryChapterVocabList";

export default function Page() {
  const [currentPage, setCurrentPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(1),
  );
  const { id } = useParams();
  const currentStory = story.find((s) => s.id === id)!;
  const router = useRouter();
  const storyPage = currentPage - 2;
  const { playAudio, voiceList } = usePlayAudio();

  if (currentPage === 1) {
    return <Prelogue currentStory={currentStory} id={id} />;
  }

  return (
    <Main page="Story" className="flex gap-5 max-md:flex-col">
      {/* STORY */}
      <section className="flex w-2/3 flex-col items-center gap-3 max-md:w-full">
        <h1 className="text-center text-2xl font-semibold">
          {currentStory.pages[storyPage].chapterTitle.text}
        </h1>
        <ScrollArea className="max-h-[calc(100vh-12rem)] text-center">
          <div className="text-primary-950 dark:text-primary-100 space-y-3 text-pretty">
            {currentStory.pages[storyPage].sentences.map((sentence, index) => (
              <div key={`pageStorySentence-${index}`} className="space-y-3">
                <p className="flex items-center gap-2 pr-4 text-lg font-semibold">
                  {voiceList.length > 0 && (
                    <Button
                      size={"icon"}
                      variant={"ghost"}
                      onClick={() => playAudio(sentence.text)}
                    >
                      <PlayCircle className="size-7" />
                    </Button>
                  )}
                  {sentence.text}&nbsp;
                </p>
                <Separator />
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="flex gap-3">
          <Button variant={"outline"} onClick={router.back}>
            <ArrowBigLeft className="size-8" />
          </Button>
          <span className="text-lg font-semibold">Page {currentPage}</span>
          <Button
            onClick={() => router.push(`/story/${id}?page=${currentPage + 1}`)}
            variant={"outline"}
            disabled={storyPage + 1 === currentStory.pages.length}
          >
            <ArrowBigRight className="size-8" />
          </Button>
        </div>
      </section>

      {/* VOCABULARY */}
      <section className="flex w-1/3 flex-col place-items-center px-6 py-3 max-md:w-full">
        <VoiceSelect />
        <StoryChapterVocabList
          showPlayButton={voiceList.length > 0}
          vocabList={currentStory.pages[storyPage].vocab}
          playAudio={playAudio}
        />
        <Button className="mx-auto md:ml-auto">ADD TO VOCAB LIST</Button>
      </section>
    </Main>
  );
}
