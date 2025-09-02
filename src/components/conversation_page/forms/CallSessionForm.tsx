"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
import { Info } from "lucide-react";
import { Input } from "../../ui/input";
import { useState } from "react";

const formSchema = z.object({
  scenario: z
    .string()
    .min(3, {
      message: "Scenario must be at least 3 characters.",
    })
    .max(500, {
      message: "Scenario must be at less than 500 characters.",
    }),
  gender: z.string(),
  formality: z.string(),
  response_length: z.string(),
  proficiency: z.string(),
  duration: z.number(),
  speed: z.number(),
  delay: z.number(),
});

export default function CallSessionForm() {
  const router = useRouter();
  const [currentDuration, setCurrentDuration] = useState(15);
  const [currentSpeed, setCurrentSpeed] = useState(1);
  const [delayLength, setDelayLength] = useState(1);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      scenario:
        "i, the user, am chatting with you, a female friend about your new boyfriend, after a chance encounter on the street",
      gender: "male",
      formality: "casual",
      response_length: "detailed",
      proficiency: "B1",
      duration: 20,
      speed: 1,
      delay: 1,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        console.log("Microphone access granted:", stream);
        const params = new URLSearchParams({
          scenario: values.scenario,
          gender: values.gender,
          formality: values.formality,
          response_length: values.response_length,
          proficiency: values.proficiency,
          duration: values.duration.toString(),
          speed: values.speed.toString(),
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
              <FormLabel>
                Role-Play Scenario
                <Popover>
                  <PopoverTrigger>
                    <Info className="cursor-pointer" />
                  </PopoverTrigger>
                  <PopoverContent>
                    Just a few words is fine - our AI will create the full
                    scenario or type "Random" if you want a random scenario
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

        {/* GENDER */}
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Voice</FormLabel>
              <FormControl>
                <RadioGroup
                  defaultValue={field.value}
                  className="flex"
                  onValueChange={field.onChange}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                </RadioGroup>
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
            <FormItem>
              <FormLabel>Style</FormLabel>
              <FormControl>
                <RadioGroup
                  defaultValue={field.value}
                  className="flex"
                  onValueChange={field.onChange}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="formal" id="formal" />
                    <Label htmlFor="formal">Formal</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="casual" id="casual" />
                    <Label htmlFor="casual">Casual</Label>
                  </div>
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
            <FormItem>
              <FormLabel>
                Response Length
                <Popover>
                  <PopoverTrigger>
                    <Info className="cursor-pointer" />
                  </PopoverTrigger>
                  <PopoverContent>
                    Select "Brief responses" to speak more than you listen and
                    vice versa
                  </PopoverContent>
                </Popover>
              </FormLabel>
              <FormControl>
                <RadioGroup
                  defaultValue={field.value}
                  className="flex"
                  onValueChange={field.onChange}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="brief" id="brief" />
                    <Label htmlFor="brief">Brief responses</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="detailed" id="detailed" />
                    <Label htmlFor="detailed">Detailed responses</Label>
                  </div>
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
            <FormItem>
              <FormLabel>Proficiency</FormLabel>
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
              <FormLabel className="flex items-center justify-between">
                <span>Session Duration</span>
                <span className="bg-primary/20 text-primary rounded-full px-3 py-1 text-sm font-medium">
                  {currentDuration} minutes
                </span>
              </FormLabel>
              <FormControl>
                <div className="px-2">
                  <Input
                    type="range"
                    min={15}
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
                  <div className="text-muted-foreground mt-1 flex justify-between text-xs">
                    <span>15 min</span>
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
              <FormLabel className="flex items-center justify-between">
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
                    value={currentDuration}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      setCurrentSpeed(value);
                      field.onChange(value);
                    }}
                    className="bg-muted h-2 cursor-pointer appearance-none rounded-lg p-0"
                  />
                  <div className="text-muted-foreground mt-1 flex justify-between text-xs">
                    <span>Slower</span>
                    <span>Faster</span>
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* DELAY */}
        {/* SHOULD BE MORE DESCRIPTIVE AND LOOK AT VAPI SETTINGS AGAIN */}
        <FormField
          control={form.control}
          name="delay"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center justify-between">
                <span>Reply wait time</span>
                <span className="bg-primary/20 text-primary rounded-full px-3 py-1 text-sm font-medium">
                  {delayLength}
                </span>
              </FormLabel>
              <FormControl>
                <div className="px-2">
                  <Input
                    type="range"
                    min={1}
                    max={5}
                    step={0.5}
                    value={delayLength}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      setDelayLength(value);
                      field.onChange(value);
                    }}
                    className="bg-muted h-2 cursor-pointer appearance-none rounded-lg p-0"
                  />
                  <div className="text-muted-foreground mt-1 flex justify-between text-xs">
                    <span>Shorter</span>
                    <span>Longer</span>
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">START CALL SESSION</Button>
      </form>
    </Form>
  );
}
