import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { StoryHistory } from "@/utils/storyData/types";

export default function StoryHistoryTable({
  className,
  storyList,
}: {
  className?: string;
  storyList: StoryHistory[];
}) {
  if (storyList.length === 0) {
    return (
      <div
        role="status"
        className="bg-secondary/50 flex w-full items-center justify-around gap-2 p-5"
      >
        <p className="text-lg font-semibold md:text-2xl">
          No Story History Available
        </p>
      </div>
    );
  }
  return (
    <Table className={className}>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead className="min-w-[10rem]">Plot</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Proficiency</TableHead>
          <TableHead>Genre</TableHead>
          <TableHead>Theme</TableHead>
          <TableHead>Tone</TableHead>
          <TableHead>Created At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {storyList.map((story, index) => {
          return (
            <TableRow key={`${story.id}-${index}`}>
              <TableCell>
                <Button asChild>
                  <Link href={`/story/${story.id}`}>
                    <p className="flex gap-0.5">
                      View <span className="hidden md:block">Story</span>
                    </p>
                  </Link>
                </Button>
              </TableCell>
              <TableCell className="max-w-xs">{story.plot}</TableCell>
              <TableCell>{story.type}</TableCell>
              <TableCell className="text-center">{story.proficiency}</TableCell>
              <TableCell className="text-black dark:text-white">
                {story.tags.genre.join(", ")}
              </TableCell>
              <TableCell>{story.tags.theme.join(", ")}</TableCell>
              <TableCell>{story.tags.tone.join(", ")}</TableCell>
              <TableCell>
                {new Intl.DateTimeFormat("en-GB", {
                  dateStyle: "short",
                }).format(story.createdAt)}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
