'use client'

//TODO: change this page to the landing page, create a new page called "/home" or "/dashboard", 
// then use parallel route (think of sub-navigation as well, add default.tsx as a fallback page) to display different segments of what needs to be displayed, only if that segment needs to perform independently else use components, add loading.tsx, error as well
// style all the errors, loading and notfound and make them clean
// how to prevent users from getting here by just deleting the clerk provider in inspect, make sure database is not accessible, 
// and other components linking to api/database be accessible without user being logged in, should be in the server not client code

import Navigation from "@/components/app_layout/Navigation";
//import { useTranslation } from "react-i18next";
//import { currentUser } from "@clerk/nextjs/server";

export default function Page() {
  // const userData = useUser()
  // const { user } = useUser()
  // // const user = await currentUser();
  // console.log("User", user?.id)
  // console.log("UserData", userData)
  //const { t } = useTranslation()
  return (
    <div className="w-full">
      <Navigation page="HomePage"/>
      <main className="w-full min-h-screen p-3 bg-background">
        <div className="inline text-secondary-800"> <h1>Hello world</h1></div>
        <div className="size-20 bg-accent-600 rounded-full"></div>
        <div>ADD CHATBOT ASSISTANT AT THE BUTTOM OF THE PAGE USING VAPI, 
          HELP USERS WITH QUESTIONS ABOUT LANGUAGE LEARNING AND THE APP, 
          ALSO TALK TO ME, ALSO ADD IT TO LANDING PAGE</div>

        <div>STYLE ALL ERROR, LOADING, GLOBAL ERROR, NOT-FOUND PAGES, MAYBE LAYOUT AS WELL, MAKE SURE TO ADD TOASTER, CHECK LAYOUT PAGE, NOT WORKING</div>

        <div>MAKE A LIBRARY FOR POSSIBLE CONVERSATIONS, DIFFERENTIATE BY CATEGORY</div>
        <div>MAKE A LIBRARY FOR STORIES, DIFFERENTIATE BY CATEGORY AND STORY TYPE</div>
        <div>MAKE A LIBRARY FOR TOP 100 VOCAB IN WHATEVER LANGUAGE, SHOULD BE COVERED IN VOCAB ANYWAYS, TRY TO STYLE IT FOLLOWING THE SAME LOGIC AS LEARNRUSSIAN.RT, DIFFERENTIATE BY CATEGORY</div>
      </main>
    </div>
  );
}
