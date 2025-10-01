import { Button } from "@/components/ui/button";
import { PlusIcon, PlayCircle } from "lucide-react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";

export default function StoryAccordion({
  lines,
  voiceList,
  playAudio,
}: {
  lines: { text: string; translation: string }[];
  voiceList: SpeechSynthesisVoice[];
  playAudio: (text: string) => void;
}) {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue="item-1"
    >
      {lines.map((line, index) => (
        <AccordionItem key={index} value={`item-${index + 1}`}>
          <AccordionPrimitive.Header className="flex">
            <AccordionPrimitive.Trigger
              data-slot="accordion-trigger"
              className="focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-45"
            >
              <span className="flex items-center gap-4">
                <p className="flex items-center gap-2 text-lg font-semibold">
                  {voiceList.length > 0 && (
                    <Button
                      size={"icon"}
                      variant={"ghost"}
                      onClick={() => playAudio(line.text)}
                      asChild
                    >
                      <PlayCircle className="size-7" />
                    </Button>
                  )}
                  {line.text}
                </p>
              </span>
              <PlusIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 transition-transform duration-200" />
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionContent className="text-lg">
            {line.translation}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
