import Navigation from "@/components/app_layout/Navigation";
import VocabTable from "@/components/conversation_page/VocabTable";
import { Button } from "@/components/ui/button";
import { userSessions } from "@/userSessions";
import Markdown from 'react-markdown'
import { VocabEntry } from "@/components/conversation_page/VocabTable";
import { UserSession } from "@/userSessions";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

//TODO: REMEMBER TO ADD IDIOM'S COUNTRY OF ORIGIN TO IDIOM'S LIST, 
// ALSO ASK FOR MULTIPLE IDIOMS IN THE LIST IF APPLICABLE
// ALSO ASK FOR MULTIPLE REGIONAL VARIATIONS IN THE LIST IF APPLICABLE
// EITHER IMPROVE MARKDOWN FORMATTING OF FEEDBACK, OR SEPARATE INTO DIFFERENT KEYS IN FEEDBACK KEY e.g cultural insights, error highlighting etc
// FEEDBACK SHOULD BE BILINGUAL, THE USER'S NATIVE LANGUAGE (EXPLANTIONS) AND LANGUAGE USER'S LEARNING

export default async function Page({params}: {params: Promise<{id: string}>}) {
    const {id} = await params;
    const sessionList = userSessions.filter((session) => session.session_id === id)
    const session: UserSession = sessionList[0]

    const d = new Date(session.created_at)
    const day = d.getDate()
    const month = d.getMonth()
    const year = d.getFullYear()
    const calendarMonth = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    return (
        <div className="w-full h-screen">
            <Navigation page="feedback" />
            <main className="w-full h-full flex items-baseline">
                <section className="w-3/4 px-4 py-2">
                    <h1 className="text-2xl font-semibold text-center mt-5">Title: {session.title}</h1>
                    <p className="text-center">Role Scenario: {session.role_scenario}</p>
                    <p className="text-start">{day} {calendarMonth[month]}, {year}</p>
                    <div className="text-center">
                        <Markdown>{session.feedback}</Markdown>
                    </div>
                    <div className="grid grid-cols-12 w-full gap-x-4 px-4 mt-10 ">
                        <Button className="col-span-3">
                            Download Audio
                        </Button>
                        <Button className="col-span-3">
                            Export to Markdown
                        </Button>
                        <Button className="col-span-3">
                            Export to PDF
                        </Button>
                    </div>
                </section>
                
                <section className="w-1/4 px-4 py-2">
                    <p className="font-semibold text-lg underline text-center mb-2">VOCABULARY</p>
                    <Accordion type="single" collapsible className="w-full">
                        {session.target_vocabulary.map((vocab: VocabEntry, index: number) => (
                            <AccordionItem value={`vocab-${index}`} key={`vocab-${index}`}>
                                <AccordionTrigger className="p-3 flex justify-center">{vocab.vocab.toUpperCase()}</AccordionTrigger>
                                <AccordionContent className="max-h-120 overflow-auto hide-scrollbar">
                                    <VocabTable  vocab={vocab} index={index}/>
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