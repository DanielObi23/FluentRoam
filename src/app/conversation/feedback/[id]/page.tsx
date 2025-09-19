"use client";

import SessionVocabTable from "@/components/conversation_page/SessionVocabTable";
import { userSessions } from "@/userSessions";
import { VocabEntry } from "@/components/conversation_page/SessionVocabTable";
import { UserSession } from "@/userSessions";
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

//TODO: REMEMBER TO ADD IDIOM'S COUNTRY OF ORIGIN TO IDIOM'S LIST,
// ALSO ASK FOR MULTIPLE IDIOMS IN THE LIST IF APPLICABLE
// ALSO ASK FOR MULTIPLE REGIONAL VARIATIONS IN THE LIST IF APPLICABLE
// EITHER IMPROVE MARKDOWN FORMATTING OF FEEDBACK, OR SEPARATE INTO DIFFERENT KEYS IN FEEDBACK KEY e.g cultural insights, error highlighting etc
// FEEDBACK SHOULD BE BILINGUAL, THE USER'S NATIVE LANGUAGE (EXPLANTIONS) AND LANGUAGE USER'S LEARNING
// ADD IDIOMS ALONG WITH VOCAB TO VOCAB LIST

//THINK ABOUT ADD TRANSCRIPT INTO THIS AS WELL

export default function Page() {
  const { id } = useParams();
  const sessionList = userSessions.filter(
    (session) => session.session_id === id,
  );
  const session: UserSession = sessionList[0];

  const date = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
  }).format(new Date(session.created_at));

  async function practice() {
    const result = await axios.get("/api/call");
    console.log(result);
  }

  return (
    <Main
      page="Feedback"
      className="flex gap-x-3 max-lg:flex-col lg:overflow-clip"
    >
      <section className="dark:bg-primary/10 bg-primary-800/30 w-3/4 px-4 py-2 max-lg:w-full max-md:h-[calc(100vh-5rem)] md:h-full">
        <SessionFeedback
          date={date}
          feedback={session.feedback}
          role_scenario={session.role_scenario}
          title={session.title}
        />
      </section>

      <section className="flex flex-col gap-3 space-y-3 px-4 py-2 max-lg:flex max-lg:w-full max-md:h-[calc(100vh-5rem)] md:h-full md:flex-row lg:flex-col xl:w-1/4">
        {/* CALL SESSION AUDIO RECORDING */}
        <div className="w-full md:order-2 md:w-1/3 lg:order-1 lg:w-full">
          <p className="mb-2 text-center text-lg font-semibold">
            Play Recording
          </p>
          <Audio audioUrl="https://storage.vapi.ai/007515c7-0c90-474b-a0f2-289501f9d702-1754847784236-809ef4dc-f98e-4915-98ef-56f7aa260af4-mono.mp3" />
        </div>
        <Separator className="hidden lg:order-2 lg:block" />
        <div className="h-2/3 w-full md:order-1 md:w-2/3 lg:order-2 lg:w-full">
          {/* ADD VOCAB */}
          <div className="mb-2 flex w-full items-center justify-evenly">
            <p className="text-center text-lg font-semibold underline">
              VOCABULARY
            </p>
            <SessionAddVocab vocabulary={session.target_vocabulary} />
          </div>

          {/* VOCAB TABLE */}
          <Accordion type="single" collapsible className="w-full">
            <ScrollArea className="h-[calc(100vh-25rem)] w-full">
              {session.target_vocabulary.map(
                (vocab: VocabEntry, index: number) => (
                  <AccordionItem
                    value={`vocab-${index}`}
                    key={`vocab-${index}`}
                  >
                    <AccordionTrigger className="flex justify-center p-3">
                      {vocab.vocab.toUpperCase()}
                    </AccordionTrigger>
                    <AccordionContent className="hide-scrollbar max-h-120 overflow-auto">
                      <SessionVocabTable vocab={vocab} index={index} />
                    </AccordionContent>
                  </AccordionItem>
                ),
              )}
            </ScrollArea>
          </Accordion>
        </div>
      </section>
    </Main>
  );
}
