"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { story } from "@/story";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";

export default function StoryHistory() {
  const isMobile = useIsMobile();
  const router = useRouter();
  let storyList;
  if (isMobile) {
    storyList = story.slice(story.length - 3); //Getting the last 5 stories done
  } else {
    storyList = story.slice(story.length - 5); //Getting the last 5 stories done
  }

  const calendarMonth = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="dark:bg-primary/10 p-3">
      <p className="font-ui mb-2.5 text-center text-xl font-semibold md:text-3xl">
        Story History
      </p>
      <Table className="border-2">
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
          {storyList.map((story) => {
            const d = new Date(story.created_at);
            const day = d.getDate();
            const month = d.getMonth();
            const year = d.getFullYear();
            return (
              <TableRow key={story.id}>
                <TableCell>
                  <Button onClick={() => router.push(`/story/${story.id}`)}>
                    View Story
                  </Button>
                </TableCell>
                <TableCell className="max-w-xs">{story.title}</TableCell>
                <TableCell>{story.storyType}</TableCell>
                <TableCell>{story.proficiency}</TableCell>
                <TableCell>{story.tags.genre.join(", ")}</TableCell>
                <TableCell>{story.tags.theme.join(", ")}</TableCell>
                <TableCell>{story.tags.tone.join(", ")}</TableCell>
                <TableCell>{`${day} ${calendarMonth[month]}, ${year}`}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
