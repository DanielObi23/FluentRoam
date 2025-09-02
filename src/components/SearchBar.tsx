import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";
import Link from "next/link";
import { CircleXIcon, Search, X } from "lucide-react";
import useSearchBar from "@/hooks/use-searchBar";

export default function SearchBar({
  createFormButtonName,
  createFormButtonLink,
  children,
  tableList,
}: {
  createFormButtonName: string;
  createFormButtonLink: string;
  children: React.ReactNode;
  tableList: unknown[];
}) {
  // COMPONENT WORKS WITH useSearchBar HOOK
  const [search, setSearch] = useQueryState(
    "search",
    parseAsString.withDefault(""),
  );
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const pageButtonRef = useRef<HTMLDivElement | null>(null);
  const { pageLimit } = useSearchBar();

  useEffect(() => {
    pageButtonRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  function updateSearchState(search: string, page: number) {
    setSearch(search);
    setPage(page);
  }

  return (
    <>
      <div className="flex w-full items-center justify-between gap-2">
        <div className="flex items-center justify-center gap-2 md:w-3/7 md:self-start">
          <div className="relative w-full">
            <div className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
              <Search className="size-4" />
              <span className="sr-only">Search</span>
            </div>
            <Input
              defaultValue={search}
              id="search"
              type="text"
              onChange={(e) => {
                updateSearchState(e.target.value, 1);
              }}
              className="peer ps-9 placeholder:text-white"
              placeholder="Type something..."
            />
            {search && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  updateSearchState("", 1);
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

        <Button asChild>
          <Link href={createFormButtonLink} className="md:hidden">
            {createFormButtonName}
          </Link>
        </Button>
      </div>

      {children}

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
          disabled={tableList.length < pageLimit}
          className="md:text-lg"
        >
          Next
        </Button>
      </div>
    </>
  );
}
