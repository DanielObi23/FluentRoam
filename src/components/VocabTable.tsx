import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SearchBar from "@/components/SearchBar";
import useSearchBar from "@/hooks/use-searchBar";
import { cardList } from "@/dummy_data";

export default function VocabTable() {
  const { page, search, pageLimit } = useSearchBar();
  const filteredCardList = cardList.filter((card) => {
    if (
      card.text.toLowerCase().includes(search.toLowerCase()) ||
      card.translation.toLowerCase().includes(search.toLowerCase())
    ) {
      return card;
    }
  });

  // simulation, query database based of page === 1? query first pageLimit : from (page - 1) * pageLimit
  // if list return .length < 10, next page === 0
  // if error return === out of bound, page doesnt exist, show button to relocate to first page
  // if list returned === 0, show button to add to list
  const num1 = (page - 1) * pageLimit;
  const flashCardPage =
    page === 1
      ? filteredCardList.slice(0, pageLimit)
      : filteredCardList.slice(num1, num1 + pageLimit);

  return (
    <SearchBar
      ButtonLink="/vocabulary/study"
      ButtonName="Study"
      ButtonVariant={"secondary"}
      tableLength={flashCardPage.length}
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Front</TableHead>
            <TableHead>Back</TableHead>
            <TableHead>P.O.S</TableHead>
            <TableHead className="min-w-[15rem] text-center">Context</TableHead>
            <TableHead>Next Review</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {flashCardPage.map((card, index) => (
            <TableRow key={`card-id${index}`}>
              <TableCell>{card.text}</TableCell>
              <TableCell>{card.translation}</TableCell>
              <TableCell>{card.pos}</TableCell>
              <TableCell>{card.sentence_context}</TableCell>
              <TableCell>today</TableCell>
              <TableCell>yesterday</TableCell>
              <TableCell className="flex items-center gap-3">
                <Button>
                  <Edit /> Edit
                </Button>
                <Button variant={"destructive"}>
                  <Trash /> Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </SearchBar>
  );
}
