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
        </div>
      </div>

      <VocabTable />
    </Main>
  );
}
