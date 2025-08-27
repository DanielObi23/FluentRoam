"use client"

import Navigation from "@/components/app_layout/Navigation";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Book, CircleXIcon, Clock, Edit, Plus, Search, Star} from "lucide-react";
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardFooter, CardTitle, CardAction, CardDescription } from "@/components/ui/card";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useId } from "react";
import { cn } from "@/lib/utils";

//MAYBE MAKE SEARCH INTO A COMPONENT/CUSTOM HOOK
export default function Page() {
    const [search, setSearch] = useQueryState("search", parseAsString.withDefault(""))
    const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1))
    const id = useId()

    const deckColors = [
        { value: 'red', color: 'bg-red-500' },
        { value: 'orange', color: 'bg-orange-500' },
        { value: 'teal', color: 'bg-teal-500' },
        { value: 'purple', color: 'bg-purple-500' },
        { value: 'blue', color: 'bg-blue-500' }
    ]
    return (
        <div className="h-screen flex flex-col w-full">
            <Navigation page="Vocabulary list" />
            <div className="w-full px-10 md:px-15 py-5 md:py-10 space-y-4">
                <div className="w-full md:w-1/4 space-y-4">
                    <div className="space-y-1">
                        <h1 className="font-bold text-2xl">My Decks</h1>
                        <h2 className="text-lg">Manage your flashcard collections</h2>
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
                                placeholder="Filter decks..."
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
                            <DialogTrigger className="button cursor-pointer"><Plus />New Deck</DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                <DialogTitle>Deck Details</DialogTitle>
                                <DialogDescription>
                                    create new deck by filling in the details
                                </DialogDescription>
                                </DialogHeader>
                                    <form className="space-y-5">
                                        <div className="space-y-3">
                                            <Label htmlFor="deck-name">Deck Name:</Label>
                                            <Input type="text" id="deck-name" name="deck-name" />  
                                        </div>
                                        
                                        <fieldset className='w-full max-w-96 space-y-4'>
                                            <legend className='text-foreground text-sm leading-none font-medium'>Select Deck Colour: </legend>
                                            <RadioGroup className='grid grid-cols-3 gap-2' defaultValue='teal'>
                                                {deckColors.map(deck => (
                                                    <label
                                                        key={`${id}-${deck.color}`}
                                                        className='cursor-pointer border-input has-data-[state=checked]:border-primary/80 has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative flex flex-col items-center gap-3 rounded-md border px-2 py-3 text-center shadow-xs transition-[color,box-shadow] outline-none has-focus-visible:ring-[3px] has-data-disabled:cursor-not-allowed has-data-disabled:opacity-50'
                                                    >
                                                        <RadioGroupItem
                                                            id={`${id}-${deck.color}`}
                                                            value={deck.color}
                                                            className='sr-only after:absolute after:inset-0'
                                                            aria-label={`size-radio-${deck.color}`}
                                                        />
                                                        <div className="flex gap-1 items-center">
                                                            <p className={cn("rounded-full size-3", deck.color)}></p>
                                                            <p className='text-foreground text-sm leading-none font-medium capitalize'>{deck.value}</p>
                                                        </div>
                                                    </label>
                                                ))}
                                            </RadioGroup>
                                        </fieldset>
                                    </form>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button type="button" variant="secondary">
                                        Close
                                        </Button>
                                    </DialogClose>
                                    <Button type="submit">Create Deck</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                        {/* <Button variant={"outline"} className="flex items-center"><Plus /> <span>Create Deck</span></Button> */}
                    </div>
                </div>
                <div className="grid grid-cols-12">
                    <Card className="gap-3 col-span-full md:col-span-6 lg:col-span-4 xl:col-span-2">
                        <CardHeader className="">
                            <CardTitle className="text-semibold text-lg">Spanish deck</CardTitle>
                            {/* <CardDescription>Card Description</CardDescription>
                            <CardAction>Card Action</CardAction> */}
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <p className="flex justify-between">
                                <span className="flex items-center"><Star className="size-5"/>&nbsp; New:</span>
                                <span>1</span>
                            </p>
                            <p className="flex justify-between">
                                <span className="flex items-center"><Clock className="size-5"/>&nbsp; Due:</span>
                                <span>1</span>
                            </p>
                            <p className="flex justify-between">
                                <span>Total:</span>
                                <span>2</span>
                            </p>
                        </CardContent>
                        <CardFooter className="flex justify-around w-full">
                            <Button variant={"secondary"} className="w-2/5"><Book /> Study</Button>
                            <Button className="w-2/5"><Edit /> Edit</Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
            
        </div>
    )
}