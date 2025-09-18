import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserSession } from "@/userSessions";

export default function ConversationHistoryTable({
  className,
  sessionList,
}: {
  className?: string;
  sessionList: UserSession[];
}) {
  if (sessionList.length === 0) {
    return (
      <div
        role="status"
        className="bg-secondary/50 flex w-full items-center justify-around gap-2 p-5 text-center"
      >
        <p className="text-lg font-semibold md:text-2xl">
          No Conversation History Available
        </p>
      </div>
    );
  }

  return (
    <Table className={className}>
      <TableHeader>
        <TableRow className="text-xl font-semibold lg:text-2xl">
          <TableHead>Title</TableHead>
          <TableHead className="text-center">Type</TableHead>
          <TableHead className="text-center">Details</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sessionList.map((session, index) => {
          return (
            <TableRow key={`${session.id}-${index}`}>
              <TableCell className="lg:text-xl">{session.title}</TableCell>
              <TableCell className="text-center lg:text-lg">Call</TableCell>
              <TableCell className="text-center">
                <Button asChild>
                  <Link href={`/conversation/feedback/${session.session_id}`}>
                    <span className="hidden md:inline">View</span> Feedback
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
