"use client";

import { Home, MessagesSquare, ScrollText, BookA } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import Image from "next/image";
import logo from "../../../public/logo/fluentroamTransparent.png";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/home",
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
    title: "Vocabulary list",
    url: "/vocabulary",
    icon: BookA,
  },
];

export default function AppSidebar() {
  const pathname = usePathname();
  return (
    <Sidebar className="bg-muted">
      <SidebarHeader>
        <nav className="bg-slate-90 flex items-center justify-center px-1 py-2">
          <Image src={logo} alt="FluentRoam logo" height={65} width={65} />
          <h1 className="text-lg font-bold md:text-xl">
            <span className="text-secondary-600">Fluent</span>
            <span className="text-primary-700">Roam</span>
          </h1>
        </nav>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="flex w-full items-center justify-center gap-2.5">
          {items.map((item) => {
            const isActive =
              item.url === "/"
                ? pathname === "/"
                : pathname.startsWith(item.url);

            return (
              <SidebarMenuItem key={item.title} className="w-6/7">
                <SidebarMenuButton asChild className="h-full w-full p-3">
                  <Link
                    href={item.url}
                    className={cn(
                      isActive &&
                        "bg-muted-foreground fade-in-5 fade-out-5 text-white transition-all duration-700",
                    )}
                  >
                    <item.icon className="!size-5" />
                    <span className="text-lg font-semibold">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
