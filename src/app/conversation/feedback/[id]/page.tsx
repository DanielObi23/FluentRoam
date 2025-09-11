"use client";

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
import Main from "@/components/tags/Main";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const FormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});

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

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: ["recents", "home"],
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast("You submitted the following values", {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Main
      page="Feedback"
      className="flex gap-x-3 max-lg:flex-col lg:overflow-clip"
    >
      <section className="dark:bg-primary/10 bg-primary-800/30 w-3/4 px-4 py-2 max-lg:w-full max-md:h-[calc(100vh-5rem)] md:h-full">
        <p className="text-start font-semibold md:mt-5">{date}</p>
        <h1 className="text-center text-2xl font-semibold">
          Title: {session.title}
        </h1>
        <p className="text-center">Role Scenario: {session.role_scenario}</p>
        <Separator className="my-3 bg-white" />
        <ScrollArea className="bg-background h-[calc(100vh-21rem)]">
          <Markdown>{session.feedback}</Markdown>
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
      </section>

      <section className="flex flex-col gap-3 space-y-3 px-4 py-2 max-lg:flex max-lg:w-full max-md:h-[calc(100vh-5rem)] md:h-full md:flex-row lg:flex-col xl:w-1/4">
        <div className="w-full md:order-2 md:w-1/3 lg:order-1 lg:w-full">
          <p className="mb-2 text-center text-lg font-semibold">
            Play Recording
          </p>
          <Audio audioUrl="https://storage.vapi.ai/007515c7-0c90-474b-a0f2-289501f9d702-1754847784236-809ef4dc-f98e-4915-98ef-56f7aa260af4-mono.mp3" />
        </div>
        <Separator className="hidden lg:order-2 lg:block" />
        <div className="h-2/3 w-full md:order-1 md:w-2/3 lg:order-2 lg:w-full">
          <div className="mb-2 flex w-full items-center justify-evenly">
            <p className="text-center text-lg font-semibold underline">
              VOCABULARY
            </p>
            <Dialog>
              <form>
                <DialogTrigger asChild>
                  <Button className="dark:bg-primary/10 bg-primary-800/30">
                    ADD <span className="max-lg:hidden">TO VOCAB LIST</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogTitle className="">Vocab List</DialogTitle>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-8"
                    >
                      <FormField
                        control={form.control}
                        name="items"
                        render={() => (
                          <FormItem>
                            <div className="mb-4">
                              <FormLabel className="sr-only text-base">
                                Vocab List
                              </FormLabel>
                              <FormDescription>
                                Select the vocabs you want to add to vocab list.
                              </FormDescription>
                            </div>
                            {session.target_vocabulary.map(
                              (vocab: VocabEntry, index) => (
                                <FormField
                                  key={`${vocab.vocab}-${index}`}
                                  control={form.control}
                                  name="items"
                                  render={({ field }) => {
                                    return (
                                      <FormItem
                                        key={`${vocab.vocab}-${index}`}
                                        className="flex flex-row items-center gap-2"
                                      >
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value?.includes(
                                              `${vocab.vocab}-${index}`,
                                            )}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([
                                                    ...field.value,
                                                    `${vocab.vocab}-${index}`,
                                                  ])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) =>
                                                        value !==
                                                        `${vocab.vocab}-${index}`,
                                                    ),
                                                  );
                                            }}
                                          />
                                        </FormControl>
                                        <FormLabel className="text-sm font-normal capitalize">
                                          {vocab.vocab} | {vocab.meaning[0]}
                                        </FormLabel>
                                      </FormItem>
                                    );
                                  }}
                                />
                              ),
                            )}
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit">Submit</Button>
                    </form>
                  </Form>
                </DialogContent>
              </form>
            </Dialog>
          </div>

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
                      <VocabTable vocab={vocab} index={index} />
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
