import Navigation from "@/components/app_layout/Navigation";
import { twMerge } from "tailwind-merge";

export default function Main({
  children,
  page,
  className,
}: {
  children: React.ReactNode;
  page: string;
  className?: string;
}) {
  return (
    <div className="bg-background flex h-screen w-full flex-col overflow-auto">
      <Navigation page={page} />
      <main
        className={twMerge(
          "h-[calc(100vh-5rem)] overflow-auto p-1.5 md:p-3",
          className,
        )}
      >
        {children}
      </main>
    </div>
  );
}
