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

export default function Page() {
  // COPY SESSIONS TABLE LOGIC IN COMPONENTS, EXTRAPOLATE BOTH INTO A CUSTOM HOOK, DO THE REST OF THE UI, ADDING PAGINATION
  // ADD FILTER FOR STORYTYPE, GENRE, TONE, THEME, PROFICIENCY, MAYBE SORT BY DATE MADE TOO
  // MAKE A COMPONENT FOR BUTTON, CALL IT ROUTER BUTTON, TAKES A TEXT AND PATH, TO PREVENT CONSTANTLY CREATING NEW ROUTERS, MAKE VARIATION FOR REPLACE, BACK AND FORWARD
  // THINK OF MOVING SEARCH BAR TO A DIFFERENT COMPONENT, TO USE WITH CONVERSATION PAGE.
  // ADD PAGE BUTTON TO GO NEXT

  const [search, setSearch] = useQueryState(
    "search",
    parseAsString.withDefault(""),
  );
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  const filteredList = story.filter((story) =>
    story.title.toLowerCase().includes(search.toLowerCase()),
  );
  const num1 = page * 10 - 1;
  const filteredStoryList =
    page === 1
      ? (filteredList as Story[]).slice(0, 10)
      : (filteredList as Story[]).slice(num1, num1 + 10);

  const createFormButtonName = "Create Story";
  const createFormButtonLink = "/story/create";

  return (
    <div className="bg-background min-h-screen w-full">
      <Navigation page="Story" />
      <div className="overflow-x-auto">
        <div className="flex w-full items-center justify-between gap-2">
          <div className="flex items-center justify-center gap-2 md:w-3/7 md:self-start">
            <Button asChild>
              <Link href={"/story/create"}>Create Story</Link>
            </Button>
            <div className="w-full max-w-xs space-y-2">
              <Label htmlFor={"search"}>Search</Label>
              <div className="relative">
                <div className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                  <Search className="size-4" />
                  <span className="sr-only">Search</span>
                </div>
                <Input
                  defaultValue={search}
                  id="search"
                  type="text"
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  className="peer ps-9 placeholder:text-white"
                  placeholder="Type something..."
                />
                {search && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setSearch("");
                      setPage(1);
                      (
                        document.getElementById("search") as HTMLInputElement
                      ).value = "";
                    }}
                    className="text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 end-0 rounded-s-none hover:bg-transparent"
                  >
                    <CircleXIcon />
                    <span className="sr-only">Clear search input</span>
                  </Button>
                )}
              </div>
            </div>
          </div>

          <Button asChild>
            <Link href={"/story/create"} className="md:hidden">
              Create Story
            </Link>
          </Button>
        </div>

        <StoryHistoryTable storyList={filteredStoryList} />
      </div>
    </div>
  );
}
