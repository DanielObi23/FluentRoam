"use client"

import Navigation from "@/components/app_layout/Navigation";
import { Button } from "@/components/ui/button";
import {story} from "@/story"
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter()
    return(
        <div className="w-full min-h-screen bg-background">
            <Navigation page="Story"/>
            <div>
                {story.map((story) => (
                    <p key={story.id}>
                        {story.storyType}: {story.title} | <Button onClick={() => router.push(`/story/${story.id}`)}>More details</Button> 
                    </p>
                ))}
            </div>
        </div>
    )
}