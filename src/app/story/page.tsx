"use client";

import { story, Story } from "@/story";
import StoryHistoryTable from "@/components/story_page/StoryHistoryTable";
import Table from "@/components/Table";
import useTable from "@/hooks/use-table";
import Main from "@/components/tags/Main";
import StoryForm from "@/components/story_page/StoryForm";

export default function Page() {
  //USE USEMEMO FOR WHEN QUERYING DATABASE
  const { page, search, pageLimit } = useTable();
  const storys = [...story, ...story, ...story, ...story];
  const filteredList = storys.filter((story) =>
    story.title.toLowerCase().includes(search.toLowerCase()),
  );

  const num1 = page * pageLimit - 1;
  const storyList =
    page === 1
      ? (filteredList as Story[]).slice(0, pageLimit)
      : (filteredList as Story[]).slice(num1, num1 + pageLimit);

  return (
    <Main page="Story" className="flex-col">
      <section aria-labelledby="Story history list" className="w-full p-3">
        <Table
          tableLength={storyList.length}
          buttonName={["Create", "Story"]}
          buttonClass={"md:flex"}
          form={<StoryForm />}
        >
          <StoryHistoryTable storyList={storyList} />
        </Table>
      </section>
    </Main>
  );
}
