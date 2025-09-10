//TODO: use react query to query first 50 pages, then cache it
// IMPROVE PAGINATION UI, GET FROM SHADCNUI

import { userSessions, UserSession } from "@/userSessions";
import ConversationHistoryTable from "./ConversationHistoryTable";
import useSearchBar from "@/hooks/use-searchBar";
import SearchBar from "../SearchBar";

// COMPONENT IS RERENDERING TWICE, FIX THAT
export default function SessionsTable() {
  const { page, search, pageLimit } = useSearchBar();

  const filteredSessions = userSessions.filter((session) =>
    session.title.toLowerCase().includes(search.toLowerCase()),
  );

  // simulation, query database based of page === 1? query first numberOfRowsToShow : from (page - 1) * numberOfRowsToShow
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
  const createFormButtonName = "Create Convo";
  const createFormButtonLink = "/conversation/form";
  return (
    <>
      <SearchBar
        tableList={sessionList}
        createFormButtonName={createFormButtonName}
        createFormButtonLink={createFormButtonLink}
      >
        <ConversationHistoryTable sessionList={sessionList} />
      </SearchBar>
    </>
  );
}
