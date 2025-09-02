"use client";

import Navigation from "@/components/app_layout/Navigation";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { story, Story } from "@/story";
import { CircleXIcon, Search, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";
import Link from "next/link";
import StoryHistoryTable from "@/components/StoryHistoryTable";
import SearchBar from "@/components/SearchBar";
import useSearchBar from "@/hooks/use-searchBar";
import Main from "@/components/tags/Main";

export default function Page() {
  // COPY SESSIONS TABLE LOGIC IN COMPONENTS, EXTRAPOLATE BOTH INTO A CUSTOM HOOK, DO THE REST OF THE UI, ADDING PAGINATION
  // ADD FILTER FOR STORYTYPE, GENRE, TONE, THEME, PROFICIENCY, MAYBE SORT BY DATE MADE TOO
  // MAKE A COMPONENT FOR BUTTON, CALL IT ROUTER BUTTON, TAKES A TEXT AND PATH, TO PREVENT CONSTANTLY CREATING NEW ROUTERS, MAKE VARIATION FOR REPLACE, BACK AND FORWARD
  // THINK OF MOVING SEARCH BAR TO A DIFFERENT COMPONENT, TO USE WITH CONVERSATION PAGE.
  // ADD PAGE BUTTON TO GO NEXT

  // const [search, setSearch] = useQueryState(
  //   "search",
  //   parseAsString.withDefault(""),
  // );
  //const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

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
      <section aria-labelledby="Story history list">
        <SearchBar
          tableList={storyList}
          createFormButtonName={createFormButtonName}
          createFormButtonLink={createFormButtonLink}
        >
          <StoryHistoryTable storyList={storyList} />
        </SearchBar>
      </section>
    </Main>
  );
}
