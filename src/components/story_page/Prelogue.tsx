import Main from "../tags/Main";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useRouter } from "next/navigation";
import { Story } from "@/story";
import { ParamValue } from "next/dist/server/request/params";
import { ArrowBigRight } from "lucide-react";

export default function Prelogue({
  currentStory,
  id,
}: {
  currentStory: Story;
  id: ParamValue;
}) {
  const router = useRouter();
  return (
    <Main
      page="Story"
      className="h-[calc(100vh-5rem)] space-y-4 overflow-auto p-3"
    >
      <Table className="w-2/3 max-md:w-full">
        <TableBody>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>{currentStory.title}</TableCell>
          </TableRow>
          <TableRow>
            {/* SEE MORE */}
            <TableCell>Plot</TableCell>
            <TableCell>{currentStory.storySeed}</TableCell>
          </TableRow>
          <TableRow>
            {/* SEE MORE */}
            <TableCell>Tags</TableCell>
            <TableCell>
              <Collapsible>
                <CollapsibleTrigger className="cursor-pointer">
                  Genre, Theme, Tone
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell>Genre</TableCell>
                        <TableCell>
                          {currentStory.tags.genre.join(", ")}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Theme</TableCell>
                        <TableCell>
                          {currentStory.tags.theme.join(", ")}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Tone</TableCell>
                        <TableCell>
                          {currentStory.tags.tone.join(", ")}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CollapsibleContent>
              </Collapsible>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell>{currentStory.storyType}</TableCell>
          </TableRow>
          <TableRow>
            {/* SEE MORE */}
            <TableCell>Summary</TableCell>
            <TableCell>{currentStory.summary.text}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div className="flex justify-center gap-3">
        <Button
          variant={"outline"}
          size={"lg"}
          onClick={() => router.push(`/story/${id}?page=${2}`)}
        >
          <ArrowBigRight className="size-8" />
        </Button>
      </div>
    </Main>
  );
}
