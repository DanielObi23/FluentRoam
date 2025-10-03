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
import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";

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
  const [isSending, setIsSending] = useState(false);
  const formLabelClassName = "font-medium text-lg";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
      translation: "",
      context: "",
      pos: "noun (m.)",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSending(true);
    const text = values.text;
    const translation = values.translation;
    const context = values.context;
    const pos = values.pos;

    try {
      const result = await axios.post("/api/vocabulary/", {
        text,
        translation,
        context,
        pos,
      });
      if (result.data.status === 409)
        toast.error("This vocab already exists.", {
          position: "top-center",
          style: {
            background: "hsl(0, 72%, 51%)",
            color: "white",
            borderRadius: "8px",
            padding: "12px 16px",
          },
        });
      if (result.data.status === 201) {
        toast.success("Vocab added successfully!", {
          position: "top-center",
          style: {
            background: "hsl(142, 76%, 36%)",
            color: "white",
            borderRadius: "8px",
            padding: "12px 16px",
          },
          description: (
            <pre>
              <p>Refresh page to see changes</p>
            </pre>
          ),
        });
      }
    } catch (err) {
      console.error("error adding vocab", err);
      toast.error("This vocab already exists.", {
        position: "top-center",
        style: {
          background: "hsl(0, 72%, 51%)",
          color: "white",
          borderRadius: "8px",
          padding: "12px 16px",
        },
      });
    }
    setIsSending(false);
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
                      <SelectItem value="noun (m.)">Noun (M.)</SelectItem>
                      <SelectItem value="noun (f.)">Noun (F.)</SelectItem>
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

        <Button type="submit" className="w-full" disabled={isSending}>
          ADD VOCAB
        </Button>
      </form>
    </Form>
  );
}
