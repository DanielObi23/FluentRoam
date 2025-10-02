import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import HistoryTable from "@/components/HistoryTable";
import useTable from "@/hooks/use-table";
import VocabForm from "./VocabForm";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "@/components/UI_state/Loading";
import Error from "@/components/UI_state/Error";
import VocabActions from "./VocabActions";

export type VocabHistory = {
  id: string;
  text: string;
  pos: string;
  translation: string;
  context: string;
  created_at: Date;
};

export default function VocabTable() {
  const [vocabList, setVocabList] = useState<VocabHistory[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const { page, search, pageLimit } = useTable();

  function updateVocabList(data: VocabHistory, action: "edit" | "delete") {
    if (action === "edit") {
      setVocabList((prev: VocabHistory[]) =>
        prev.map((v) => (v.id === data.id ? data : v)),
      );
      return;
    }

    if (action === "delete") {
      setVocabList((prev: VocabHistory[]) =>
        prev.filter((v) => v.id !== data.id),
      );
    }
  }

  useEffect(() => {
    async function getHistory() {
      try {
        console.log({ page, search, pageLimit });
        const result = await axios.get("/api/vocabulary", {
          params: { page, search, pageLimit },
        });
        setVocabList(result.data.data);
      } catch (err) {
        setHasError(true);
        console.log(err);
        console.error("Error getting sessions");
      }

      setIsDataLoading(false);
    }

    getHistory();
  }, [page, search]);

  if (isDataLoading) {
    return <Loading />;
  }

  if (hasError) {
    return <Error />;
  }

  return (
    <HistoryTable
      buttonName={["Add", "Vocab"]}
      tableLength={vocabList.length}
      form={<VocabForm />}
      buttonClass="md:flex"
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Front</TableHead>
            <TableHead>Back</TableHead>
            <TableHead>P.O.S</TableHead>
            <TableHead className="min-w-[15rem] text-center">Context</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vocabList.map((card, index) => (
            <TableRow key={card.id}>
              <TableCell>{card.text}</TableCell>
              <TableCell>{card.translation}</TableCell>
              <TableCell>{card.pos}</TableCell>
              <TableCell className="text-center">{card.context}</TableCell>
              <TableCell>
                {new Intl.DateTimeFormat("en-GB", {
                  dateStyle: "short",
                }).format(new Date(card.created_at))}
              </TableCell>
              <TableCell className="flex items-center justify-center gap-3">
                <VocabActions card={card} updateVocabList={updateVocabList} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </HistoryTable>
  );
}
