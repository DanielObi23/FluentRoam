"use client";

import SessionVocabTable from "@/components/conversation_page/SessionVocabTable";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useParams } from "next/navigation";
import axios from "axios";
import Audio from "@/components/Audio";
import Main from "@/components/tags/Main";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import SessionAddVocab from "@/components/conversation_page/SessionAddVocab";
import SessionFeedback from "@/components/conversation_page/SessionFeedback";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";

interface RegionalVariation {
  country: string;
  word: string;
  part_of_speech: string;
  meaning: string[];
  example: {
    sentence: string;
    translation: string;
  };
}

interface VocabEntry {
  vocab: string;
  part_of_speech: string;
  meaning: string[];
  tone: "Casual" | "Neutral" | "Formal" | string;
  regional_variations: RegionalVariation[];
  examples: {
    sentence: string;
    translation: string;
  }[];
  idioms: {
    phrase: string;
    meaning: string;
  }[];
  synonyms: string[];
  antonyms: string[];
}

type UserSession = {
  session_type: "chat" | "call";
  title: string;
  scenario: string;
  proficiency: "A2" | "B1" | "B2";
  feedback: string;
  vocabulary: VocabEntry[];
  audio: string;
  created_at: string;
};

const emptySession: UserSession = {
  session_type: "chat",
  title: "",
  scenario: "",
  proficiency: "A2",
  feedback: "",
  vocabulary: [],
  audio: "",
  created_at: new Date().toISOString(),
};

export default function Page() {
  const { id } = useParams();
  const [session, setSession] = useState<UserSession>(emptySession);

  useEffect(() => {
    async function getFeedback() {
      try {
        const result = await axios.get(`/api/conversation/feedback/${id}`);
        setSession(result.data);
      } catch (err) {
        console.error("Error retrieving session");
      }
    }
    getFeedback();
  }, []);

  if (session === emptySession) return <Loading />;

  const date = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
  }).format(new Date(session.created_at));

  return (
    <Main
      page="Feedback"
      className="flex gap-x-3 max-lg:flex-col lg:overflow-clip"
    >
      <section className="dark:bg-primary/10 bg-primary-800/30 w-3/4 px-4 py-2 max-lg:w-full max-md:h-[calc(100vh-5rem)] md:h-full">
        <SessionFeedback
          date={date}
          feedback={session.feedback}
          scenario={session.scenario}
        />
      </section>

      <section className="mt-3 flex flex-col gap-3 space-y-3 px-4 py-2 max-lg:flex max-lg:w-full max-md:h-[calc(100vh-5rem)] md:h-full md:flex-row lg:flex-col xl:w-1/4">
        {/* CALL SESSION AUDIO RECORDING */}
        {session.audio && (
          <div className="w-full md:order-2 md:w-1/3 lg:order-1 lg:w-full">
            <p className="mb-2 text-center text-lg font-semibold">
              Play Recording
            </p>
            <Audio audioUrl={session.audio} />
          </div>
        )}

        <Separator className="hidden lg:order-2 lg:block" />
        <div className="h-2/3 w-full md:order-1 md:w-2/3 lg:order-2 lg:w-full">
          {/* ADD VOCAB */}
          <div className="mb-2 flex w-full items-center justify-evenly">
            <p className="text-center text-lg font-semibold underline">
              VOCABULARY
            </p>
            <SessionAddVocab vocabulary={session.vocabulary} />
          </div>

          {/* VOCAB TABLE */}
          <Accordion type="single" collapsible className="w-full">
            <ScrollArea className="h-[calc(100vh-25rem)] w-full">
              {session.vocabulary.map((vocab, index: number) => (
                <AccordionItem value={`vocab-${index}`} key={`vocab-${index}`}>
                  <AccordionTrigger className="flex justify-center p-3">
                    {vocab.vocab.toUpperCase()}
                  </AccordionTrigger>
                  <AccordionContent className="hide-scrollbar max-h-120 overflow-auto">
                    <SessionVocabTable vocab={vocab} index={index} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </ScrollArea>
          </Accordion>
        </div>
      </section>
    </Main>
  );
}
