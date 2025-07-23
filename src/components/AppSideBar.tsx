"use client"

import { Home, MessageSquare, Brain, BookA, BookOpenText } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader
} from "@/components/ui/sidebar"
import Image from "next/image"
import logo from "../../public/polysermo.png"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import Link from "next/link"

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
    icon: MessageSquare,
  },
  {
    title: "Vocabulary list",
    url: "/vocabulary",
    icon: BookA,
  },
  {
    title: "Quiz",
    url: "/quiz",
    icon: BookOpenText,
  },
  {
    title: "BrainStorm",
    url: "/brainstorm",
    icon: Brain,
  },
]

export default function AppSidebar() {
  const pathname = usePathname()
  return (
    <Sidebar className="bg-muted">
      <SidebarHeader>
          <nav className="flex items-center justify-center gap-1 bg-slate-90 px-1 py-2">
              <Image src={logo} alt="Discourse - AI language learning and brainstorming platform" height={45} width={45} />
              <h1 className="font-bold text-lg md:text-xl">
                  <span className='text-secondary-600'>Poly</span><span className='text-primary-700'>Sermo</span>
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
    </Sidebar>
  )
}