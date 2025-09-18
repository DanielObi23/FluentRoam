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
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Info } from "lucide-react";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
  text: z
    .string()
    .max(40, { message: "Maximum 40 characters" })
    .min(1, { message: "Minimum 1 character" }),
  translation: z
    .string()
    .max(40, { message: "Maximum 40 characters" })
    .min(1, { message: "Minimum 1 character" }),
  context: z.string(),
  pos: z.string(),
});

export default function VocabForm() {
  const formLabelClassName = "font-medium text-lg";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
      translation: "",
      context: "",
      pos: "noun",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const text = values.text;
    const translation = values.translation;
    const context = values.context;
    const pos = values.pos;
    // ADD TO DATABASE
    // IF Successful empty all data in form
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="shrink space-y-5 p-4 shadow-2xl shadow-teal-900 md:space-y-7"
      >
        {/* TEXT */}
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem className="mt-6 sm:mt-0">
              <FormLabel className={formLabelClassName}>Text</FormLabel>
              <FormControl>
                <Textarea placeholder="e.g. ¿Cuantos años tienes?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* TRANSLATION */}
        <FormField
          control={form.control}
          name="translation"
          render={({ field }) => (
            <FormItem className="mt-6 sm:mt-0">
              <FormLabel className={formLabelClassName}>Translation</FormLabel>
              <FormControl>
                <Textarea
                  className="textarea"
                  placeholder="e.g. How old are you?"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* CONTEXT */}
        <FormField
          control={form.control}
          name="context"
          render={({ field }) => (
            <FormItem className="mt-6 sm:mt-0">
              <FormLabel className={formLabelClassName}>
                Context
                <Popover>
                  <PopoverTrigger>
                    <Info className="cursor-pointer" />
                  </PopoverTrigger>
                  <PopoverContent>
                    An example sentence with the text used (HINT)
                  </PopoverContent>
                </Popover>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="e.g. Ayer te pidé cuantos años tienes y no me respondiste"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* POS */}
        <FormField
          control={form.control}
          name="pos"
          render={({ field }) => (
            <FormItem className="flex gap-2">
              <FormLabel className={formLabelClassName}>POS:</FormLabel>
              <FormControl>
                <Select
                  name="pos"
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select the part of speech" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Part of Speech</SelectLabel>
                      <SelectItem value="noun">Noun</SelectItem>
                      <SelectItem value="pronoun">Pronoun</SelectItem>
                      <SelectItem value="verb">Verb</SelectItem>
                      <SelectItem value="adjective">Adjective</SelectItem>
                      <SelectItem value="adverb">Adverb</SelectItem>
                      <SelectItem value="prepositions">Prepositions</SelectItem>
                      <SelectItem value="conjunctions">Conjunctions</SelectItem>
                      <SelectItem value="phrase">Phrase</SelectItem>
                      <SelectItem value="idiom">Idiom</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          ADD VOCAB
        </Button>
      </form>
    </Form>
  );
}
