"use client";

import { parseAsInteger, parseAsString, useQueryState } from "nuqs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Book,
  CircleXIcon,
  Clock,
  Edit,
  Plus,
  Search,
  Star,
  Table2,
  Trash,
} from "lucide-react";
import { Label } from "@/components/ui/label";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useId, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useRef } from "react";
import SearchBar from "@/components/SearchBar";
import { useIsMobile } from "@/hooks/use-mobile";
import Link from "next/link";
import Main from "@/components/tags/Main";
import VocabTable from "@/components/VocabTable";

//MAYBE MAKE SEARCH INTO A COMPONENT/CUSTOM HOOK, COMPONENT FOR ROUTER BUTTON
// TOGGLE TO REVIEW FROM SPANISH TO ENGLISH OR FROM ENGLISH TO SPANISH
// LOOK AT SESSIONS TABLE AND STORY TABLE, MAYBE MAKE INTO A COMPONENT
// COMPONENT IS RERENDERING TWICE, FIX THAT
export default function Page() {
  // const deckCards = [
  //   { id: 0, name: "Spanish", color: "bg-red-500", new: 1, due: 1 },

  function addCard(formData: FormData) {
    console.log("received");
    const text = formData.get("text") as string;
    const translation = formData.get("translation") as string;
    const pos = formData.get("pos") as string;
    const context = formData.get("context") as string;
    console.log({ text, translation, pos, context });
    //setCards(prev => [...prev, {id: cards.length + 1, name, color, new: cards.length + 1, due: cards.length + 2}])
  }
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
            {/* ADD CARD */}
            <Dialog>
              <Button size={isMobile ? "sm" : "lg"} asChild>
                <DialogTrigger>
                  <Plus />
                  <span className="max-[500px]:hidden">New</span> Card
                </DialogTrigger>
              </Button>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Card Details</DialogTitle>
                  <DialogDescription>
                    create new card by filling in the details
                  </DialogDescription>
                </DialogHeader>
                <form action={addCard} className="space-y-5">
                  <div className="space-y-3">
                    <Label htmlFor="card-name">Text:</Label>
                    <Input type="text" id="card-name" name="text" required />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="card-name">Translation:</Label>
                    <Input
                      type="text"
                      id="card-translation"
                      name="translation"
                      required
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="">Part of Speech:</Label>
                    <Select name="pos">
                      <SelectTrigger>
                        <SelectValue placeholder="Select the part of speech" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Part of Speech</SelectLabel>
                          <SelectItem value="noun">Noun</SelectItem>
                          <SelectItem value="pronoun">Pronoun</SelectItem>
                          <SelectItem value="verb">Verb</SelectItem>
                          <SelectItem value="adjective">Adjective</SelectItem>
                          <SelectItem value="adverb">Adverb</SelectItem>
                          <SelectItem value="prepositions">
                            Prepositions
                          </SelectItem>
                          <SelectItem value="conjunctions">
                            Conjunctions
                          </SelectItem>
                          <SelectItem value="phrase">Phrase</SelectItem>
                          <SelectItem value="idiom">Idiom</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="card-context">Example/Context:</Label>
                    <Input type="text" id="card-context" name="context" />
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">
                        Close
                      </Button>
                    </DialogClose>
                    <Button type="submit">Add Card</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

            {!isMobile && (
              <Button
                variant={"secondary"}
                size={"lg"}
                className="flex items-center"
                asChild
              >
                <Link href={"/vocabulary/study"}>
                  <Book /> <span>Study now</span>
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>

      <VocabTable />
    </Main>
  );
}
