"use client"

import Navigation from "@/components/app_layout/Navigation";

export default function Page() {
    return(
        <div className="w-full min-h-screen bg-background">
            <Navigation page="Vocabulary"/>
            <div className="h-full flex flex-col justify-center items-center gap-4 bg-purple-400">
                <div className="w-full flex justify-around">
                    <div>
                        <div className="size-15 bg-background"></div>
                        <p>background</p>
                    </div>
                    <div>
                        <div className="size-15 bg-foreground"></div>
                        <p>foreground</p>
                    </div>
                    <div>
                        <div className="size-15 bg-card"></div>
                        <p>card</p>
                    </div>
                    <div>
                        <div className="size-15 bg-muted"></div>
                        <p>muted</p>
                    </div>
                </div>
                <div className="w-full flex justify-around">
                    <div className="size-10 rounded-full bg-primary-50"></div>
                    <div className="size-10 rounded-full bg-primary-100"></div>
                    <div className="size-10 rounded-full bg-primary-200"></div>
                    <div className="size-10 rounded-full bg-primary-300"></div>
                    <div className="size-10 rounded-full bg-primary-400"></div>
                    <div className="size-10 rounded-full bg-primary-500"></div>
                    <div className="size-10 rounded-full bg-primary-600"></div>
                    <div className="size-10 rounded-full bg-primary-700"></div>
                    <div className="size-10 rounded-full bg-primary-800"></div>
                    <div className="size-10 rounded-full bg-primary-900"></div>
                    <div className="size-10 rounded-full bg-primary-950"></div>
                </div>
                <div className="w-full flex justify-around">
                    <div className="size-10 rounded-full bg-secondary-50"></div>
                    <div className="size-10 rounded-full bg-secondary-100"></div>
                    <div className="size-10 rounded-full bg-secondary-200"></div>
                    <div className="size-10 rounded-full bg-secondary-300"></div>
                    <div className="size-10 rounded-full bg-secondary-400"></div>
                    <div className="size-10 rounded-full bg-secondary-500"></div>
                    <div className="size-10 rounded-full bg-secondary-600"></div>
                    <div className="size-10 rounded-full bg-secondary-700"></div>
                    <div className="size-10 rounded-full bg-secondary-800"></div>
                    <div className="size-10 rounded-full bg-secondary-900"></div>
                    <div className="size-10 rounded-full bg-secondary-950"></div>
                </div>
                <div className="w-full flex justify-around">
                    <div className="size-10 rounded-full bg-accent-50"></div>
                    <div className="size-10 rounded-full bg-accent-100"></div>
                    <div className="size-10 rounded-full bg-accent-200"></div>
                    <div className="size-10 rounded-full bg-accent-300"></div>
                    <div className="size-10 rounded-full bg-accent-400"></div>
                    <div className="size-10 rounded-full bg-accent-500"></div>
                    <div className="size-10 rounded-full bg-accent-600"></div>
                    <div className="size-10 rounded-full bg-accent-700"></div>
                    <div className="size-10 rounded-full bg-accent-800"></div>
                    <div className="size-10 rounded-full bg-accent-900"></div>
                    <div className="size-10 rounded-full bg-accent-950"></div>
                </div>
            </div>
        </div>
    )
}