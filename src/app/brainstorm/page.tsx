"use client"

import Navigation from "@/components/Navigation";
import { parseAsString, useQueryState } from "nuqs"

export default function BrainStorm() {
    const [name, setName] = useQueryState("name", parseAsString.withDefault("dan"))
    return(
        <div className="w-full min-h-screen bg-background">
            <Navigation page="BrainStorm"/>
        </div>
    )
}