import {SignInButton, SignUpButton} from '@clerk/nextjs'
import Image from "next/image"
import logo from "../../../public/logo/fluentroamTransparent.png"
import { Button } from "@/components/ui/button"

export default function Header() {
    return (
        <header className="bg-slate-900/85 flex justify-between items-center py-4 px-4 md:px-6 fixed top-0 left-0 w-full z-50">
            <nav className="flex items-center gap-1 md:gap-2">
                <Image src={logo} alt="Discourse - AI language learning and brainstorming platform" height={40} width={40} />
                <h1 className="font-bold text-lg md:text-xl">
                    <span className='text-brick-500'>Poly</span><span className='text-mint-500'>Sermo</span>
                </h1>
            </nav>
            <nav className="text-white space-x-1 md:space-x-3 font-semibold">
                <SignInButton>
                    <Button className="text-white font-bold cursor-pointer">Sign In</Button>
                </SignInButton>
                <SignUpButton>
                    <Button variant={"secondary"} className="font-bold cursor-pointer">Get Started</Button>
                </SignUpButton>
            </nav>
        </header>
    )
}