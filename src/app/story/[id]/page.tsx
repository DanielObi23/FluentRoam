"use client";
export const dynamic = "force-dynamic";

import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { parseAsInteger, useQueryState } from "nuqs";
import Main from "@/components/tags/Main";
import Prelogue from "@/components/story_page/Prelogue";
import { ScrollArea } from "@/components/ui/scroll-area";
import VoiceSelect from "@/components/VoiceSelect";
import usePlayAudio from "@/hooks/use-playAudio";
import StoryChapterVocabList from "@/components/story_page/StoryChapterVocabList";
import type { CurrentPage } from "@/utils/storyData/types";
import StoryAccordion from "@/components/story_page/StoryAccordion";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "@/components/UI_state/Loading";
import Error from "@/components/UI_state/Error";
import AddVocab from "@/components/AddVocab";
import { VocabEntry } from "@/utils/vocabData/types";

export default function Page() {
  const [currentPage, setCurrentPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(1),
  );
  const [story, setStory] = useState<CurrentPage>();
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const { id } = useParams();
  const { playAudio, voiceList } = usePlayAudio();

  useEffect(() => {
    async function getStory() {
      try {
        const result = await axios.post("/api/story/read", {
          id,
          page: currentPage,
        });
        setStory(result.data);
        setIsDataLoading(false);
      } catch (err) {
        setHasError(true);
        console.error(err);
      }
    }
    getStory();
  }, [currentPage, id]);

  if (isDataLoading) {
    return <Loading />;
  }

  if (hasError) {
    return <Error />;
  }

  if (currentPage === 1) {
    return <Prelogue id={id} setCurrentPage={setCurrentPage} />;
  }

  // Prop for Add Vocab
  const vocabulary = story?.page.vocab.map((vocab) => ({
    text: vocab.text,
    translation: vocab.translation,
    pos: vocab.pos,
    context: vocab.sentence_context,
  }));

  return (
    <Main page="Story" className="flex gap-5 max-md:flex-col">
      {/* STORY */}
      <section className="flex w-2/3 flex-col items-center gap-3 max-md:w-full">
        <h1 className="text-center text-2xl font-semibold">
          {story?.page?.chapterTitle ?? ""}
        </h1>
        <ScrollArea className="max-h-[calc(100vh-12rem)] text-center">
          <StoryAccordion
            lines={story?.page?.sentences ?? []}
            playAudio={playAudio}
            voiceList={voiceList}
          />
        </ScrollArea>

        <div className="flex gap-3">
          <Button
            variant={"outline"}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            <ArrowBigLeft className="size-8" />
          </Button>
          <span className="text-lg font-semibold">Page {currentPage}</span>
          <Button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            variant={"outline"}
            disabled={currentPage === story?.numOfPages}
          >
            <ArrowBigRight className="size-8" />
          </Button>
        </div>
      </section>

      {/* VOCABULARY */}
      <section className="flex w-1/3 flex-col place-items-center gap-3 px-6 py-3 max-md:w-full">
        <VoiceSelect />
        <StoryChapterVocabList
          showPlayButton={voiceList.length > 0}
          vocabList={story?.page?.vocab ?? []}
          playAudio={playAudio}
        />
        <AddVocab vocabulary={vocabulary as VocabEntry[]} />
      </section>
    </Main>
  );
}
