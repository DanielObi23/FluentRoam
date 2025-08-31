//TODO: use react query to query first 50 pages, then cache it
// IMPROVE PAGINATION UI, GET FROM SHADCNUI

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { userSessions, UserSession } from "@/userSessions";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";
import Link from "next/link";
import { CircleXIcon, Search, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import ConversationHistoryTable from "./ConversationHistoryTable";

// COMPONENT IS RERENDERING TWICE, FIX THAT
export default function SessionsTable() {
  const [search, setSearch] = useQueryState(
    "search",
    parseAsString.withDefault(""),
  );
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const router = useRouter();
  const pageButtonRef = useRef<HTMLDivElement | null>(null);

  const filteredSessions = userSessions.filter((session) =>
    session.title.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    pageButtonRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // simulation, query database based of page === 1? query first numberOfRowsToShow : from (page - 1) * numberOfRowsToShow
  // if list return .length < 10, next page === 0
  // if error return === out of bound, page doesnt exist, show button to relocate to first page
  // if list returned === 0, show button to add to list
  const numberOfRowsToShow = 10;
  const num1 = (page - 1) * numberOfRowsToShow;
  const sessionList =
    page === 1
      ? (filteredSessions as UserSession[]).slice(0, numberOfRowsToShow)
      : (filteredSessions as UserSession[]).slice(
          num1,
          num1 + numberOfRowsToShow,
        );
  return (
    <>
      <div className="flex w-full items-center justify-between gap-2">
        <div className="flex items-center justify-center gap-2 md:w-3/7 md:self-start">
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
          <Link href={"/conversation/form"} className="md:hidden">
            Create Session
          </Link>
        </Button>
      </div>

      <ConversationHistoryTable sessionList={sessionList} />

      <div ref={pageButtonRef} className="flex items-center justify-end gap-3">
        <Button
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page <= 1}
          className="md:text-lg"
        >
          Previous
        </Button>

        <Button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={
            sessionList.length < numberOfRowsToShow ||
            filteredSessions.length <= 10
          }
          className="md:text-lg"
        >
          Next
        </Button>
      </div>
    </>
  );
}
