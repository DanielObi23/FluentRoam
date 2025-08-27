"use client"

import Navigation from "@/components/app_layout/Navigation";
import { Button } from "@/components/ui/button";
//import { lesson } from "./lesson1";
import { PlayCircle } from "lucide-react";
import Audio from "@/components/Audio";
//import {buenos_dias} from ""

export default function Page() {
    const vocabAudioLocation = "/lesson1_audio/lesson1_vocab_audio"
    const vocabList = [
        { source: "Buenos días",        target: "Good morning",               audio: "/buenos_dias.mp3" },
        { source: "Buenas tardes",      target: "Good afternoon",             audio: "/buenas_tardes.mp3" },
        { source: "Buenas noches",      target: "Good evening / Good night",  audio: "/buenas_noches.mp3" },
        { source: "Hola",               target: "Hello",                      audio: "/hola.mp3" },
        { source: "¿Qué tal?",          target: "How's it going?",            audio: "/que_tal.mp3" },
        { source: "Hasta mañana",       target: "See you tomorrow",           audio: "/hasta_mañana.mp3" },
        { source: "Hasta luego",        target: "See you later",              audio: "/hasta_luego.mp3" },
        { source: "Adiós",              target: "Goodbye",                    audio: "/adiós.mp3" },
        { source: "Por favor",          target: "Please",                     audio: "/por_favor.mp3" },
        { source: "Gracias",            target: "Thank you",                  audio: "/gracias.mp3" },
        { source: "De nada",            target: "You're welcome",             audio: "/de_nada.mp3" },
        { source: "Sí",                 target: "Yes",                        audio: "/sí.mp3" },
        { source: "No",                 target: "No",                         audio: "/no.mp3" },
        { source: "Perdón",             target: "Excuse me / sorry",          audio: "/perdón.mp3" },
        { source: "Lo siento",          target: "I'm sorry",                  audio: "/lo_siento.mp3" },
        { source: "¿Cómo estás?",       target: "How are you? (casual)",      audio: "/cómo_estás.mp3" },
        { source: "Estoy bien, ¿y tú?", target: "I'm good, and you?",         audio: "/estoy_bien.mp3" },
        { source: "¿Cómo te llamas?",   target: "What's your name?",          audio: "/cómo_te_llamas.mp3" },
        { source: "Me llamo (tu nombre)", target: "My name is (your name)",   audio: "/me_llamo.mp3" },
        { source: "Mucho gusto",        target: "Nice to meet you",           audio: "/mucho_gusto.mp3" },
        { source: "El gusto es mío",    target: "The pleasure is mine",       audio: "/el_gusto_es_mío.mp3" },
    ];

    // There'll be 2 main story type, flash-fiction, descriptive/narrative telling (what's the difference) and stage play
    // make a formal version as well
    const story1 = [
        {"speaker": "Carlos", "text": "Hola, ¿Qué tal?"},
        {"speaker": "Isabella", "text": "Estoy bien, ¿y tú?"},
        {"speaker": "Carlos", "text": "Mas o menos, ¿Cómo te llamas?"},        
        {"speaker": "Isabella", "text": "Me llamo Isabella, ¿y tú?"},        
        {"speaker": "Carlos", "text": "Me llamo Carlos, mucho gusto"},        
        {"speaker": "Isabella", "text": "El gusto es mío"},        
    ]

    return(
        <div className="w-full min-h-screen bg-background">
            <Navigation page="Grammar"/>
            <main className="w-full flex p-3">
                <section className="w-5/7 overflow-y-auto flex flex-col items-center gap-5" aria-label="The Spanish Alphabet, Pronunciation & Greetings">
                    <h1 className="text-2xl font-bold underline">The Spanish Alphabet, Pronunciation & Greetings</h1>

                    <section className="flex gap-2 justify-around w-full" aria-label="Alphabet & Pronunciation in Spanish">
                        <iframe 
                            width="420" 
                            height="315"
                            loading="lazy" 
                            src="https://www.youtube.com/embed/kJQjXAVEWt0?list=PLv63dFTP4Sjq6knRsZQI-bTnRE38cZZoy"
                            title="How To Pronounce Letters In Spanish" 
                            allowFullScreen>
                        </iframe>
                        <article className="flex flex-col items-center w-2/5 gap-1">
                            <h2 className="text-xl font-semibold underline">Alphabet & Pronunciation in Spanish</h2>
                            <p className="indent-6 font-semibold">
                                The Spanish alphabet has 27 letters, including 'ñ'. 
                                Accents (tildes) are written marks that indicate stress or change meaning, 
                                for example: 'sí' (yes) vs 'si' (if). 
                                Stress usually falls on the second-to-last syllable unless marked by an accent. 
                                Diphthongs are combinations of two vowels in the same syllable, like 'ie' in 'tierra' (land). 
                                Pronunciation is generally consistent: each letter has one main sound, unlike English.</p>
                        </article>
                    </section>
                    
                    <section className="flex items-center justify-around w-full" aria-label="Greetings in Spanish">
                        <article className="flex flex-col items-center">
                            <h2 className="text-xl font-semibold underline">Greetings in Spanish</h2>
                            <ul className="grid grid-cols-12 gap-1">
                                {vocabList.map((vocab, index) => {
                                    const currentVocab = `${vocab}-${index}`
                                    return (
                                    <li key={currentVocab} className="text-semibold col-span-4">
                                        <div className="flex gap-1 items-center">
                                            <audio preload="none" key={`audio-${currentVocab}`} id={currentVocab}>
                                                <source src={`${vocabAudioLocation}${vocab.audio}`} />
                                            </audio>
                                            <p>{vocab.source}</p> 
                                            <button
                                                type="button"
                                                aria-label={`Play “${vocab.source}” audio`}
                                                onClick={() =>
                                                    (document.getElementById(currentVocab) as HTMLAudioElement)?.play()
                                                }
                                                className="p-1 rounded-full hover:bg-muted/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                                >
                                                <PlayCircle className="cursor-pointer" />
                                            </button>                                            
                                        </div>
                                        <p>{vocab.target} </p>&nbsp;
                                    </li>
                                )})}
                            </ul>
                        </article>
                        
                        <iframe 
                            width="420" 
                            height="315" 
                            loading="lazy"
                            src="https://www.youtube.com/embed/AqfQQZVmTUw"
                            title="Learn How to Greet in Spanish" 
                            allowFullScreen>
                        </iframe>
                    </section>
                    
                </section>
                <section className="w-2/7 flex flex-col items-center">
                    <div className="w-full p-2 place-items-center space-y-3">
                        <ul>
                            {story1.map((story, index) => (
                                <li key={`${story.speaker}-${index}`}>
                                    <span className="font-semibold">{story.speaker}:</span>&nbsp; {story.text}
                                </li>
                            ))}
                        </ul>
                        {/* <Audio audioUrl=""/> */}
                    </div>
                    
                    <Button>Button to send feedback of error to me</Button>
                </section>
            </main>
        </div>
    )
}