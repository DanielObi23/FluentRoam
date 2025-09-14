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
import Main from "@/components/tags/Main";

const formSchema = z.object({
  storyType: z.string(),
  pov: z.string(),
  genre: z.string(),
  theme: z.string(),
  tone: z.string(),
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
  const storyType = [
    ["short-story", "Short Story"],
    ["lyric-poem", "Lyric Poem"],
    ["ballad", "Ballad"],
    ["novella", "Novella"],
    ["stage-play", "Stage Play"],
  ];
  const pov = [
    ["first", "First person"],
    ["second", "Second person"],
    ["third", "Third person"],
  ];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      storyType: "short-story",
      pov: "third",
      genre: "fantasy",
      theme: "european",
      tone: "suspense",
      plot: "random plotline",
      proficiency: "B1",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        console.log("Microphone access granted:", stream);
        // const params = new URLSearchParams({
        //     scenario: values.scenario,
        //     gender: values.gender,
        //     formality: values.formality,
        //     response_length: values.response_length
        // });
        //router.push(`/conversation/call?${params.toString()}`);
        router.push(`/story`);
      })
      .catch((error) => {
        console.error("Microphone access denied:", error);
      });
  }

  return (
    <Main
      page="Story"
      className="from-secondary-500 to-accent-900 place-items-center bg-linear-to-br"
    >
      {/* GENERATE LIST OF VALUES FOR GENRE, THEME AND TONE */}
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select story type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {storyType.map((type) => (
                      <SelectItem key={`type-${type[0]}`} value={type[0]}>
                        {type[1]}
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select story pov" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {pov.map((view) => (
                      <SelectItem key={`pov-${view[0]}`} value={view[0]}>
                        {view[1]}
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
              <FormItem className="flex gap-2">
                <FormLabel className="text-xl">Genre</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select genres" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="fantasy">Fantasy</SelectItem>
                    <SelectItem value="B1">Intermediate (B1)</SelectItem>
                    <SelectItem value="B2">Advanced (B2)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* THEME */}
          <FormField
            control={form.control}
            name="theme"
            render={({ field }) => (
              <FormItem className="flex gap-2">
                <FormLabel className="text-xl">Theme</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select themes" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="european">European</SelectItem>
                    <SelectItem value="B1">Intermediate (B1)</SelectItem>
                    <SelectItem value="B2">Advanced (B2)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* TONE */}
          <FormField
            control={form.control}
            name="tone"
            render={({ field }) => (
              <FormItem className="flex gap-2">
                <FormLabel className="text-xl">Tone</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select tones" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="suspense">Suspense</SelectItem>
                    <SelectItem value="B1">Intermediate (B1)</SelectItem>
                    <SelectItem value="B2">Advanced (B2)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            CREATE STORY
          </Button>
        </form>
      </Form>
    </Main>
  );
}
