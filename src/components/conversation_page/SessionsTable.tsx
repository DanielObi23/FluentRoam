import useTable from "@/hooks/use-table";
import { useEffect, useState } from "react";
import axios from "axios";
import Table from "@/components/Table";
import ConversationForms from "@/components/conversation_page/forms/ConversationForms";
import ConversationHistoryTable from "@/components/conversation_page/ConversationHistoryTable";
import Loading from "@/components/Loading";
import Error from "@/app/error";

type UserSession = {
  session_id: string;
  session_type: string;
  title: string;
};
export default function SessionsTable() {
  const { page, search, pageLimit } = useTable();
  const [sessions, setSessions] = useState<UserSession[]>([]);
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
      <Table
        tableLength={sessions.length}
        buttonName={["Create", "Convo"]}
        form={<ConversationForms />}
      >
        <ConversationHistoryTable sessionList={sessions} />
      </Table>
    </>
  );
}
