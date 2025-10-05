import { Button } from "@/components/ui/button";
import { SignUpButton } from "@clerk/nextjs";
import { Sparkles, BookOpen, CheckCircle } from "lucide-react";

export default function Hero() {
  return (
    <section className="flex w-full flex-col gap-7 px-7 py-12 md:flex-row">
      <div className="flex w-full items-center justify-center px-3 md:w-1/2">
        <div className="w-full space-y-5">
          <h1 className="text-2xl font-bold md:text-6xl">
            <span>Think Faster.</span>{" "}
            <span className="text-red-800">Speak Better.</span>
          </h1>
          <p className="text-base font-semibold md:text-xl">
            Practice real conversations, explore interactive stories, and build
            your vocabulary — all powered by AI.{" "}
            <br className="hidden md:block" />
            <span className="text-red-800">
              Learn languages through connection and creativity.
            </span>
          </p>
          <div className="flex w-full flex-col items-center justify-center gap-7 xl:flex-row">
            <SignUpButton>
              <Button
                size="lg"
                className="w-full cursor-pointer bg-indigo-600 px-8 py-3 text-lg text-indigo-50 hover:bg-indigo-700 xl:w-1/2"
              >
                <BookOpen className="mr-2 h-5 w-5" />
                Start Practicing
              </Button>
            </SignUpButton>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2">
        <div className="relative">
          <div className="mx-auto max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between gap-2 pb-4 max-[380px]:flex-col">
              <div className="flex items-center space-x-3 max-[380px]:self-start">
                <div className="h-3 w-3 rounded-full bg-red-400"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                <div className="h-3 w-3 rounded-full bg-green-400"></div>
              </div>
              <div className="rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 px-3 py-1">
                <span className="text-sm font-medium text-indigo-700">
                  🎭 <span className="font-bold">Role-play:</span> Job Interview
                </span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-end">
                <div className="max-w-xs rounded-2xl rounded-br-md bg-indigo-600 px-4 py-2 text-white">
                  <p>
                    Creo que mi experiencia en liderazgo me hace el candidato
                    ideal para este puesto
                  </p>
                </div>
              </div>
              <div className="relative flex justify-start">
                <div className="max-w-xs rounded-2xl rounded-bl-md bg-gray-100 px-4 py-2 text-gray-900">
                  <p>
                    Interesante. ¿Podrías profundizar en algún ejemplo
                    específico donde tu liderazgo generó resultados tangibles?
                  </p>
                </div>
                <div className="absolute -top-3 -left-4 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 p-2">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className="flex justify-end">
                <div className="max-w-xs rounded-2xl rounded-br-md bg-indigo-600 px-4 py-2 text-white">
                  <p>
                    Por supuesto. Encabecé una iniciativa interdisciplinaria que
                    optimizó nuestro proceso de adquisiciones
                  </p>
                </div>
              </div>
              <div className="rounded-lg border border-green-200 bg-green-50 py-3 pr-2 pl-3">
                <div className="flex items-center space-x-2 text-sm text-green-700">
                  <CheckCircle className="h-8 w-8" />
                  <span>
                    Excellent professional vocabulary! Saved: 'encabecer,'
                    'interdisciplinaria,' 'optimizar,' 'adquisiciones'
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
