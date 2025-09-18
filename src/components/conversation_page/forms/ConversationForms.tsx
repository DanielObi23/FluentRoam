import CallSessionForm from "./CallSessionForm";
import ChatSessionForm from "./ChatSessionForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ConversationForms() {
  return (
    <Tabs defaultValue="call">
      <div className="flex w-full items-center justify-around">
        <p className="font-ui text-xl font-semibold xl:text-2xl">
          Start Conversation
        </p>
        <TabsList className="self-end">
          <TabsTrigger value="call">Call</TabsTrigger>
          <TabsTrigger value="chat">Chat</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="call">
        <CallSessionForm />
      </TabsContent>
      <TabsContent value="chat">
        <ChatSessionForm />
      </TabsContent>
    </Tabs>
  );
}
