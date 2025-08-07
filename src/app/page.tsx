'use client'

//TODO: change this page to the landing page, create a new page called "/home" or "/dashboard", 
// then use parallel route (think of sub-navigation as well, add default.tsx as a fallback page) to display different segments of what needs to be displayed, only if that segment needs to perform independently else use components, add loading.tsx, error as well
// style all the errors, loading and notfound and make them clean
// how to prevent users from getting here by just deleting the clerk provider in inspect, make sure database is not accessible, 
// and other components linking to api/database be accessible without user being logged in, should be in the server not client code

import Navigation from "@/components/app_layout/Navigation";
//import { useTranslation } from "react-i18next";
//import { currentUser } from "@clerk/nextjs/server";

export default function Home() {
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
      </main>
    </div>
  );
}
