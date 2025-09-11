"use client";

import Navigation from "@/components/app_layout/Navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";

export default function Page() {
  const [showAns, setShowAns] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [currentCardNum, setCurrentCardNum] = useState(0);

  const cardList = [
    {
      text: "puerto",
      pos: "noun",
      translation: "port",
      sentence_context:
        "Mateo llegó al pequeño puerto al amanecer, con la bruma cubriendo los barcos anclados.",
    },
    {
      text: "bruma",
      pos: "noun",
      translation: "fog",
      sentence_context:
        "Mateo llegó al pequeño puerto al amanecer, con la bruma cubriendo los barcos anclados.",
    },
    {
      text: "colina",
      pos: "noun",
      translation: "hill",
      sentence_context:
        "El faro se alzaba en la colina, imponente y silencioso, con sus ventanas rotas reflejando la luz tenue.",
    },
    {
      text: "grietas",
      pos: "noun",
      translation: "cracks",
      sentence_context:
        "Decidió subir la escalera que crujía bajo su peso, sintiendo cómo el viento entraba por las grietas.",
    },
    {
      text: "sobre",
      pos: "noun",
      translation: "envelope",
      sentence_context:
        "En el suelo encontró un sobre amarillo con su nombre escrito a mano.",
    },
    {
      text: "diario",
      pos: "noun",
      translation: "diary",
      sentence_context:
        "Un diario abierto reposaba sobre la mesa, cubierto de polvo y arena.",
    },
    {
      text: "retratos",
      pos: "noun",
      translation: "portraits",
      sentence_context:
        "Una ventana rota dejaba pasar un rayo de sol que iluminaba los retratos antiguos en la pared.",
    },
    {
      text: "mareas",
      pos: "noun",
      translation: "tides",
      sentence_context:
        "Encontró mapas del litoral, anotaciones de mareas y fechas que coincidían con viejas cartas de la familia.",
    },
    {
      text: "acantilados",
      pos: "noun",
      translation: "cliffs",
      sentence_context:
        "Las olas rompían suavemente contra los acantilados, como aplaudiendo su decisión.",
    },
    {
      text: "restaurar",
      pos: "verb",
      translation: "to restore",
      sentence_context:
        "Decidió que debía restaurar la torre y preservar las historias, para que no se perdieran otra vez.",
    },
    {
      text: "habitacion",
      pos: "noun",
      translation: "room",
      sentence_context:
        "Antes de dormir en la pequeña habitación de la torre, escribió su propio diario, continuando la cadena de historias.",
    },
    {
      text: "cadena",
      pos: "noun",
      translation: "chain",
      sentence_context:
        "Antes de dormir en la pequeña habitación de la torre, escribió su propio diario, continuando la cadena de historias.",
    },
  ];

  return (
    <div className="flex w-full flex-col">
      <Navigation page="Vocab-Study" />
      <div className="flex h-screen w-full flex-col items-center justify-center gap-3">
        <Progress
          className="w-2/3"
          value={((currentCardNum + 1) / cardList.length) * 100}
        />
        <div
          className={cn(
            "text-bold relative flex h-2/7 w-2/5 flex-col items-center justify-center gap-2 text-2xl",
            showAns ? "bg-blue-800" : "bg-red-800",
          )}
        >
          <Button
            className="absolute top-3 right-3"
            variant={"secondary"}
            onClick={() => {
              setCurrentCardNum((prev) => prev + 1);
              setShowAns(false);
              setShowHint(false);
            }}
            disabled={currentCardNum === cardList.length - 1}
          >
            Next
          </Button>
          <p className="text-2xl font-bold">
            {showAns
              ? cardList[currentCardNum].translation
              : cardList[currentCardNum].text}
          </p>

          <p
            className={cn(
              !showHint && "hidden",
              showAns && "block",
              "w-2/3 border-2 bg-gray-600/70 p-4 text-center",
            )}
          >
            {(showHint || showAns) && cardList[currentCardNum].sentence_context}
          </p>

          <Button
            onClick={() => setShowHint(!showHint)}
            className={cn(showAns && "hidden")}
          >
            {showHint ? "Hide" : "Show"} Hint
          </Button>
        </div>

        <Button variant={"outline"} onClick={() => setShowAns(!showAns)}>
          {showAns ? "Hide" : "Show"} Answer
        </Button>
        <div className={cn("flex w-1/3 justify-around", !showAns && "hidden")}>
          <Button>Again</Button> {/* Re-add to deck at the end*/}
          <Button>Hard</Button> {/* set to hard */}
          <Button>Good</Button> {/* set to good */}
          <Button>Easy</Button> {/* set to easy */}
          {/* Bury from the whole deck, absolute buttom */}
          <Button variant={"destructive"}>Bury</Button>
        </div>
      </div>
    </div>
  );
}
