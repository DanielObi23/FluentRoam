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
import {
  storyType,
  themes,
  tones,
  genres,
} from "@/utils/storyData/storyOptions";
import MultipleSelector from "../ui/multi-select";
import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";
import Image from "next/image";
import logo from "../../../public/logo/fluentroamTransparent.png";

const formSchema = z.object({
  type: z.string(),
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
  const [showLoader, setShowLoader] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "short-story",
      pov: "third",
      genre: [genres[0].value],
      theme: [themes[0].value],
      tone: [tones[0].value],
      plot: "random plotline",
      proficiency: "B1",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setShowLoader(true);
      const result = await axios.post("/api/story/create", {
        plot: values.plot,
        proficiency: values.proficiency,
        type: values.type,
        pov: values.pov + "-person",
        genre: values.genre,
        theme: values.theme,
        tone: values.tone,
      });

      window.location.reload();
    } catch (err) {
      toast("Error uploading file, please try again");
    }
  }

  return (
    <Form {...form}>
      {showLoader && (
        <div className="fixed z-50 flex w-full flex-col items-center justify-center gap-4">
          <div className="flex h-28 w-28 animate-spin items-center justify-center rounded-full border-8 border-gray-300 border-t-blue-400 text-4xl text-blue-400">
            <Image src={logo} alt="fluentroam logo" />
          </div>
        </div>
      )}
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
          name="type"
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

        <Button type="submit" className="w-full" disabled={showLoader}>
          CREATE STORY
        </Button>
      </form>
    </Form>
  );
}
