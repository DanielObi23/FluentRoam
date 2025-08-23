"use client"

import { Home, MessagesSquare, ScrollText, BookA, BookOpenText, Plus } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter
} from "@/components/ui/sidebar"
import Image from "next/image"
import logo from "../../../public/logo/fluentroamTransparent.png"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Button } from "../ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "../ui/dropdown-menu"
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Conversation",
    url: "/conversation",
    icon: MessagesSquare,
  },
  {
    title: "Story",
    url: "/story",
    icon: ScrollText,
  },
  {
    title: "Grammar",
    url: "/grammar",
    icon: BookOpenText,
  },
  {
    title: "Vocabulary list",
    url: "/vocabulary",
    icon: BookA,
  },
]

export default function AppSidebar() {
  const pathname = usePathname()
  return (
    <Sidebar className="bg-muted">
      <SidebarHeader>
          <nav className="flex items-center justify-center bg-slate-90 px-1 py-2">
              <Image src={logo} alt="FluentRoam logo" height={65} width={65} />
              <h1 className="font-bold text-lg md:text-xl">
                  <span className='text-secondary-600'>Fluent</span><span className='text-primary-700'>Roam</span>
              </h1>
          </nav>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="flex justify-center items-center gap-2.5 w-full">
          {items.map((item) => {
            const isActive = item.url === "/" 
                    ? pathname === "/" 
                    : pathname.startsWith(item.url);
                    
            return (
              <SidebarMenuItem key={item.title} className="w-6/7">
                <SidebarMenuButton asChild className="p-3 h-full w-full">
                  <Link href={item.url} className={cn(isActive && "bg-muted-foreground text-white transition-all duration-700 fade-in-5 fade-out-5")}>
                    <item.icon className="!size-5"/>
                    <span className="font-semibold text-lg">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <div className="py-3 px-1.5">
          {/* Maybe use a selector, then using zustand, make sure that if select value changed, global state is updated, maybe save value in local storage */}
          <DropdownMenu>
            <DropdownMenuTrigger>
              Change Language
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                ES Spanish
              </DropdownMenuItem>
              <DropdownMenuItem>
                IT Italian
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Plus /> Add language
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant={"outline"}>ES Spanish</Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}