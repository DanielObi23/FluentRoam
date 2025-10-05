"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "../../ui/textarea";
import { useRouter } from "next/navigation";
import { Info, PlayCircle } from "lucide-react";
import { Input } from "../../ui/input";
import { useState, useRef } from "react";
import { spanishVoices } from "@/utils/conversationData/spanishVapi";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { twMerge } from "tailwind-merge";

const formSchema = z.object({
  scenario: z
    .string()
    .min(3, {
      message: "Scenario must be at least 3 characters.",
    })
    .max(500, {
      message: "Scenario must be at less than 500 characters.",
    }),
  formality: z.string(),
  response_length: z.string(),
  proficiency: z.string(),
  duration: z.number(),
  speed: z.number(),
  voice: z.string(),
});

export default function CallSessionForm() {
  const router = useRouter();
  const [currentDuration, setCurrentDuration] = useState(15);
  const [currentSpeed, setCurrentSpeed] = useState(1);
  const currentAudio = useRef<HTMLAudioElement | null>(null);
  const radioClassName =
    "bg-secondary/70 ring-primary peer-data-[state=checked]:bg-primary cursor-pointer rounded-lg border-2 border-black px-3 py-2 capitalize ring-offset-2 peer-data-[state=checked]:ring-2";
  const formLabelClassName = "font-medium md:text-lg";
  const playSampleAudio = (id: string) => {
    // stop previous
    if (currentAudio.current) {
      currentAudio.current.pause();
      currentAudio.current.currentTime = 0;
    }
    // start new
    const audio = document.getElementById(id) as HTMLAudioElement | null;
    if (audio) {
      audio.play();
      currentAudio.current = audio; // remember for next time
    }
  };

  const voice = spanishVoices.male[0];
  const voiceId = voice.voiceId;
  const voiceName = voice.name;
  const voiceGender = "male";
  const voiceAccent = voice.accent;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      scenario: "",
      formality: "casual",
      response_length: "detailed",
      proficiency: "B1",
      duration: 10,
      speed: 1,
      voice: JSON.stringify({
        voiceId: voiceId,
        name: voiceName,
        gender: voiceGender,
        accent: voiceAccent,
      }),
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        console.log("Microphone access granted:", stream);
        const voice = JSON.parse(values.voice);
        const params = new URLSearchParams({
          scenario: values.scenario,
          formality: values.formality,
          response_length: values.response_length,
          proficiency: values.proficiency,
          duration: values.duration.toString(),
          speed: values.speed.toString(),
          voiceId: voice.voiceId,
          name: voice.name,
          gender: voice.gender,
          accent: voice.accent,
        });
        router.push(`/conversation/call?${params.toString()}`);
      })
      .catch((error) => {
        console.error("Microphone access denied:", error);
      });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="shrink space-y-5 p-3 shadow-2xl shadow-teal-900"
      >
        {/* SCENARIO */}
        <FormField
          control={form.control}
          name="scenario"
          render={({ field }) => (
            <FormItem className="mt-6 sm:mt-0">
              <FormLabel className={formLabelClassName}>
                Role-Play Scenario
                <Popover>
                  <PopoverTrigger>
                    <Info className="size-5 cursor-pointer" />
                  </PopoverTrigger>
                  <PopoverContent>
                    Just a few words is fine - our AI will create the full
                    scenario or type &quot;Random&quot; if you want a random
                    scenario
                  </PopoverContent>
                </Popover>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="e.g., Ordering food at a restaurant, meeting a new neighbor..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* FORMALITY */}
        <FormField
          control={form.control}
          name="formality"
          render={({ field }) => (
            <FormItem className="flex gap-2">
              <FormLabel className={formLabelClassName}>Formality</FormLabel>
              <FormControl>
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="flex gap-2"
                >
                  {["formal", "casual"].map((val) => (
                    <div key={val}>
                      <RadioGroupItem
                        value={val}
                        id={val}
                        className="peer sr-only"
                      />
                      <Label htmlFor={val} className={radioClassName}>
                        {val}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* RESPONSE LENGTH */}
        <FormField
          control={form.control}
          name="response_length"
          render={({ field }) => (
            <FormItem className="flex gap-2">
              <FormLabel className={formLabelClassName}>
                Response Length
                <Popover>
                  <PopoverTrigger>
                    <Info className="size-5 cursor-pointer" />
                  </PopoverTrigger>
                  <PopoverContent>
                    Select &quot;Brief responses&quot; to speak more than you
                    listen and vice versa
                  </PopoverContent>
                </Popover>
              </FormLabel>
              <FormControl>
                <RadioGroup
                  defaultValue={field.value}
                  className="flex"
                  onValueChange={field.onChange}
                >
                  {["brief", "detailed"].map((val) => (
                    <div key={val}>
                      <RadioGroupItem
                        value={val}
                        id={val}
                        className="peer sr-only"
                      />
                      <Label htmlFor={val} className={radioClassName}>
                        {val}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* PROFICIENCY */}
        <FormField
          control={form.control}
          name="proficiency"
          render={({ field }) => (
            <FormItem className="flex gap-2">
              <FormLabel className={formLabelClassName}>Proficiency</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="A2">Beginner (A2)</SelectItem>
                  <SelectItem value="B1">Intermediate (B1)</SelectItem>
                  <SelectItem value="B2">Advanced (B2)</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* DURATION */}
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel
                className={twMerge(
                  formLabelClassName,
                  "flex items-center justify-between",
                )}
              >
                <span>Session Duration</span>
                <span className="bg-primary/20 text-primary rounded-full px-3 py-1 text-sm font-medium">
                  {currentDuration} minutes
                </span>
              </FormLabel>
              <FormControl>
                <div className="px-2">
                  <Input
                    type="range"
                    min={5}
                    max={60}
                    step={5}
                    value={currentDuration}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      setCurrentDuration(value);
                      field.onChange(value);
                    }}
                    className="bg-muted h-2 cursor-pointer appearance-none rounded-lg p-0"
                  />
                  <div className="text-muted-foreground mt-1 flex justify-between text-xs select-none">
                    <span>5 min</span>
                    <span>60 min</span>
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* SPEED */}
        <FormField
          control={form.control}
          name="speed"
          render={({ field }) => (
            <FormItem>
              <FormLabel
                className={twMerge(
                  formLabelClassName,
                  "flex items-center justify-between",
                )}
              >
                <span>Speaking Speed</span>
                <span className="bg-primary/20 text-primary rounded-full px-3 py-1 text-sm font-medium">
                  {currentSpeed}
                </span>
              </FormLabel>
              <FormControl>
                <div className="px-2">
                  <Input
                    type="range"
                    min={0.7}
                    max={1.2}
                    step={0.1}
                    value={currentSpeed}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value);
                      setCurrentSpeed(value);
                      field.onChange(value);
                    }}
                    className="bg-muted h-2 cursor-pointer appearance-none rounded-lg p-0"
                  />
                  <div className="text-muted-foreground mt-1 flex justify-between text-xs select-none">
                    <span>Slower</span>
                    <span>Faster</span>
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* VOICES: When making only for pro users, add disabled to tags, if no subscription, remove the value from the url */}
        <FormField
          control={form.control}
          name="voice"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Voices</FormLabel>
              <FormControl>
                <RadioGroup
                  defaultValue={JSON.stringify({
                    voiceId,
                    name: voiceName,
                    gender: voiceGender,
                    accent: voiceAccent,
                  })}
                  onValueChange={field.onChange}
                >
                  {(["male", "female"] as const).map((gender) => (
                    <fieldset key={gender} className="min-w-0 space-y-2">
                      <legend className="flex w-full justify-between font-medium select-none">
                        <span className="capitalize">{gender} voices:</span>
                        {gender === "male" && (
                          <Popover>
                            <PopoverTrigger>
                              <Info className="size-6 cursor-pointer" />
                            </PopoverTrigger>
                            <PopoverContent>
                              Select the voice you&apos;d like to be your
                              speaking partner
                            </PopoverContent>
                          </Popover>
                        )}
                      </legend>
                      <Carousel className="cursor-grab">
                        <CarouselContent>
                          {spanishVoices[gender].map((voice, index) => (
                            <CarouselItem
                              key={`${voice.voiceId}-${index}`}
                              className="basis-1/2 sm:basis-1/3"
                            >
                              <label
                                key={`${voice.voiceId}-${index}`}
                                className="border-input has-data-[state=checked]:border-primary/80 has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative flex cursor-grab flex-col items-center gap-1.5 rounded-md border px-2 py-3 text-center shadow-xs transition-[color,box-shadow] outline-none has-focus-visible:ring-[3px] has-data-disabled:cursor-not-allowed has-data-disabled:opacity-50"
                              >
                                <RadioGroupItem
                                  id={voice.voiceId}
                                  value={JSON.stringify({
                                    voiceId: voice.voiceId,
                                    name: voice.name,
                                    gender,
                                    accent: voice.accent,
                                  })}
                                  className="sr-only after:absolute after:inset-0"
                                  aria-label={`${voice.accent} accent`}
                                />
                                <p className="select-none">{voice.name}</p>

                                {/* AUDIO SAMPLE */}
                                <audio
                                  preload="none"
                                  id={`${voice.voiceId}-${voice.name}`}
                                >
                                  <source src={voice.sampleUrl} />
                                </audio>
                                <button
                                  type="button"
                                  aria-label={`Play “${voice.name}” audio, with ${voice.accent} accent`}
                                  onClick={() =>
                                    playSampleAudio(
                                      `${voice.voiceId}-${voice.name}`,
                                    )
                                  }
                                  className="hover:bg-muted/50 focus-visible:ring-ring rounded-full p-1 focus:outline-none focus-visible:ring-2"
                                >
                                  {/**If audio is playing, show pause, and on click, pause should be button for play */}
                                  {<PlayCircle className="cursor-pointer" />}
                                </button>

                                <p className="select-none">{voice.accent}</p>
                              </label>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious
                          type="button"
                          className="max-xl:hidden"
                        />
                        <CarouselNext type="button" className="max-xl:hidden" />
                      </Carousel>
                    </fieldset>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          START CALL SESSION
        </Button>
      </form>
    </Form>
  );
}
