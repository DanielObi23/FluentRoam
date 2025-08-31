"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { story, Story } from "@/story";
import StoryHistoryTable from "@/components/StoryHistoryTable";

export default function StoryHistory() {
  const isMobile = useIsMobile();
  const limit = isMobile ? 3 : 5;
  const storyList = (story as Story[]).slice(-limit);

  return (
    <StoryHistoryTable
      className="bg-secondary/70 border-secondary/70 border-2"
      storyList={storyList}
    />
  );
}
