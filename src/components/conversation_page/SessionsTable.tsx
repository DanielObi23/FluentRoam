//TODO: use react query to query first 50 pages, then cache it

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import { Input } from "../ui/input"
import { useRouter } from "next/navigation";
import { userSessions } from "@/dummy_data";
import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogDescription} from "@/components/ui/dialog"
import { parseAsInteger, parseAsString ,useQueryState } from "nuqs";


type Session = {
    id: string,
    session_id: string,
    user_id: string,
    title: string,
    role_scenario: string,
    feedback: string,
    target_vocabulary: string[],
    user_audio: string,
    created_at: string
}

type Row = {
    sessions: Session[],
    page: number
}

export default function SessionsTable() {
    const [search, setSearch] = useQueryState("search", parseAsString.withDefault(""))
    const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1))
    const router = useRouter()
    const pageButtonRef = useRef<HTMLDivElement>(null)
    
    const filteredSessions = userSessions.filter((session) => session.title.toLowerCase().includes(search.toLowerCase()));

    useEffect(() => {
        pageButtonRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    const num1 = (page * 10) - 1
    const sessionPage = page === 1? filteredSessions.slice(0, 10) : filteredSessions.slice(num1, num1 + 10)
    return (
        <>
            <Input defaultValue={search} onChange={(e) => {setSearch(e.target.value); setPage(1)}} className="md:w-3/7 md:self-start"/>
            <Table>
                <TableHeader>
                    <TableRow className="font-semibold text-4xl">
                        <TableHead>
                           Title
                        </TableHead>
                        <TableHead>
                            Details
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {sessionPage.length > 0 ? 
                        (sessionPage.map(session => {
                            return (
                                <TableRow key={session.id}>
                                    <TableCell className="md:text-2xl">
                                        {session.title}
                                    </TableCell>
                                    <TableCell>
                                        <Dialog>
                                            <DialogTrigger className="button">More Details</DialogTrigger>
                                            <DialogContent className="flex items-center justify-center h-[calc(100vh-20px)]">
                                            <DialogTitle className="hidden">Create Session Form</DialogTitle>
                                            <DialogDescription className="hidden">
                                                This action is to create a language form
                                            </DialogDescription>
                                            </DialogContent>
                                        </Dialog>
                                    </TableCell>
                                </TableRow>
                            )})) : (
                                <TableRow>
                                    <TableCell>NO PRACTICE SESSIONS DONE</TableCell>
                                </TableRow>
                            )
                    }
                </TableBody>
            </Table>
            <div ref={pageButtonRef} className="flex justify-end items-center gap-3">
                <Button onClick={() => setPage(prev => prev - 1)} disabled={page <= 1} className="md:text-lg">Previous</Button>
                <Button onClick={() => setPage(prev => prev + 1)} disabled={sessionPage.length < 10 || filteredSessions.length <= 10} className="md:text-lg">Next</Button>
            </div>
        </>
    )
}