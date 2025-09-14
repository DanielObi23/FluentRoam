"use client";

import { story, Story } from "@/story";
import StoryHistoryTable from "@/components/StoryHistoryTable";
import SearchBar from "@/components/SearchBar";
import useSearchBar from "@/hooks/use-searchBar";
import Main from "@/components/tags/Main";

export default function Page() {
  //USE USEMEMO FOR WHEN QUERYING DATABASE
  const { page, search, pageLimit } = useSearchBar();
  const storys = [...story, ...story, ...story, ...story];
  const filteredList = storys.filter((story) =>
    story.title.toLowerCase().includes(search.toLowerCase()),
  );

  const num1 = page * pageLimit - 1;
  const storyList =
    page === 1
      ? (filteredList as Story[]).slice(0, pageLimit)
      : (filteredList as Story[]).slice(num1, num1 + pageLimit);

  const createFormButtonName = "Create Story";
  const createFormButtonLink = "/story/form";

  return (
    <Main page="Story" className="flex-col">
      <section aria-labelledby="Story history list" className="w-full px-3">
        <SearchBar
          tableLength={storyList.length}
          ButtonName={createFormButtonName}
          ButtonLink={createFormButtonLink}
          ButtonVariant={"default"}
        >
          <StoryHistoryTable storyList={storyList} />
        </SearchBar>
      </section>
    </Main>
  );
}
