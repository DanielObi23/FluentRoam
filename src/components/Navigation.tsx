import { UserButton } from '@clerk/nextjs'
import { SidebarTrigger } from "@/components/ui/sidebar"

export default function Navigation({page}: {page: string}) {
    return (
        <header className="bg-muted flex justify-between items-center py-5 px-4 md:px-6 w-full">
            <nav className="flex items-center justify-center gap-1 md:gap-2">
               <SidebarTrigger className="cursor-pointer" /> <h1 className="text-3xl font-bold bg-linear-to-br from-card-foreground to-muted-foreground bg-clip-text text-transparent leading-relaxed">{page}</h1>
            </nav>
            <nav className="text-white space-x-1 md:space-x-3 font-semibold">
                <UserButton 
                    showName 
                    appearance={{
                        elements: {
                            userButtonBox: {
                                color: "oklch(var(--card-foreground))"
                            },
                            userButtonText: {
                                fontWeight: 900,
                                fontSize: "2rem"
                            }
                        }
                    }} />
            </nav>
        </header>
    )
}