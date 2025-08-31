"use client";

import Navigation from "@/components/app_layout/Navigation";
import VocabTable from "@/components/conversation_page/VocabTable";
import { Button } from "@/components/ui/button";
import { userSessions } from "@/userSessions";
import Markdown from "react-markdown";
import { VocabEntry } from "@/components/conversation_page/VocabTable";
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

//TODO: REMEMBER TO ADD IDIOM'S COUNTRY OF ORIGIN TO IDIOM'S LIST,
// ALSO ASK FOR MULTIPLE IDIOMS IN THE LIST IF APPLICABLE
// ALSO ASK FOR MULTIPLE REGIONAL VARIATIONS IN THE LIST IF APPLICABLE
// EITHER IMPROVE MARKDOWN FORMATTING OF FEEDBACK, OR SEPARATE INTO DIFFERENT KEYS IN FEEDBACK KEY e.g cultural insights, error highlighting etc
// FEEDBACK SHOULD BE BILINGUAL, THE USER'S NATIVE LANGUAGE (EXPLANTIONS) AND LANGUAGE USER'S LEARNING
// ADD IDIOMS ALONG WITH VOCAB TO VOCAB LIST

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
    <div className="h-screen w-full">
      <Navigation page="feedback" />
      <main className="flex h-full w-full items-baseline">
        <section className="w-3/4 px-4 py-2">
          <Audio audioUrl="https://storage.vapi.ai/007515c7-0c90-474b-a0f2-289501f9d702-1754847784236-809ef4dc-f98e-4915-98ef-56f7aa260af4-mono.mp3" />
          <h1 className="mt-5 text-center text-2xl font-semibold">
            Title: {session.title}
          </h1>
          <p className="text-center">Role Scenario: {session.role_scenario}</p>
          <p className="text-start">{date}</p>
          <div className="text-center">
            <Markdown>{session.feedback}</Markdown>
          </div>
          <div className="mt-10 grid w-full grid-cols-12 gap-x-4 px-4">
            <Button className="col-span-3" onClick={practice}>
              Download Audio
            </Button>
            <Button className="col-span-3">Export to Markdown</Button>
            <Button className="col-span-3">Export to PDF</Button>
          </div>
        </section>

        <section className="w-1/4 px-4 py-2">
          <p className="mb-2 text-center text-lg font-semibold underline">
            VOCABULARY
          </p>
          <Accordion type="single" collapsible className="w-full">
            {session.target_vocabulary.map(
              (vocab: VocabEntry, index: number) => (
                <AccordionItem value={`vocab-${index}`} key={`vocab-${index}`}>
                  <AccordionTrigger className="flex justify-center p-3">
                    {vocab.vocab.toUpperCase()}
                  </AccordionTrigger>
                  <AccordionContent className="hide-scrollbar max-h-120 overflow-auto">
                    <VocabTable vocab={vocab} index={index} />
                  </AccordionContent>
                </AccordionItem>
              ),
            )}
          </Accordion>
          <div className="mt-6 flex w-full justify-between p-2">
            <Button>EXPORT TO CSV</Button>
            <Button>ADD TO VOCAB LIST</Button>
          </div>
        </section>
      </main>
    </div>
  );
}
