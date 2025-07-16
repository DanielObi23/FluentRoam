import { UserButton } from '@clerk/nextjs'
import Image from "next/image"
import logo from "../../public/discourse logo.jpeg"

export default function Navigation() {
    return (
        <header className="bg-slate-900 flex justify-between items-center py-4 px-4 md:px-6 w-full mb-5 h-10">
            <nav className="flex items-center gap-1 md:gap-2">
                <Image src={logo} alt="Discourse - AI language learning and brainstorming platform" height={40} width={40} />
                <h1 className="font-bold text-lg md:text-xl">
                    <span className='text-brick-500'>Poly</span><span className='text-mint-500'>Sermo</span>
                </h1>
            </nav>
            <nav className="text-white space-x-1 md:space-x-3 font-semibold">
                <UserButton 
                    showName 
                    appearance={{
                        elements: {
                            userButtonBox: {
                                color: "white"
                            }
                        }
                    }} />
            </nav>
        </header>
    )
}