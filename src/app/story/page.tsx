"use client";

import { story, Story } from "@/story";
import StoryHistoryTable from "@/components/StoryHistoryTable";
import SearchBar from "@/components/SearchBar";
import useSearchBar from "@/hooks/use-searchBar";
import Main from "@/components/tags/Main";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
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
import { useIsMobile } from "@/hooks/use-mobile";

export default function Page() {
  //USE USEMEMO FOR WHEN QUERYING DATABASE
  const { page, search, pageLimit } = useSearchBar();
  const storys = [...story, ...story, ...story, ...story];
  const filteredList = storys.filter((story) =>
    story.title.toLowerCase().includes(search.toLowerCase()),
  );

  const isMobile = useIsMobile();
  const num1 = page * pageLimit - 1;
  const storyList =
    page === 1
      ? (filteredList as Story[]).slice(0, pageLimit)
      : (filteredList as Story[]).slice(num1, num1 + pageLimit);

  //TODO: Make dialog into a form for creating new story
  function createSession() {}
  return (
    <Main page="Story" className="flex-col">
      <section aria-labelledby="Story history list" className="w-full p-3">
        <SearchBar
          tableLength={storyList.length}
          ButtonName={"Create Story"}
          ButtonLink={"/story/form"}
          ButtonVariant={"default"}
          ButtonClass={"md:flex"}
        >
          {/* TODO: think of making all forms into a dialog, instead of a new page, simply change button or change button to take a children for dialog */}
          {/* TODO: Conversation form page on mobile */}
          <Dialog>
            <Button size={isMobile ? "sm" : "lg"} asChild>
              <DialogTrigger className="ml-10">
                <Plus />
                Create <span className="max-[500px]:hidden">Story</span>
              </DialogTrigger>
            </Button>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Card Details</DialogTitle>
                <DialogDescription>
                  create new card by filling in the details
                </DialogDescription>
              </DialogHeader>
              <form action={createSession} className="space-y-5">
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
          <StoryHistoryTable storyList={storyList} />
        </SearchBar>
      </section>
    </Main>
  );
}
