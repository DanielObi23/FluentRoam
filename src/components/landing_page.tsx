import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

import { Button } from "@/components/ui/button"
import {SignInButton, SignUpButton} from '@clerk/nextjs'
import Image from "next/image"
import logo from "../../public/discourse logo.jpeg"
import { Sparkles, BookOpen, Brain, CheckCircle } from "lucide-react"

export default function LandingPage() {
  return (
   <div className="min-h-screen w-full">
        <header className="bg-slate-900 flex justify-between items-center py-4 px-6 fixed top-0 left-0 w-full z-50">
            <nav className="flex items-center gap-2">
                <Image src={logo} alt="Discourse - AI language learning and brainstorming platform" height={40} width={40} />
                <h1 className="text-white font-bold text-xl">Discourse</h1>
            </nav>
            <nav className="text-white space-x-3 font-semibold">
                <SignInButton>
                    <Button className="text-white font-bold cursor-pointer">Sign In</Button>
                </SignInButton>
                <SignUpButton>
                    <Button variant={"secondary"} className="font-bold cursor-pointer">Get Started</Button>
                </SignUpButton>
            </nav>
        </header>
        <main className="pt-18">
            <section className="w-full flex px-7 py-12 bg-slate-200">
                <div className="w-1/2 px-3 flex items-center justify-center">
                    <div className="space-y-5">
                        <h1 className="font-bold text-6xl">
                            <span className="">Think It Through.</span> <span className="text-orange-800">Say It Right.</span>
                        </h1>
                        <p className="font-semibold text-xl">Think bigger. Speak better. Master languages through real conversations and unlock your creativity with AI-powered brainstorming</p>
                        <div className="flex items-center justify-center gap-7">
                            <SignUpButton>
                                <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-lg px-8 py-3 cursor-pointer">
                                    <BookOpen className="mr-2 h-5 w-5" />
                                    Start Practicing
                                </Button>
                            </SignUpButton>
                            <SignUpButton>
                                <Button size="lg" variant="outline" className="border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-8 py-3 text-lg">
                                    <Brain className="mr-2 h-5 w-5" />
                                    Try Brainstorm Mode
                                </Button>
                            </SignUpButton>
                        </div>
                    </div>
                </div>
                <div className="w-1/2">
                    <div className="relative">
                        <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md mx-auto">
                            <div className="flex items-center justify-between pb-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                                </div>
                                <div className="bg-gradient-to-r from-indigo-100 to-purple-100 px-3 py-1 rounded-full">
                                    <span className="text-indigo-700 font-medium text-sm">🎭 <span className="font-bold">Role-play:</span> Job Interview</span>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-end">
                                    <div className="bg-indigo-600 text-white rounded-2xl rounded-br-md px-4 py-2 max-w-xs">
                                        Creo que mi experiencia en liderazgo me hace el candidato ideal para este puesto
                                    </div>
                                </div>
                                <div className="flex justify-start relative">
                                    <div className="bg-gray-100 text-gray-900 rounded-2xl rounded-bl-md px-4 py-2 max-w-xs">
                                    Interesante. ¿Podrías profundizar en algún ejemplo específico donde tu liderazgo generó resultados tangibles?
                                    </div>
                                    <div className="absolute -top-3 -left-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full p-2">
                                        <Sparkles className="h-4 w-4 text-white" />
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <div className="bg-indigo-600 text-white rounded-2xl rounded-br-md px-4 py-2 max-w-xs">
                                    Por supuesto. Encabecé una iniciativa interdisciplinaria que optimizó nuestro proceso de adquisiciones
                                    </div>
                                </div>
                                <div className="bg-green-50 border border-green-200 rounded-lg py-3 pl-3 pr-2">
                                    <div className="flex items-center space-x-2 text-green-700 text-sm">
                                        <CheckCircle className="h-8 w-8" />
                                        <span>Excellent professional vocabulary! Saved: 'encabecer,' 'interdisciplinaria,' 'optimizar,' 'adquisiciones'</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
   </div>
  )
}
