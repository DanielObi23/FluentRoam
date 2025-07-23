import { UserButton } from '@clerk/nextjs'
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ModeToggle } from './ModeToggle'

export default function Navigation({page}: {page: string}) {
    return (
        <header className="bg-muted flex justify-between items-center py-5 px-4 md:px-6 min-w-full">
            <nav className="flex items-center justify-center gap-1 md:gap-2">
               <SidebarTrigger className="cursor-pointer" /> <h1 className="text-3xl font-bold bg-linear-to-br from-card-foreground to-muted-foreground bg-clip-text text-transparent leading-relaxed">{page}</h1>
            </nav>
            <nav className="flex justify-center items-center gap-1 md:gap-3">
                <div  className="hidden md:block">
                    <UserButton 
                        showName 
                        appearance={{
                            elements: {
                                userButtonBox: {
                                    color: "oklch(var(--card-foreground))"
                                }
                            }
                        }} />
                </div>
                <div  className="block mt-2 md:hidden">
                    <UserButton 
                        appearance={{
                            elements: {
                                userButtonBox: {
                                    color: "oklch(var(--card-foreground))"
                                }
                            }
                        }} />
                </div>
                    <ModeToggle />
            </nav>
        </header>
    )
}