import useTable from "@/hooks/use-table";
import { useEffect, useState } from "react";
import axios from "axios";
import HistoryTable from "@/components/HistoryTable";
import ConversationForms from "@/components/conversation_page/forms/ConversationForms";
import ConversationHistoryTable from "@/components/conversation_page/ConversationHistoryTable";
import Loading from "@/components/UI_state/Loading";
import Error from "@/components/UI_state/Error";
import type { UserHistory } from "@/utils/conversationData/types";

export default function SessionsTable() {
  const { page, search, pageLimit } = useTable();
  const [sessions, setSessions] = useState<UserHistory[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    async function getSessionList() {
      try {
        const result = await axios.post("/api/conversation", {
          page,
          search,
          pageLimit,
        });
        setSessions(result.data);
      } catch (err) {
        setHasError(true);
        console.log(err);
        console.error("Error getting sessions");
      }

      setIsDataLoading(false);
    }
    getSessionList();
  }, [page, search]);

  if (isDataLoading) {
    return <Loading />;
  }

  if (hasError) {
    return <Error />;
  }

  return (
    <>
      <HistoryTable
        tableLength={sessions.length}
        buttonName={["Create", "Convo"]}
        form={<ConversationForms />}
      >
        <ConversationHistoryTable sessionList={sessions} />
      </HistoryTable>
    </>
  );
}
