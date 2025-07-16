'use client'

import { SidebarTrigger } from "@/components/ui/sidebar"
//import { currentUser } from "@clerk/nextjs/server";

export default function Home() {
  // const userData = useUser()
  // const { user } = useUser()
  // // const user = await currentUser();
  // console.log("User", user?.id)
  // console.log("UserData", userData)

  return (
    <>
      <main className="w-full min-h-screen p-3 bg-primary">
        <div className="inline"><SidebarTrigger/> <h1>Hello world</h1></div>
        <div className="size-20 bg-red-800 rounded-full"></div>
      </main>
    </>
  );
}
