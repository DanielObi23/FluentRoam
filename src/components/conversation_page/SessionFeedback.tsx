import { Button } from "@/components/ui/button";
import Markdown from "react-markdown";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export default function SessionFeedback({
  date,
  scenario,
  feedback,
}: {
  date: string;
  scenario: string;
  feedback: string;
}) {
  return (
    <>
      <p className="text-start font-semibold md:mt-5">{date}</p>
      <h1 className="text-center text-2xl font-semibold">Scenario</h1>
      <p className="text-center">{scenario}</p>
      <Separator className="my-3 bg-white" />
      <ScrollArea className="bg-background h-[calc(100vh-18rem)] px-2">
        <Markdown>{feedback}</Markdown>
      </ScrollArea>
    </>
  );
}
