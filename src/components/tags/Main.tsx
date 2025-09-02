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
    <div className="bg-background flex h-screen w-full flex-col">
      <Navigation page={page} />
      <main className={twMerge("flex-1 overflow-auto p-1.5 md:p-3", className)}>
        <div
          className={twMerge(
            "flex min-h-full items-center justify-center",
            className,
          )}
        >
          {children}
        </div>
      </main>
    </div>
  );
}
