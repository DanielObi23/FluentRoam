"use client"

import Navigation from "@/components/app_layout/Navigation";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {story} from "@/story"
import { useRouter } from "next/navigation";
import { CircleXIcon, Search, X } from "lucide-react";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input";
import { parseAsInteger, parseAsString ,useQueryState } from "nuqs";

export default function Page() {
    // COPY SESSIONS TABLE LOGIC IN COMPONENTS, EXTRAPOLATE BOTH INTO A CUSTOM HOOK, DO THE REST OF THE UI, ADDING PAGINATION
    // ADD FILTER FOR STORYTYPE, GENRE, TONE, THEME, PROFICIENCY, MAYBE SORT BY DATE MADE TOO
    // MAKE A COMPONENT FOR BUTTON, CALL IT ROUTER BUTTON, TAKES A TEXT AND PATH, TO PREVENT CONSTANTLY CREATING NEW ROUTERS, MAKE VARIATION FOR REPLACE, BACK AND FORWARD

    const [search, setSearch] = useQueryState("search", parseAsString.withDefault(""))
    const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1))
    const filteredList = story.filter((story) => story.title.toLowerCase().includes(search.toLowerCase()));
    const router = useRouter()
    const calendarMonth = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const num1 = (page * 10) - 1
    const filteredStoryList = page === 1? filteredList.slice(0, 10) : filteredList.slice(num1, num1 + 10)
    return(
        <div className="w-full min-h-screen bg-background">
            <Navigation page="Story"/>
            <div className="overflow-x-auto">
                <div className="w-full flex justify-between items-center gap-2">
                    <div className="md:w-3/7 md:self-start flex gap-2 items-center justify-center">
                        <Button onClick={() => router.push("/story/create")} >Create Story</Button>
                        <div className='w-full max-w-xs space-y-2'>
                            <Label htmlFor={"search"}>Search</Label>
                            <div className='relative'>
                                <div className='text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50'>
                                    <Search className='size-4' />
                                    <span className='sr-only'>Search</span>
                                </div>
                                <Input 
                                    defaultValue={search} 
                                    id="search"
                                    type="text"
                                    onChange={(e) => {
                                        setSearch(e.target.value); 
                                        setPage(1)}} 
                                    className="placeholder:text-white peer ps-9"
                                    placeholder="Type something..."
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
                        </div>
                    </div>

                    <Button onClick={() => router.push("/conversation/form")} className="md:hidden">Create Session</Button>
                </div>
                <Table className="w-max min-w-full">
                    <TableHeader>
                        <TableRow>
                            <TableHead></TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Story Type</TableHead>
                            <TableHead>Proficiency</TableHead>
                            <TableHead>Genre</TableHead>
                            <TableHead>Theme</TableHead>
                            <TableHead>Tone</TableHead>
                            <TableHead>Created At</TableHead> 
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredStoryList.map((story) => {
                            const d = new Date(story.created_at)
                            const day = d.getDate()
                            const month = d.getMonth()
                            const year = d.getFullYear()
                            return (
                                <TableRow key={story.id}>
                                    <TableCell>
                                        <Button 
                                            variant={"outline"}
                                            onClick={() => router.push(`/story/${story.id}`)}>
                                                View Story
                                        </Button>
                                    </TableCell>
                                    <TableCell className="max-w-xs">{story.title}</TableCell>
                                    <TableCell>{story.storyType}</TableCell>
                                    <TableCell>{story.proficiency}</TableCell>
                                    <TableCell>{story.tags.genre.join(", ")}</TableCell>
                                    <TableCell>{story.tags.theme.join(", ")}</TableCell>
                                    <TableCell>{story.tags.tone.join(", ")}</TableCell>
                                    <TableCell>{`${day} ${calendarMonth[month]}, ${year}`}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}