"use client";

import Navigation from "@/components/app_layout/Navigation";
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
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
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

//MAYBE MAKE SEARCH INTO A COMPONENT/CUSTOM HOOK, COMPONENT FOR ROUTER BUTTON
// TOGGLE TO REVIEW FROM SPANISH TO ENGLISH OR FROM ENGLISH TO SPANISH
// LOOK AT SESSIONS TABLE AND STORY TABLE, MAYBE MAKE INTO A COMPONENT
// MAYBE THINK OF ADDING TRANSLATION TO CONTEXT
// COMPONENT IS RERENDERING TWICE, FIX THAT
export default function Page() {
  const router = useRouter();
  const deckCards = [
    { id: 0, name: "Spanish", color: "bg-red-500", new: 1, due: 1 },
  ];
  const [cards, setCards] = useState(deckCards);
  const [search, setSearch] = useQueryState(
    "search",
    parseAsString.withDefault(""),
  );
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const id = useId();
  const pageButtonRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useIsMobile();

  const cardList = [
    {
      text: "puerto",
      pos: "noun",
      translation: "port",
      sentence_context:
        "Mateo llegó al pequeño puerto al amanecer, con la bruma cubriendo los barcos anclados.",
    },
    {
      text: "bruma",
      pos: "noun",
      translation: "fog",
      sentence_context:
        "Mateo llegó al pequeño puerto al amanecer, con la bruma cubriendo los barcos anclados.",
    },
    {
      text: "colina",
      pos: "noun",
      translation: "hill",
      sentence_context:
        "El faro se alzaba en la colina, imponente y silencioso, con sus ventanas rotas reflejando la luz tenue.",
    },
    {
      text: "grietas",
      pos: "noun",
      translation: "cracks",
      sentence_context:
        "Decidió subir la escalera que crujía bajo su peso, sintiendo cómo el viento entraba por las grietas.",
    },
    {
      text: "sobre",
      pos: "noun",
      translation: "envelope",
      sentence_context:
        "En el suelo encontró un sobre amarillo con su nombre escrito a mano.",
    },
    {
      text: "diario",
      pos: "noun",
      translation: "diary",
      sentence_context:
        "Un diario abierto reposaba sobre la mesa, cubierto de polvo y arena.",
    },
    {
      text: "retratos",
      pos: "noun",
      translation: "portraits",
      sentence_context:
        "Una ventana rota dejaba pasar un rayo de sol que iluminaba los retratos antiguos en la pared.",
    },
    {
      text: "mareas",
      pos: "noun",
      translation: "tides",
      sentence_context:
        "Encontró mapas del litoral, anotaciones de mareas y fechas que coincidían con viejas cartas de la familia.",
    },
    {
      text: "acantilados",
      pos: "noun",
      translation: "cliffs",
      sentence_context:
        "Las olas rompían suavemente contra los acantilados, como aplaudiendo su decisión.",
    },
    {
      text: "restaurar",
      pos: "verb",
      translation: "to restore",
      sentence_context:
        "Decidió que debía restaurar la torre y preservar las historias, para que no se perdieran otra vez.",
    },
    {
      text: "habitacion",
      pos: "noun",
      translation: "room",
      sentence_context:
        "Antes de dormir en la pequeña habitación de la torre, escribió su propio diario, continuando la cadena de historias.",
    },
    {
      text: "cadena",
      pos: "noun",
      translation: "chain",
      sentence_context:
        "Antes de dormir en la pequeña habitación de la torre, escribió su propio diario, continuando la cadena de historias.",
    },
  ];

  const filteredCardList = cardList.filter((card) => {
    if (
      card.text.toLowerCase().includes(search.toLowerCase()) ||
      card.translation.toLowerCase().includes(search.toLowerCase())
    ) {
      return card;
    }
  });

  useEffect(() => {
    pageButtonRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // simulation, query database based of page === 1? query first numberOfRowsToShow : from (page - 1) * numberOfRowsToShow
  // if list return .length < 10, next page === 0
  // if error return === out of bound, page doesnt exist, show button to relocate to first page
  // if list returned === 0, show button to add to list
  const numberOfRowsToShow = 10;
  const num1 = (page - 1) * numberOfRowsToShow;
  const flashCardPage =
    page === 1
      ? filteredCardList.slice(0, numberOfRowsToShow)
      : filteredCardList.slice(num1, num1 + numberOfRowsToShow);

  function addCard(formData: FormData) {
    console.log("received");
    const text = formData.get("text") as string;
    const translation = formData.get("translation") as string;
    const pos = formData.get("pos") as string;
    const context = formData.get("context") as string;
    console.log({ text, translation, pos, context });
    //setCards(prev => [...prev, {id: cards.length + 1, name, color, new: cards.length + 1, due: cards.length + 2}])
  }

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
              {/* <Table2 /> */}
              <p>Total: {filteredCardList.length}</p>
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
              <Table2 />
              <p className="text-2xl font-semibold">
                Total: {filteredCardList.length}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* ADD CARD */}
            <Dialog>
              <Button size={isMobile ? "sm" : "lg"} asChild>
                <DialogTrigger>
                  <Plus />
                  New Card
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

      <SearchBar
        ButtonLink="/vocabulary/study"
        ButtonName="Study"
        ButtonVariant={"secondary"}
        tableLength={flashCardPage.length}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Front</TableHead>
              <TableHead>Back</TableHead>
              <TableHead>P.O.S</TableHead>
              <TableHead className="min-w-[15rem] text-center">
                Context
              </TableHead>
              <TableHead>Next Review</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {flashCardPage.map((card, index) => (
              <TableRow key={`card-id${index}`}>
                <TableCell>{card.text}</TableCell>
                <TableCell>{card.translation}</TableCell>
                <TableCell>{card.pos}</TableCell>
                <TableCell>{card.sentence_context}</TableCell>
                <TableCell>today</TableCell>
                <TableCell>yesterday</TableCell>
                <TableCell className="flex items-center gap-3">
                  <Button>
                    <Edit /> Edit
                  </Button>
                  <Button variant={"destructive"}>
                    <Trash /> Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SearchBar>
    </Main>
  );
}
