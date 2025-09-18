"use client";

import { Button } from "@/components/ui/button";
import { Book, Clock, Star, Table2 } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import Link from "next/link";
import Main from "@/components/tags/Main";
import VocabTable from "@/components/vocab_page/VocabTable";

export default function Page() {
  const isMobile = useIsMobile();
  return (
    <Main
      page="Vocabulary"
      className="flex flex-col gap-3 px-5 py-5 max-md:space-y-2 max-md:py-1 sm:px-10 md:px-15 md:py-10"
    >
      <div className="flex items-center justify-between gap-1 max-md:items-baseline">
        <div className="my-auto max-w-2/3 gap-2 space-y-2 overflow-auto max-md:flex md:w-1/4">
          <h1 className="text-2xl font-bold">My Deck</h1>
          <h2 className="text-lg max-md:hidden">
            Manage your flashcard collection
          </h2>
          <div className="flex items-baseline gap-1 text-center text-lg font-semibold md:hidden">
            <div className="flex items-center gap-1 border-2 px-2 py-1">
              {/* <Star /> */}
              <p>New: 3</p>
            </div>
            <div className="flex items-center gap-1 border-2 px-2 py-1">
              {/* <Clock /> */}
              <p>Due: 1</p>
            </div>

            <div className="flex items-center gap-1 border-2 px-2 py-1">
              {/* Total number of cards users made/has */}
              <p>Total: 10</p>
            </div>
          </div>
        </div>

        <div className="my-auto flex flex-col items-end gap-2">
          {/* CARDS DUE AND TO REVIEW */}
          <div className="flex items-baseline gap-1 max-md:hidden">
            <div className="flex items-center gap-1 border-2 px-2 py-1">
              <Star />
              <p className="text-2xl font-semibold">New: 3</p>
            </div>
            <div className="flex items-center gap-1 border-2 px-2 py-1">
              <Clock />
              <p className="text-2xl font-semibold">Due: 1</p>
            </div>

            <div className="flex items-center gap-1 border-2 px-2 py-1">
              {/* Total number of cards users made/has */}
              <Table2 />
              <p className="text-2xl font-semibold">Total: 10</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={"secondary"}
              size={isMobile ? "sm" : "lg"}
              className="flex items-center"
              asChild
            >
              <Link href={"/vocabulary/study"}>
                <Book /> <span>Study now</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <VocabTable />
    </Main>
  );
}
