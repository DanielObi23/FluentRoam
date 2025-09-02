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

const formSchema = z.object({
  scenario: z
    .string()
    .min(3, {
      message: "Scenario must be at least 3 characters.",
    })
    .max(500, {
      message: "Scenario must be less than 500 characters.",
    }),
  formality: z.string(),
  response_length: z.string(),
  proficiency: z.string(),
});

export default function ChatSessionForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      scenario:
        "i, the user, am chatting with you, a female friend about your new boyfriend, after a chance encounter on the street",
      formality: "casual",
      response_length: "detailed",
      proficiency: "B1",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const params = new URLSearchParams({
      scenario: values.scenario,
      formality: values.formality,
      response_length: values.response_length,
      proficiency: values.proficiency,
    });
    router.push(`/conversation/chat?${params.toString()}`);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="shrink space-y-5 p-4 shadow-2xl shadow-teal-900 md:space-y-7"
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
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="slang" id="slang" />
                    <Label htmlFor="slang">Casual + Abbreviations</Label>
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
        <Button type="submit">START CHAT SESSION</Button>
      </form>
    </Form>
  );
}
