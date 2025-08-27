"use client"

import Navigation from "@/components/app_layout/Navigation";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Book, CircleXIcon, Clock, Edit, Plus, Search, Star, Trash} from "lucide-react";
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useId, useState } from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useRef } from "react";

//MAYBE MAKE SEARCH INTO A COMPONENT/CUSTOM HOOK, COMPONENT FOR ROUTER BUTTON
// TOGGLE TO REVIEW FROM SPANISH TO ENGLISH OR FROM ENGLISH TO SPANISH
// LOOK AT SESSIONS TABLE AND STORY TABLE, MAYBE MAKE INTO A COMPONENT
// MAYBE THINK OF ADDING TRANSLATION TO CONTEXT
// COMPONENT IS RERENDERING TWICE, FIX THAT
export default function Page() {
    const router = useRouter()
    const deckCards = [
        {id: 0, name: "Spanish", color: "bg-red-500", new: 1, due: 1}
    ]
    const [cards, setCards] = useState(deckCards)
    const [search, setSearch] = useQueryState("search", parseAsString.withDefault(""))
    const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1))
    const id = useId()
    const pageButtonRef = useRef<HTMLDivElement | null>(null)
        
    const cardList = [
        { "text": "puerto", "pos": "noun", "translation": "port", "sentence_context": "Mateo llegó al pequeño puerto al amanecer, con la bruma cubriendo los barcos anclados." },
        { "text": "bruma", "pos": "noun", "translation": "fog", "sentence_context": "Mateo llegó al pequeño puerto al amanecer, con la bruma cubriendo los barcos anclados." },
        { "text": "colina", "pos": "noun", "translation": "hill", "sentence_context": "El faro se alzaba en la colina, imponente y silencioso, con sus ventanas rotas reflejando la luz tenue." },
        { "text": "grietas", "pos": "noun", "translation": "cracks", "sentence_context": "Decidió subir la escalera que crujía bajo su peso, sintiendo cómo el viento entraba por las grietas." },
        { "text": "sobre", "pos": "noun", "translation": "envelope", "sentence_context": "En el suelo encontró un sobre amarillo con su nombre escrito a mano." },
        { "text": "diario", "pos": "noun", "translation": "diary", "sentence_context": "Un diario abierto reposaba sobre la mesa, cubierto de polvo y arena." },
        { "text": "retratos", "pos": "noun", "translation": "portraits", "sentence_context": "Una ventana rota dejaba pasar un rayo de sol que iluminaba los retratos antiguos en la pared." },
        { "text": "mareas", "pos": "noun", "translation": "tides", "sentence_context": "Encontró mapas del litoral, anotaciones de mareas y fechas que coincidían con viejas cartas de la familia." },
        { "text": "acantilados", "pos": "noun", "translation": "cliffs", "sentence_context": "Las olas rompían suavemente contra los acantilados, como aplaudiendo su decisión." },
        { "text": "restaurar", "pos": "verb", "translation": "to restore", "sentence_context": "Decidió que debía restaurar la torre y preservar las historias, para que no se perdieran otra vez." },
        { "text": "habitacion", "pos": "noun", "translation": "room", "sentence_context": "Antes de dormir en la pequeña habitación de la torre, escribió su propio diario, continuando la cadena de historias." },
        { "text": "cadena", "pos": "noun", "translation": "chain", "sentence_context": "Antes de dormir en la pequeña habitación de la torre, escribió su propio diario, continuando la cadena de historias." }
    ]

    const filteredCardList = cardList.filter((card) => {
        if (card.text.toLowerCase().includes(search.toLowerCase()) ||
         card.translation.toLowerCase().includes(search.toLowerCase())) {
            return card
        }
    });

    useEffect(() => {
        pageButtonRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    // simulation, query database based of page === 1? query first numberOfRowsToShow : from (page - 1) * numberOfRowsToShow 
    // if list return .length < 10, next page === 0
    // if error return === out of bound, page doesnt exist, show button to relocate to first page
    // if list returned === 0, show button to add to list
    const numberOfRowsToShow = 10
    const num1 = (page - 1) * numberOfRowsToShow
    const flashCardPage = page === 1? filteredCardList.slice(0, numberOfRowsToShow) : filteredCardList.slice(num1, num1 + numberOfRowsToShow)

    function addCard(formData: FormData) {
        console.log("received")
        const text = formData.get("text") as string;
        const translation = formData.get("translation") as string;
        const pos = formData.get("pos") as string;
        const context = formData.get("context") as string;
        console.log({text, translation, pos, context})
        //setCards(prev => [...prev, {id: cards.length + 1, name, color, new: cards.length + 1, due: cards.length + 2}])
    }

    return (
        <div className="h-screen flex flex-col w-full">
            <Navigation page="Vocabulary list" />
            <div className="w-full px-10 md:px-15 py-5 md:py-10 space-y-4">
                <div className="flex items-center justify-between">
                    <div className="w-full md:w-1/4 space-y-4">
                        <div className="space-y-1">
                            <h1 className="font-bold text-2xl">My Deck</h1>
                            <h2 className="text-lg">Manage your flashcard collection</h2>
                        </div>
                        
                        <div className="flex justify-between items-center gap-2">
                            <div className='relative w-full'>
                                <div className='text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50'>
                                    <Search className='size-4' />
                                    <span className='sr-only'>Search</span>
                                </div>
                                <Input 
                                    defaultValue={search} 
                                    type="text"
                                    onChange={(e) => {
                                        setSearch(e.target.value); 
                                        setPage(1)}} 
                                    className="placeholder:text-white peer ps-9"
                                    placeholder="Filter list..."
                                />
                                {search && (
                                    <Button
                                        variant='ghost'
                                        size='icon'
                                        onClick={() => {
                                            setSearch(""); 
                                            setPage(1);
                                            (document.getElementById("search") as HTMLInputElement).value = "";
                                        }}
                                        className='text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 end-0 rounded-s-none hover:bg-transparent'
                                    >
                                        <CircleXIcon />
                                        <span className='sr-only'>Clear search input</span>
                                    </Button>
                                )}
                            </div>
                            <Dialog>
                                <DialogTrigger className="button cursor-pointer"><Plus />New Card</DialogTrigger>
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
                                                <Input type="text" id="card-name" name="text" required/>  
                                            </div>
                                            <div className="space-y-3">
                                                <Label htmlFor="card-name">Translation:</Label>
                                                <Input type="text" id="card-translation" name="translation" required/>  
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
                                                            <SelectItem value="prepositions">Prepositions</SelectItem>
                                                            <SelectItem value="conjunctions">Conjunctions</SelectItem>
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
                            {/* <Button variant={"outline"} className="flex items-center"><Plus /> <span>Create Deck</span></Button> */}
                        </div>
                    </div>
                    <Button variant={"secondary"} size={"lg"} className="flex items-center"><Book /> <span>Study now</span></Button>
                </div>
                
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Front</TableHead> 
                            <TableHead>Back</TableHead> 
                            <TableHead>P.O.S</TableHead>
                            <TableHead>Context</TableHead> 
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
                                <TableCell className="space-x-3">
                                    <Button><Edit /> Edit</Button>
                                    <Button variant={"destructive"}><Trash /> Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}                       
                    </TableBody>
                </Table>
                <div ref={pageButtonRef} className="flex justify-end items-center gap-3">
                    <Button 
                        onClick={() => setPage(prev => prev - 1)} 
                        disabled={page <= 1} 
                        className="md:text-lg">
                            Previous
                    </Button>
                    
                    {/* FIGURE OUT WHAT THE DISABLED CRITERIA MEAN AND THE REST OF THIS CODE */}
                    <Button 
                        onClick={() => setPage(prev => prev + 1)} 
                        disabled={flashCardPage.length < numberOfRowsToShow || filteredCardList.length <= 10} 
                        className="md:text-lg">
                            Next
                    </Button>
                </div>
            </div>       
        </div>
    )
}