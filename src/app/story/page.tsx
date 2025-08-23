"use client"

import Navigation from "@/components/app_layout/Navigation";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {story} from "@/story"
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter()
    const calendarMonth = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    return(
        <div className="w-full min-h-screen bg-background">
            <Navigation page="Story"/>
            <div className="overflow-x-auto">
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
                        {story.map((story) => {
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