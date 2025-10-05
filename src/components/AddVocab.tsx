import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { VocabEntry } from "@/utils/vocabData/types";
import { Separator } from "./ui/separator";
import axios from "axios";
import { useState } from "react";

const FormSchema = z.object({
  vocabs: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});

export default function AddVocab({ vocabulary }: { vocabulary: VocabEntry[] }) {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      vocabs: [],
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setOpen(false);
    // Convert back into an array of objects
    const values = data.vocabs.map((v) => JSON.parse(v));
    try {
      const result = await axios.post("/api/vocabulary/add", { values });
      if (result.data.status === 201)
        toast.success("Vocab added successfully!", {
          position: "top-center",
          style: {
            background: "hsl(142, 76%, 36%)",
            color: "white",
            borderRadius: "8px",
            padding: "12px 16px",
          },
        });
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
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="dark:bg-primary/10 bg-primary-800/30">
          ADD <span className="max-lg:hidden">TO VOCAB LIST</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="scrollbar-hover max-h-[calc(100vh-10rem)] overflow-auto sm:max-w-[425px]">
        <DialogTitle>Vocab List</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="vocabs"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="sr-only text-base">
                      Vocab List
                    </FormLabel>
                    <FormDescription>
                      Select the vocabs you want to add to vocab list.
                    </FormDescription>
                  </div>
                  {vocabulary.map((vocab: VocabEntry, index) => {
                    // Serialize the values
                    const serialized = JSON.stringify({
                      text: vocab.text,
                      translation: vocab.translation,
                      pos: vocab.pos,
                      context: vocab.context,
                    });
                    return (
                      <FormField
                        key={`${vocab.text}-${index}`}
                        control={form.control}
                        name="vocabs"
                        render={({ field }) => (
                          <>
                            <FormItem className="flex items-center gap-2">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(serialized)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          serialized,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== serialized,
                                          ),
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="ml-2 grid text-sm font-normal">
                                <p className="capitalize">
                                  {vocab.text} | {vocab.translation} --- (
                                  {vocab.pos})
                                </p>
                                <p>{vocab.context}</p>
                              </FormLabel>
                            </FormItem>
                            <Separator className="my-2" />
                          </>
                        )}
                      />
                    );
                  })}
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
