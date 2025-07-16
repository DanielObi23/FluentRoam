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
    <main className="w-full min-h-screen p-3 bg-mint-500">
      <SidebarTrigger/>
    </main>
  );
}
