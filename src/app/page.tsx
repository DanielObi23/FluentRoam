'use client'

import { SignUp, useUser } from '@clerk/nextjs'
import { Button } from "@/components/ui/button";
//import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const userData = useUser()
  const { user } = useUser()
  // const user = await currentUser();
  console.log("User", user?.id)
  console.log("UserData", userData)

  return (
    <>
      <h1>Hello {user?.firstName ?? 'User'}</h1>
      <Button className="cursor-pointer">
        Click Me
      </Button>
    </>
  );
}
