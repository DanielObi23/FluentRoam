import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";
import type { VocabEntry } from "@/utils/storyData/types";

export default function StoryChapterVocabList({
  showPlayButton,
  vocabList,
  playAudio,
}: {
  showPlayButton: boolean;
  vocabList: VocabEntry[];
  playAudio: (text: string) => void;
}) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {vocabList.map((vocab, index) => (
        <AccordionItem value={`vocab-${index}`} key={`vocab-${index}`}>
          <AccordionTrigger className="flex justify-center p-3">
            {vocab.text.toUpperCase()}
          </AccordionTrigger>
          <AccordionContent className="hide-scrollbar max-h-120 overflow-auto">
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="flex items-center gap-1">
                    Text
                    {showPlayButton && (
                      <Button
                        size={"icon"}
                        variant={"ghost"}
                        onClick={() => playAudio(vocab.text)}
                      >
                        <PlayCircle className="size-7" />
                      </Button>
                    )}
                  </TableCell>
                  <TableCell>{vocab.text}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>P.O.S</TableCell>
                  <TableCell>{vocab.pos}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Translation</TableCell>
                  <TableCell>{vocab.translation}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="flex items-center gap-1">
                    Context
                    {showPlayButton && (
                      <Button
                        size={"icon"}
                        variant={"ghost"}
                        onClick={() => playAudio(vocab.sentence_context)}
                      >
                        <PlayCircle className="size-7" />
                      </Button>
                    )}
                  </TableCell>
                  <TableCell>{vocab.sentence_context}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
