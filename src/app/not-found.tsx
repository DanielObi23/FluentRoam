"use client"

import Navigation from "@/components/app_layout/Navigation";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation";

export default function NotFound() {
    const pathname = usePathname();
    const router = useRouter()

    // IF A USER GOES TO "/conversation/feedback", which doesnt exists
    if (pathname === "/conversation/feedback") return <Button onClick={() => router.replace("/conversation")}>Go to conversations</Button>;
    return <div className="w-full h-screen">
        <Navigation page="Not Found Page"/>
    </div>
}

