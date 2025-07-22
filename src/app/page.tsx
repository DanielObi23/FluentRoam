'use client'

import Navigation from "@/components/Navigation";
import { useTranslation } from "react-i18next";
//import { currentUser } from "@clerk/nextjs/server";

export default function Home() {
  // const userData = useUser()
  // const { user } = useUser()
  // // const user = await currentUser();
  // console.log("User", user?.id)
  // console.log("UserData", userData)
  const { t } = useTranslation()
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
