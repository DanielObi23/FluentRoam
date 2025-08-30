"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { userSessions } from "@/userSessions";

export default function ConversationHistory() {
  const isMobile = useIsMobile();
  const router = useRouter();
  let sessionPage;
  if (isMobile) {
    sessionPage = userSessions.slice(userSessions.length - 3); //Getting the last 5 sessions done
  } else {
    sessionPage = userSessions.slice(userSessions.length - 5); //Getting the last 5 sessions done
  }
  return (
    <div className="dark:bg-primary/10 w-full p-3">
      <p className="font-ui mb-2.5 text-center text-xl font-semibold md:text-3xl">
        Conversation History
      </p>
      <Table className="border-2 p-3">
        <TableHeader>
          <TableRow className="text-2xl font-semibold">
            <TableHead>Title</TableHead>
            <TableHead className="text-center">Type</TableHead>
            <TableHead className="text-center">Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sessionPage.length > 0 ? (
            sessionPage.map((session) => {
              return (
                <TableRow key={session.id}>
                  <TableCell className="md:text-2xl">{session.title}</TableCell>
                  <TableCell className="text-center">Call</TableCell>
                  <TableCell className="text-center">
                    <Button
                      onClick={() =>
                        router.push(
                          `/conversation/feedback/${session.session_id}`,
                        )
                      }
                    >
                      <span className="hidden md:inline">View</span> Feedback
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            // IF PAGE IS NOT EQUAL TO 1, SHOW THIS, ELSE IMMEDIATELY SAY NO DATA IN PAGE WHATEVER, BUTTON TO REDIRECT TO PAGE 1, ELSE THIS
            // IF SESSIONS LENGTH = 0, JUST MAKE IT RENDER THIS AS WELL
            <TableRow>
              <TableCell>NO PRACTICE SESSIONS DONE</TableCell>
              <TableCell>
                <Button onClick={() => router.push(`/conversation/form`)}>
                  Create Session
                </Button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
