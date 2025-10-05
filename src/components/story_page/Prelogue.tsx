import Main from "../tags/Main";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ParamValue } from "next/dist/server/request/params";
import { ArrowBigRight } from "lucide-react";
import Loading from "@/components/UI_state/Loading";
import Error from "@/components/UI_state/Error";
import { Separator } from "../ui/separator";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Prelogue({
  id,
  setCurrentPage,
}: {
  id: ParamValue;
  setCurrentPage: (number: number) => void;
}) {
  const [story, setStory] = useState({
    title: "",
    type: "",
    tags: { genre: [], theme: [], tone: [] },
    plot: "",
    summary: { text: "", translation: "" },
  });
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  useEffect(() => {
    async function getStory() {
      try {
        const result = await axios.post("/api/story/read", {
          id,
          page: 1,
        });
        setStory(result.data);
        setIsDataLoading(false);
      } catch (err) {
        setHasError(true);
        console.error(err);
      }
    }
    getStory();
  }, [id]);

  if (isDataLoading) {
    return <Loading />;
  }

  if (hasError) {
    return <Error />;
  }

  return (
    <Main
      page="Story"
      className="h-[calc(100vh-5rem)] space-y-4 overflow-auto p-3"
    >
      <Table className="w-2/3 max-md:w-full">
        <TableBody>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>{story.title}</TableCell>
          </TableRow>
          <TableRow>
            {/* SEE MORE */}
            <TableCell>Plot</TableCell>
            <TableCell>{story.plot}</TableCell>
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
                        <TableCell>{story.tags.genre.join(", ")}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Theme</TableCell>
                        <TableCell>{story.tags.theme.join(", ")}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Tone</TableCell>
                        <TableCell>{story.tags.tone.join(", ")}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CollapsibleContent>
              </Collapsible>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell>{story.type}</TableCell>
          </TableRow>
          <TableRow>
            {/* SEE MORE */}
            <TableCell>Summary</TableCell>
            <TableCell>
              <p>{story.summary.text}</p>
              <Separator className="my-3" />
              <p>{story.summary.translation}</p>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div className="flex justify-center gap-3">
        <Button
          variant={"outline"}
          size={"lg"}
          onClick={() => setCurrentPage(2)}
        >
          <ArrowBigRight className="size-8" />
        </Button>
      </div>
    </Main>
  );
}
