"use client";

import StoryHistoryTable from "@/components/story_page/StoryHistoryTable";
import HistoryTable from "@/components/HistoryTable";
import useTable from "@/hooks/use-table";
import Main from "@/components/tags/Main";
import StoryForm from "@/components/story_page/StoryForm";
import { StoryHistory } from "@/utils/storyData/types";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "@/components/UI_state/Loading";
import Error from "@/components/UI_state/Error";

export default function Page() {
  const [story, setStory] = useState<StoryHistory[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const { page, search, pageLimit } = useTable();

  useEffect(() => {
    async function getHistory() {
      try {
        const result = await axios.post("/api/story", {
          page,
          search,
          pageLimit,
        });
        setStory(result.data);
      } catch (err) {
        setHasError(true);
        console.log(err);
        console.error("Error getting sessions");
      }

      setIsDataLoading(false);
    }

    getHistory();
  }, [pageLimit, page, search]);

  if (isDataLoading) {
    return <Loading />;
  }

  if (hasError) {
    return <Error />;
  }

  return (
    <Main page="Story" className="flex-col">
      <section aria-labelledby="Story history list" className="w-full p-3">
        <HistoryTable
          tableLength={story.length}
          buttonName={["Create", "Story"]}
          buttonClass={"md:flex"}
          form={<StoryForm />}
        >
          <StoryHistoryTable storyList={story} />
        </HistoryTable>
      </section>
    </Main>
  );
}
