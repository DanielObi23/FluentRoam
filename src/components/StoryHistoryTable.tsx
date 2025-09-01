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
import { Story } from "@/story";

export default function StoryHistoryTable({
  className,
  storyList,
}: {
  className?: string;
  storyList: Story[];
}) {
  if (storyList.length === 0) {
    return (
      <div
        role="status"
        className="bg-secondary/50 flex w-full items-center justify-around p-5"
      >
        <p className="text-lg font-semibold md:text-2xl">
          No Story History Available
        </p>
        <Button asChild>
          <Link href="/story/create">Create Story</Link>
        </Button>
      </div>
    );
  }
  return (
    <Table className={className}>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Story Type</TableHead>
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
                  <Link href={`/story/${story.id}`}>View Story</Link>
                </Button>
              </TableCell>
              <TableCell className="max-w-xs">{story.title}</TableCell>
              <TableCell>{story.storyType}</TableCell>
              <TableCell>{story.proficiency}</TableCell>
              <TableCell>{story.tags.genre.join(", ")}</TableCell>
              <TableCell>{story.tags.theme.join(", ")}</TableCell>
              <TableCell>{story.tags.tone.join(", ")}</TableCell>
              <TableCell>
                {new Intl.DateTimeFormat("en-GB", {
                  dateStyle: "short",
                }).format(new Date(story.created_at))}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
