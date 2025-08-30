import { ReactNode } from "react";
import Navigation from "@/components/app_layout/Navigation";
import { Button } from "@/components/ui/button";

export default function HomeLayout({
  children,
  conversationHistory,
  storyHistory,
}: {
  children: ReactNode;
  conversationHistory: ReactNode;
  storyHistory: React.ReactNode;
}) {
  return (
    <div className="w-full">
      <Navigation page="HomePage" />
      <main className="bg-background main relative p-1.5 md:p-3">
        {/* SHOW A TOAST INSTEAD OF BUTTON WHEN CARDS ARE DUE, OR SHOW BOTH, FIRST A TOAST THEN A BUTTON */}
        <Button size={"lg"} className="absolute top-3 right-4 hidden">
          VIEW DUE CARDS
        </Button>

        <section className="bg-primary dark:bg-primary/10 hidden max-h-[calc(100%-0.75rem)] w-1/3 justify-center overflow-auto p-3 lg:flex 2xl:w-1/4 2xl:items-center">
          {children}
        </section>

        <section className="w-full space-y-5 overflow-auto px-4 py-3 lg:w-2/3 2xl:w-3/4">
          {conversationHistory}
          {storyHistory}
        </section>
      </main>
    </div>
  );
}
