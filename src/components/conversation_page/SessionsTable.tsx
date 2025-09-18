//TODO: use react query to query first 50 pages, then cache it

import { userSessions, UserSession } from "@/userSessions";
import ConversationHistoryTable from "./ConversationHistoryTable";
import useTable from "@/hooks/use-table";
import Table from "../Table";
import ConversationForms from "./forms/ConversationForms";

// COMPONENT IS RERENDERING TWICE, FIX THAT
export default function SessionsTable() {
  const { page, search, pageLimit } = useTable();

  const filteredSessions = userSessions.filter((session) =>
    session.title.toLowerCase().includes(search.toLowerCase()),
  );

  // simulation, query database based of page === 1? query first pageLimit : from (page - 1) * pageLimit
  // if list return .length < 10, next page === 0
  // if error return === out of bound, page doesnt exist, show button to relocate to first page
  // if list returned === 0, show button to add to list

  // if error, show error lottie-animation
  // if loading, show loading lottie-animation
  // track with state, or react query

  const num1 = (page - 1) * pageLimit;
  const sessionList =
    page === 1
      ? (filteredSessions as UserSession[]).slice(0, pageLimit)
      : (filteredSessions as UserSession[]).slice(num1, num1 + pageLimit);

  return (
    <>
      <Table
        tableLength={sessionList.length}
        buttonName={["Create", "Convo"]}
        form={<ConversationForms />}
      >
        <ConversationHistoryTable sessionList={sessionList} />
      </Table>
    </>
  );
}
