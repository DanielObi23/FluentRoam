"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUpDown, Copy, Volume2, Languages, X } from "lucide-react";
import { toast } from "sonner";
import { languages } from "@/utils/language";

export function Translator({
  playLearningAudio,
}: {
  playLearningAudio: (text: string) => void;
}) {
  const [sourceLanguage, setSourceLanguage] = useState(
    languages.userLanguage.code,
  );
  const [targetLanguage, setTargetLanguage] = useState(
    languages.targetLanguage.code,
  );
  const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslatedText] = useState("");

  const handleSwapLanguages = () => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast("Copied to clipboard", {
      description: "Text has been copied to your clipboard.",
    });
  };

  const handleSpeak = (text: string, language: string) => {
    if (language === languages.targetLanguage.code) {
      playLearningAudio(text);
      return;
    }

    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language;
      speechSynthesis.speak(utterance);
    }
  };

  async function translate() {
    const text = sourceText;
    try {
      const response = await axios.post("/api/translate", {
        text,
        from: sourceLanguage,
        to: targetLanguage,
      });
      setTranslatedText(response.data.message);
    } catch (err) {
      toast("Error translating text", {
        position: "top-right",
      });
    }
  }

  return (
    <div className="bg-sidebar border-sidebar-border dark:bg-secondary/10 bg-secondary-800/30 flex w-full flex-col border-r">
      {/* Header */}
      <div className="border-sidebar-border w-full border-b p-6">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <div className="flex items-center gap-2 rounded-lg p-2">
            <Languages className="text-sidebar-accent-foreground h-5 w-5" />
            <h1 className="text-sidebar-foreground text-lg font-semibold">
              Translator
            </h1>
          </div>
          <div className="dark:bg-secondary/40 bg-secondary-800/70 flex w-full items-center justify-evenly p-3.5">
            <div className="">
              <p className="text-secondary-50 font-semibold">From</p>
              <Button variant={"outline"} asChild>
                <div>
                  {sourceLanguage === languages.userLanguage.code
                    ? languages.userLanguage.name
                    : languages.targetLanguage.name}
                </div>
              </Button>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleSwapLanguages}
              className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground mt-6"
            >
              <ArrowUpDown className="h-4 w-4 rotate-90" />
            </Button>

            <div className="">
              <p className="text-secondary-50 font-semibold">To</p>
              <Button variant={"outline"} asChild>
                <div>
                  {targetLanguage === languages.userLanguage.code
                    ? languages.targetLanguage.name
                    : languages.userLanguage.name}
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Translation Areas */}
      <div className="flex flex-1 flex-col gap-3 space-y-4 overflow-y-auto p-6">
        {/* Source Text */}
        <div className="dark:bg-secondary/40 bg-secondary-800/70 flex w-full flex-col justify-around gap-2 border-2 p-3">
          <div className="flex items-center justify-between gap-1">
            <div className="flex gap-2">
              <p className="text-secondary-50 font-semibold">
                {sourceLanguage === languages.userLanguage.code
                  ? languages.userLanguage.name
                  : languages.targetLanguage.name}
              </p>

              {sourceText && (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    className="ml-1.5 h-6 w-6"
                    onClick={() => handleCopy(sourceText)}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => handleSpeak(sourceText, sourceLanguage)}
                  >
                    <Volume2 className="h-3 w-3" />
                  </Button>
                </>
              )}
            </div>
            {sourceText && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => setSourceText("")}
              >
                <X />
              </Button>
            )}
          </div>
          <Textarea
            placeholder="Enter text to translate..."
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value)}
            className="bg-background border-border hide-scrollbar h-2/3 resize-none"
          />
        </div>

        {/* Translated Text */}
        <div className="dark:bg-secondary/40 bg-secondary-800/70 flex w-full flex-col justify-around gap-2 border-2 p-3">
          <div className="flex gap-1">
            <p className="text-secondary-50 font-semibold">
              {targetLanguage === languages.userLanguage.code
                ? languages.targetLanguage.name
                : languages.userLanguage.name}
            </p>
            {translatedText && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  className="ml-1.5 h-6 w-6"
                  onClick={() => handleCopy(sourceText)}
                >
                  <Copy className="h-3 w-3" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => handleSpeak(translatedText, targetLanguage)}
                >
                  <Volume2 className="h-3 w-3" />
                </Button>
              </>
            )}
          </div>
          <p className="text-secondary-50 font-semibold">
            {translatedText || (
              <span className="text-muted dark:text-gray-300">
                Translation will appear here...
              </span>
            )}
          </p>
        </div>

        <div className="flex w-full flex-wrap items-center justify-between">
          <Button>Add to vocab</Button>
          <Button onClick={translate}>Translate</Button>
        </div>
      </div>
    </div>
  );
}
