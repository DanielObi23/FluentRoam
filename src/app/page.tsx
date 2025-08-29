"use client";

//TODO: change this page to the landing page, create a new page called "/home" or "/dashboard",
// then use parallel route (think of sub-navigation as well, add default.tsx as a fallback page) to display different segments of what needs to be displayed, only if that segment needs to perform independently else use components, add loading.tsx, error as well
// style all the errors, loading and notfound and make them clean
// how to prevent users from getting here by just deleting the clerk provider in inspect, make sure database is not accessible,
// and other components linking to api/database be accessible without user being logged in, should be in the server not client code
// ADD CHATBOT ASSISTANT AT THE BUTTOM OF THE PAGE USING VAPI, HELP USERS WITH QUESTIONS ABOUT LANGUAGE LEARNING AND THE APP, ALSO TALK TO ME, ALSO ADD IT TO LANDING PAGE
// STYLE ALL ERROR, LOADING, GLOBAL ERROR, NOT-FOUND PAGES, MAYBE LAYOUT AS WELL, MAKE SURE TO ADD TOASTER, CHECK LAYOUT PAGE, NOT WORKING
// MAKE A LIBRARY FOR POSSIBLE CONVERSATIONS, DIFFERENTIATE BY CATEGORY
// MAKE A LIBRARY FOR STORIES, DIFFERENTIATE BY CATEGORY AND STORY TYPE
// MAKE A LIBRARY FOR TOP 100 VOCAB IN WHATEVER LANGUAGE, SHOULD BE COVERED IN VOCAB ANYWAYS, TRY TO STYLE IT FOLLOWING THE SAME LOGIC AS LEARNRUSSIAN.RT, DIFFERENTIATE BY CATEGORY

import Navigation from "@/components/app_layout/Navigation";
import CallSessionForm from "@/components/conversation_page/forms/CallSessionForm";
import ChatSessionForm from "@/components/conversation_page/forms/ChatSessionForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { userSessions } from "@/userSessions";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { story } from "@/story";
import { useEffect } from "react";
//import { useTranslation } from "react-i18next";
//import { currentUser } from "@clerk/nextjs/server";

export default function Page() {
  // const userData = useUser()
  // const { user } = useUser()
  // // const user = await currentUser();
  // console.log("User", user?.id)
  // console.log("UserData", userData)
  //const { t } = useTranslation()
  const router = useRouter();
  const sessionPage = userSessions.slice(userSessions.length - 5); //Getting the last 5 sessions done
  const storyList = story.slice(story.length - 5); //Getting the last 5 stories done
  const calendarMonth = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    console.log("check if any card is due");
    console.log("if card is due, setCardDue to true");
    console.log(
      "if cardDue is true, show toast with message, review cards, then a button",
    );
  }, []);
  return (
    <div className="w-full">
      <Navigation page="HomePage" />
      <main className="bg-background main relative p-3">
        {/* SHOW A TOAST INSTEAD OF BUTTON WHEN CARDS ARE DUE, OR SHOW BOTH, FIRST A TOAST THEN A BUTTON */}
        <Button size={"lg"} className="absolute top-3 right-4">
          VIEW DUE CARDS
        </Button>
        <section className="bg-primary dark:bg-primary/10 flex max-h-[calc(100%-0.75rem)] w-1/4 items-center p-3">
          <Tabs defaultValue="call" className="w-[400px]">
            <div className="flex w-full items-center justify-around">
              <p className="text-2xl font-semibold">Start Conversation</p>
              <TabsList className="self-end">
                <TabsTrigger value="call">Call</TabsTrigger>
                <TabsTrigger value="chat">Chat</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="call">
              <CallSessionForm />
            </TabsContent>
            <TabsContent value="chat">
              <ChatSessionForm />
            </TabsContent>
          </Tabs>
        </section>
        <section className="w-3/4 space-y-5 px-4 py-3">
          <div className="dark:bg-primary/10 w-full p-3">
            <p className="mb-2.5 text-center text-3xl font-semibold">
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
                        <TableCell className="md:text-2xl">
                          {session.title}
                        </TableCell>
                        <TableCell className="text-center">Call</TableCell>
                        <TableCell className="text-center">
                          <Button
                            onClick={() =>
                              router.push(
                                `/conversation/feedback/${session.session_id}`,
                              )
                            }
                          >
                            <span className="hidden md:inline">View</span>{" "}
                            Feedback
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

          <div className="dark:bg-primary/10 p-3">
            <p className="mb-2.5 text-center text-3xl font-semibold">
              Story History
            </p>
            <Table className="border-2">
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
                {storyList.map((story) => {
                  const d = new Date(story.created_at);
                  const day = d.getDate();
                  const month = d.getMonth();
                  const year = d.getFullYear();
                  return (
                    <TableRow key={story.id}>
                      <TableCell>
                        <Button
                          onClick={() => router.push(`/story/${story.id}`)}
                        >
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
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </section>
      </main>
    </div>
  );
}
