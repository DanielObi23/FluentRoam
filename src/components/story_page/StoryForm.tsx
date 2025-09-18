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
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { Info } from "lucide-react";
import { storyType, themes, tones, genres } from "@/utils/storyOptions";
import MultipleSelector from "../ui/multi-select";

const formSchema = z.object({
  storyType: z.string(),
  pov: z.string(),
  genre: z.array(z.string()).nonempty(),
  theme: z.array(z.string()).nonempty(),
  tone: z.array(z.string()).nonempty(),
  plot: z
    .string()
    .min(3, {
      message: "Scenario must be at least 3 characters.",
    })
    .max(500, {
      message: "Scenario must be at less than 500 characters.",
    }),
  proficiency: z.string(),
});

export default function Page() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      storyType: "short-story",
      pov: "third",
      genre: [genres[0].value],
      theme: [themes[0].value],
      tone: [tones[0].value],
      plot: "random plotline",
      proficiency: "B1",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values.genre);
  }

  //TODO: GENERATE LIST OF VALUES FOR GENRE, THEME AND TONE, use the search one select field
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-background max-w-xl space-y-3 p-4 shadow-2xl shadow-teal-900 md:gap-7"
      >
        {/* PLOT-LINE */}
        <FormField
          control={form.control}
          name="plot"
          render={({ field }) => (
            <FormItem className="mt-6 sm:mt-0">
              <FormLabel className="text-xl">
                Plot-Line
                <Popover>
                  <PopoverTrigger>
                    <Info className="cursor-pointer" />
                  </PopoverTrigger>
                  <PopoverContent>
                    Please describe what plotline you want
                  </PopoverContent>
                </Popover>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="e.g., a sample of a plotline..."
                  {...field}
                />
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
              <FormLabel className="text-xl">Proficiency</FormLabel>
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

        {/* STORY TYPE */}
        <FormField
          control={form.control}
          name="storyType"
          render={({ field }) => (
            <FormItem className="flex gap-2">
              <FormLabel className="text-xl">Story Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select story type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {storyType.map((type) => (
                    <SelectItem
                      key={`type-${type}`}
                      value={type}
                      className="capitalize"
                    >
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* POV */}
        <FormField
          control={form.control}
          name="pov"
          render={({ field }) => (
            <FormItem className="flex gap-2">
              <FormLabel className="text-xl">Point of view</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select story pov" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {["first", "second", "third"].map((view) => (
                    <SelectItem key={`pov-${view}`} value={view}>
                      <p>
                        <span className="capitalize">{view}</span> person
                      </p>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* GENRE */}
        <FormField
          control={form.control}
          name="genre"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl">Genre</FormLabel>
              <MultipleSelector
                value={field.value.map(
                  (v) => genres.find((g) => g.value === v)!,
                )} // sync with react-hook-form
                onChange={(opts) => field.onChange(opts.map((o) => o.value))}
                defaultOptions={genres}
                placeholder="Select genre(s)"
                emptyIndicator={
                  <p className="text-center text-sm">No results found</p>
                }
                className="w-full"
              />
              <FormMessage />
            </FormItem>
          )}
        />

        {/* THEME */}
        <FormField
          control={form.control}
          name="theme"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl">Theme</FormLabel>
              <MultipleSelector
                value={field.value.map(
                  (v) => themes.find((t) => t.value === v)!,
                )} // sync with react-hook-form
                onChange={(opts) => field.onChange(opts.map((o) => o.value))}
                defaultOptions={themes}
                placeholder="Select theme(s)"
                emptyIndicator={
                  <p className="text-center text-sm">No results found</p>
                }
                className="w-full"
              />
              <FormMessage />
            </FormItem>
          )}
        />

        {/* TONE */}
        <FormField
          control={form.control}
          name="tone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl">Tone</FormLabel>
              <MultipleSelector
                value={field.value.map(
                  (v) => tones.find((t) => t.value === v)!,
                )} // sync with react-hook-form
                onChange={(opts) => field.onChange(opts.map((o) => o.value))}
                defaultOptions={tones}
                placeholder="Select tone(s)"
                emptyIndicator={
                  <p className="text-center text-sm">No results found</p>
                }
                className="w-full"
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          CREATE STORY
        </Button>
      </form>
    </Form>
  );
}
