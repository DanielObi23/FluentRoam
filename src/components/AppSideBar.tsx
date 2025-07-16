import { Home, MessageSquare, Brain, BookA, BookOpenText } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader
} from "@/components/ui/sidebar"
import { UserButton } from "@clerk/nextjs"
import Image from "next/image"
import logo from "../../public/discourse logo.jpeg"
import { ThemeToggle } from "@/components/ThemeToggle";

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
    url: "#",
    icon: BookA,
  },
  {
    title: "Quiz",
    url: "#",
    icon: BookOpenText,
  },
  {
    title: "BrainStorm",
    url: "#",
    icon: Brain,
  },
]

export default function AppSidebar() {
  return (
    <Sidebar>
        <SidebarHeader>
            <nav className="flex items-center justify-center gap-1 md:gap-2 bg-slate-900 px-1 py-2">
                <Image src={logo} alt="Discourse - AI language learning and brainstorming platform" height={40} width={40} />
                <h1 className="font-bold text-lg md:text-xl">
                    <span className='text-brick-500'>Poly</span><span className='text-mint-500'>Sermo</span>
                </h1>
            </nav>
        </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <ThemeToggle />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <UserButton showName/>
      </SidebarFooter>
    </Sidebar>
  )
}