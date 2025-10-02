"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import StoryHistoryTable from "@/components/story_page/StoryHistoryTable";
import type { StoryHistory } from "@/utils/storyData/types";
import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../loading";
import Error from "../error";

export default function StoryHistory() {
  const isMobile = useIsMobile();
  const [story, setStory] = useState<StoryHistory[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    async function getHistory() {
      try {
        const result = await axios.post("/api/story", {
          pageLimit: isMobile ? 3 : 5,
        });
        setStory(result.data);
      } catch (err) {
        setHasError(true);
      }
      setIsLoading(false);
    }

    getHistory();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (hasError) {
    return <Error />;
  }

  return (
    <StoryHistoryTable
      className="bg-secondary/70 border-secondary/70 border-2"
      storyList={story as StoryHistory[]}
    />
  );
}
