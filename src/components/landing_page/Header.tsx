import { SignInButton } from "@clerk/nextjs";
import Image from "next/image";
import logo from "../../../public/logo/fluentroamTransparent.png";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="sticky top-0 left-0 z-50 w-full bg-slate-900/80">
      <nav className="flex w-full items-center justify-between gap-1 p-4 max-[300px]:flex-col">
        <div className="flex items-center">
          <Image src={logo} alt="FluentRoam logo" height={65} width={65} />
          <h1 className="text-lg font-bold md:text-xl">
            <span className="text-secondary-600">Fluent</span>
            <span className="text-primary-700">Roam</span>
          </h1>
        </div>
        <div className="space-x-1 font-semibold text-white md:space-x-3">
          <SignInButton>
            <Button className="cursor-pointer font-bold text-white">
              Sign In
            </Button>
          </SignInButton>
        </div>
      </nav>
    </header>
  );
}
