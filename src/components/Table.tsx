import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";
import { CircleXIcon, Search, X } from "lucide-react";
import useTable from "@/hooks/use-table";
import { twMerge } from "tailwind-merge";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useIsMobile } from "@/hooks/use-mobile";

export default function Table({
  buttonName,
  buttonClass,
  children,
  tableLength,
  form,
}: {
  buttonName: [string, string];
  buttonClass?: string;
  children: React.ReactNode;
  tableLength: number;
  form: React.ReactNode;
}) {
  // COMPONENT WORKS WITH use-table HOOK
  const [search, setSearch] = useQueryState(
    "search",
    parseAsString.withDefault(""),
  );
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const pageButtonRef = useRef<HTMLDivElement | null>(null);
  const tableRef = useRef<HTMLDivElement | null>(null);
  const { pageLimit } = useTable();
  const isMobile = useIsMobile();

  useEffect(() => {
    pageButtonRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  function updateSearchState(search: string, page: number) {
    setSearch(search);
    setPage(page);
  }

  return (
    <>
      <div className="flex w-full items-center gap-3">
        <div className="flex items-center justify-center gap-2 md:w-5/7 md:self-start lg:w-3/7 xl:w-3/7">
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
              placeholder="Search"
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

        <Dialog>
          <Button
            size={isMobile ? "sm" : "lg"}
            className={twMerge("md:hidden", buttonClass)}
            asChild
          >
            <DialogTrigger className="flex">
              <Plus strokeWidth={5} />
              <p>
                {buttonName[0]}{" "}
                <span className="max-[500px]:hidden">{buttonName[1]}</span>
              </p>
            </DialogTrigger>
          </Button>

          <DialogContent className="h-[calc(100vh-3rem)] overflow-auto">
            <DialogHeader>
              <DialogTitle className="sr-only">{buttonName} Form</DialogTitle>
              <DialogDescription className="sr-only">
                {buttonName.join(" ")}
              </DialogDescription>
            </DialogHeader>
            {form}

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary" className="w-full">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div
        ref={tableRef}
        className="scrollbar-hover my-8 max-h-[calc(100vh-18rem)] overflow-auto"
      >
        {children}
      </div>

      <div ref={pageButtonRef} className="flex items-center justify-end gap-3">
        <Button
          onClick={() => {
            setPage((prev) => prev - 1);
            tableRef.current?.scroll(0, 0);
          }}
          disabled={page <= 1}
          className="md:text-lg"
        >
          Previous
        </Button>

        <Button
          onClick={() => {
            setPage((prev) => prev + 1);
            tableRef.current?.scroll(0, 0);
          }}
          disabled={tableLength < pageLimit}
          className="md:text-lg"
        >
          Next
        </Button>
      </div>
    </>
  );
}
