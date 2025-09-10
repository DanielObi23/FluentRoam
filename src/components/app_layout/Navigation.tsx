import { UserButton } from "@clerk/nextjs";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "./ModeToggle";
import { AnimatedThemeToggler } from "@/components/magicui/animated-theme-toggler";

export default function Navigation({ page }: { page: string }) {
  return (
    <header className="bg-muted flex h-20 items-center justify-between px-4 py-5 md:px-6">
      <nav className="flex items-center justify-center gap-1 md:gap-2">
        <SidebarTrigger className="cursor-pointer" />{" "}
        <h1 className="from-card-foreground to-muted-foreground bg-linear-to-br bg-clip-text text-xl leading-relaxed font-bold text-transparent max-[240px]:hidden sm:text-2xl md:text-3xl">
          {page}
        </h1>
      </nav>
      <nav className="flex items-center justify-center gap-2 md:gap-3">
        <div className="hidden md:block">
          <UserButton
            showName
            appearance={{
              elements: {
                userButtonBox: {
                  color: "oklch(var(--card-foreground))",
                },
              },
            }}
          />
        </div>
        <div className="mt-2 block md:hidden">
          <UserButton
            appearance={{
              elements: {
                userButtonBox: {
                  color: "oklch(var(--card-foreground))",
                },
              },
            }}
          />
        </div>
        <AnimatedThemeToggler />
      </nav>
    </header>
  );
}
