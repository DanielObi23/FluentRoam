import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Edit, Trash, X } from "lucide-react";
import type { VocabHistory } from "@/utils/vocabData/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function VocabActions({
  card,
  updateVocabList,
}: {
  card: VocabHistory;
  updateVocabList: ({}: VocabHistory, action: "edit" | "delete") => void;
}) {
  const [selectedPos, setSelectedPos] = useState(card.pos);
  const [isSending, setIsSending] = useState(false);

  async function editVocab(formData: FormData) {
    setIsSending(true);
    const cardData = {
      id: card.id,
      text: formData.get("text"),
      pos: selectedPos,
      translation: formData.get("translation"),
      context: formData.get("context"),
    };
    try {
      const result = await axios.patch("/api/vocabulary", cardData);
      updateVocabList(result.data.data, "edit");
      toast.success("Vocab updated successfully!", {
        position: "top-center",
        style: {
          background: "hsl(142, 76%, 36%)",
          color: "white",
          borderRadius: "8px",
          padding: "12px 16px",
        },
      });
    } catch (err) {
      console.error(err);
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

  async function deleteVocab() {
    setIsSending(true);
    try {
      const result = await axios.delete("/api/vocabulary", {
        params: { id: card.id },
      });
      updateVocabList(result.data.data, "delete");
      toast.success("Vocab deleted successfully!", {
        position: "top-center",
        style: {
          background: "hsl(142, 76%, 36%)",
          color: "white",
          borderRadius: "8px",
          padding: "12px 16px",
        },
      });
    } catch (err) {
      console.error(err);
      toast.error("Error deleting vocab.", {
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
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button>
            <Edit /> Edit
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <form action={editVocab} className="grid gap-4">
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="text">Text</Label>
                <Input id="text" name="text" defaultValue={card.text} />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="context">Context</Label>
                <Input
                  id="context"
                  name="context"
                  defaultValue={card.context}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="translation">Translation</Label>
                <Input
                  id="translation"
                  name="translation"
                  defaultValue={card.translation}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="pos">Part of speech</Label>
                <Select value={selectedPos} onValueChange={setSelectedPos}>
                  <SelectTrigger id="pos">
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
              </div>
            </div>
            <Button type="submit" disabled={isSending}>
              Save changes
            </Button>
          </form>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant={"destructive"}>
            <Trash /> Delete
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="grid items-end">
            <p>Are you sure you want to delete vocab?</p>
            <Button variant={"destructive"} onClick={deleteVocab}>
              <Trash /> Delete
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
