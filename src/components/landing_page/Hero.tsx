"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {SignUpButton} from '@clerk/nextjs'
import { Sparkles, BookOpen, Brain, CheckCircle, Languages } from "lucide-react"

export default function Hero() {
    const [currentMode, setCurrentMode] = useState("brainstorm")
    function toggleMode(){
        setCurrentMode(currentMode == "brainstorm"? "language" : "brainstorm")
    }
    return (
        <section className="w-full flex flex-col md:flex-row px-7 py-12 bg-slate-200 gap-7">
            <div className="w-full md:w-1/2 px-3 flex items-center justify-center">
                <div className="space-y-5 w-full">
                    <h1 className="font-bold text-2xl md:text-6xl">
                        <span className="">Think It Through.</span> <span className="text-red-800">Say It Right.</span>
                    </h1>
                    <p className="font-semibold text-base md:text-xl">Think bigger. Speak better. Master languages through real conversations and unlock your creativity with AI-powered brainstorming — <span className="text-red-800">anytime, anywhere.</span></p>
                    <div className="flex flex-col xl:flex-row items-center justify-center gap-7 w-full">
                        <SignUpButton>
                            <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-lg px-8 py-3 cursor-pointer w-full xl:w-1/2">
                                <BookOpen className="mr-2 h-5 w-5" />
                                Start Practicing
                            </Button>
                        </SignUpButton>
                        <Button size="lg" variant="outline" className="border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-8 py-3 text-lg w-full xl:w-1/2" onClick={toggleMode}>
                            {currentMode == "brainstorm"
                                ? (
                                    <>
                                        <Languages className="mr-2 h-5 w-5" /> Try Language Mode
                                    </>
                                )
                                : (
                                    <>
                                        <Brain className="mr-2 h-5 w-5" /> Try Brainstorm Mode
                                    </>
                                )
                            }
                        </Button>
                    </div>
                </div>
            </div>
            <div className="w-full md:w-1/2">
                <div className="relative">
                    <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md mx-auto">
                        <div className="flex items-center justify-between pb-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                            </div>
                            <div className="bg-gradient-to-r from-indigo-100 to-purple-100 px-3 py-1 rounded-full">
                                {currentMode == "brainstorm"? <span className="text-indigo-700 font-bold text-sm">🧠 BrainStorm Mode</span> : <span className="text-indigo-700 font-medium text-sm">🎭 <span className="font-bold">Role-play:</span> Job Interview</span>}
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-end">
                                <div className="bg-indigo-600 text-white rounded-2xl rounded-br-md px-4 py-2 max-w-xs">
                                    {currentMode == "brainstorm"? 
                                        "I have an idea for an app, but I'm not sure if it's viable" : 
                                        "Creo que mi experiencia en liderazgo me hace el candidato ideal para este puesto"}
                                </div>
                            </div>
                            <div className="flex justify-start relative">
                                <div className="bg-gray-100 text-gray-900 rounded-2xl rounded-bl-md px-4 py-2 max-w-xs">
                                    {currentMode == "brainstorm"? 
                                        "Perfect! Let's explore this together. What specific problem would your app solve?" : 
                                        "Interesante. ¿Podrías profundizar en algún ejemplo específico donde tu liderazgo generó resultados tangibles?"}
                                </div>
                                <div className="absolute -top-3 -left-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full p-2">
                                    <Sparkles className="h-4 w-4 text-white" />
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <div className="bg-indigo-600 text-white rounded-2xl rounded-br-md px-4 py-2 max-w-xs">
                                    {currentMode == "brainstorm"? 
                                        "It would help students find compatible study partners" : 
                                        "Por supuesto. Encabecé una iniciativa interdisciplinaria que optimizó nuestro proceso de adquisiciones"}
                                </div>
                            </div>
                            {currentMode == "brainstorm"? 
                                <div className="flex justify-start relative">
                                    <div className="bg-gray-100 text-gray-900 rounded-2xl rounded-bl-md px-4 py-2 max-w-xs">
                                        Interesting! How would you determine compatibility? Based on schedules, learning styles, or something else?
                                    </div>
                                    <div className="absolute -top-3 -left-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full p-2">
                                        <Sparkles className="h-4 w-4 text-white" />
                                    </div>
                                </div> :
                                <div className="bg-green-50 border border-green-200 rounded-lg py-3 pl-3 pr-2">
                                    <div className="flex items-center space-x-2 text-green-700 text-sm">
                                        <CheckCircle className="h-8 w-8" />
                                        <span>Excellent professional vocabulary! Saved: 'encabecer,' 'interdisciplinaria,' 'optimizar,' 'adquisiciones'</span>
                                    </div>
                                </div>}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}