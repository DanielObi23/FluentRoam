import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Translator } from "@/components/Translator";
import { RefObject } from "react";

export default function ChatFeatures({
  voiceList,
  playAudio,
  setSelectedVoice,
  endConversation,
  selectedVoiceURI,
}: {
  voiceList: SpeechSynthesisVoice[];
  playAudio: (text: string) => void;
  setSelectedVoice: (text: string) => void;
  endConversation: () => void;
  selectedVoiceURI: string;
}) {
  return (
    <Dialog>
      <DialogTrigger
        asChild
        className="absolute -top-1 -right-0.5 z-50 self-end md:hidden"
      >
        <Button variant="secondary">Features</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Features</DialogTitle>
        </DialogHeader>
        <Tabs
          defaultValue={voiceList.length > 0 ? "voice" : "translator"}
          className="h-[calc(100vh-10rem)]"
        >
          <TabsList className="w-full">
            {voiceList.length > 0 && (
              <TabsTrigger value="voice">Voice</TabsTrigger>
            )}
            <TabsTrigger value="translator">Translator</TabsTrigger>
            <TabsTrigger value="end">End Convo</TabsTrigger>
          </TabsList>

          <TabsContent value="voice" className="w-full place-items-center">
            <div className="flex max-w-sm flex-col justify-center gap-2 max-[465px]:max-w-xs max-[400px]:max-w-3xs">
              <Button
                className="mt-3"
                onClick={() => playAudio("hola, qué tal")}
              >
                Test Voice
              </Button>

              <Select
                onValueChange={(voiceURI) => {
                  setSelectedVoice(voiceURI);
                }}
                defaultValue={selectedVoiceURI}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Voices" />
                </SelectTrigger>
                <SelectContent
                  defaultValue={selectedVoiceURI}
                  className="w-2/3 overflow-auto"
                >
                  {voiceList.map((voice) => (
                    <SelectItem
                      key={voice.voiceURI}
                      value={voice.voiceURI as string}
                    >{`${voice.name} - ${voice.lang}`}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </TabsContent>

          <TabsContent value="translator" className="overflow-auto">
            <Translator playLearningAudio={playAudio} />
          </TabsContent>

          <TabsContent value="end" className="flex items-center justify-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="destructive" size={"lg"}>
                  End Conversation
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>End Conversation</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to end conversation?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex items-center sm:justify-between">
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Close
                    </Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button
                      variant={"destructive"}
                      onClick={endConversation}
                      className="self-end"
                    >
                      End
                      <span className="max-sm:hidden">Conversation</span>
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </TabsContent>
        </Tabs>
        <DialogFooter className="flex items-center sm:justify-between">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
