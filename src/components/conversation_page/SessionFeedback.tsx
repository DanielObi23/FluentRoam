import { Button } from "@/components/ui/button";
import Markdown from "react-markdown";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export default function SessionFeedback({
  date,
  title,
  role_scenario,
  feedback,
}: {
  date: string;
  title: string;
  role_scenario: string;
  feedback: string;
}) {
  return (
    <>
      <p className="text-start font-semibold md:mt-5">{date}</p>
      <h1 className="text-center text-2xl font-semibold">Title: {title}</h1>
      <p className="text-center">Role Scenario: {role_scenario}</p>
      <Separator className="my-3 bg-white" />
      <ScrollArea className="bg-background h-[calc(100vh-21rem)] px-2">
        <Markdown>{feedback}</Markdown>
      </ScrollArea>

      <div className="mt-4.5 mb-3 grid w-full grid-cols-12 gap-x-4 px-4">
        <Button className="col-span-6">Export to PDF</Button>
        <Button
          className="col-span-6"
          onClick={() =>
            console.log(
              `retrieve all the data from backend, push to form's page,
                 fill in the forms with the data, to let users update it, 
                 update the form id, if it's different from previous, else leave it alone`,
            )
          }
        >
          Redo Scenario
        </Button>
      </div>
    </>
  );
}
