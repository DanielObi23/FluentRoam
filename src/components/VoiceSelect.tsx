import usePlayAudio from "@/hooks/use-playAudio";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function VoiceSelect() {
  const { voiceList, playAudio, setSelectedVoice, selectedVoiceURI } =
    usePlayAudio();
  if (voiceList.length < 1) {
    return (
      <p className="text-muted-foreground text-sm">
        No voices available for this language/browser.
      </p>
    );
  }
  return (
    <div className="flex gap-3">
      <Button
        className="max-md:w-[calc(100vw*0.3)]"
        onClick={() => playAudio("hola, qué tal")}
      >
        <p>
          Test <span className="max-[350px]:hidden">Voice</span>
        </p>
      </Button>
      <Select
        onValueChange={(voiceURI) => {
          setSelectedVoice(voiceURI);
        }}
        defaultValue={selectedVoiceURI}
      >
        <SelectTrigger className="w-[calc(100vw*0.55)] md:w-[10rem] lg:w-[15rem]">
          <SelectValue placeholder="Voices" />
        </SelectTrigger>
        <SelectContent>
          {voiceList.map((voice) => (
            <SelectItem
              key={voice.voiceURI}
              value={voice.voiceURI as string}
            >{`${voice.name} - ${voice.lang}`}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
