import { useEffect, useCallback, useState } from "react";
import { usePlayAudioStore } from "@/store";
import { languages } from "@/utils/language";

export default function usePlayAudio() {
  const languageTargetCode = languages.targetLanguage.code;
  const [voiceList, setVoiceList] = useState<SpeechSynthesisVoice[]>([]);
  const selectedVoiceURI = usePlayAudioStore((s) => s.selectedVoiceURI);
  const setVoiceURI = usePlayAudioStore((s) => s.setVoiceURI);

  function setSelectedVoice(selectedVoice: string) {
    setVoiceURI(selectedVoice);
  }

  const playAudio = useCallback(
    (text: string) => {
      if (!("speechSynthesis" in window)) return;
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);

      const voice =
        voiceList.find((voice) => voice.voiceURI === selectedVoiceURI) || null;
      if (voice) {
        utterance.voice = voice;
        utterance.lang = voice.lang || languageTargetCode;
      } else {
        utterance.lang = languageTargetCode;
      }
      window.speechSynthesis.speak(utterance);
    },
    [selectedVoiceURI, voiceList],
  );

  // useEffect(() => {
  //   const handleVoicesChanged = () => {
  //     const voices = window.speechSynthesis.getVoices();
  //     const filteredVoices = voices.filter((v) =>
  //       v.lang.startsWith(`${languageTargetCode}-`),
  //     );
  //     setVoiceList(filteredVoices);
  //     if (selectedVoiceURI === "")
  //       setVoiceURI(filteredVoices[0]?.voiceURI || "");
  //   };

  //   // Run once
  //   handleVoicesChanged();

  //   // Run again when voices finish loading
  //   window.speechSynthesis.onvoiceschanged = handleVoicesChanged;
  //   return () => {
  //     window.speechSynthesis.onvoiceschanged = null;
  //   };
  // }, [selectedVoiceURI]);

  useEffect(() => {
    function loadVoices() {
      const allVoices = window.speechSynthesis.getVoices();

      if (allVoices.length > 0) {
        const filtered = allVoices.filter((v) =>
          v.lang.startsWith(`${languageTargetCode}`),
        );

        setVoiceList(filtered);

        if (!selectedVoiceURI && filtered.length > 0) {
          setVoiceURI(filtered[0].voiceURI);
        }
      } else {
        // Try again in a moment if voices not yet ready
        setTimeout(loadVoices, 200);
      }
    }

    loadVoices();
    window.speechSynthesis.addEventListener("voiceschanged", loadVoices);

    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", loadVoices);
    };
  }, [selectedVoiceURI]);

  return { playAudio, voiceList, setSelectedVoice, selectedVoiceURI };
}
