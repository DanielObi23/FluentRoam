interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatApiResponse {
  id: string;
  assistantId: string;
  messages: ChatMessage[];
  output: ChatMessage[];
  createdAt: string;
  updatedAt: string;
  orgId?: string;
  sessionId?: string;
  name?: string;
}

interface ChatResponse {
  chatId: string;
  response: string;
  fullData: ChatApiResponse;
}

async function sendChatMessage(
  message: string,
  previousChatId?: string,
): Promise<ChatResponse> {
  const response = await fetch("https://api.vapi.ai/chat", {
    method: "POST",
    headers: {
      Authorization: process.env.VAPI_API_KEY!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      assistantId: "e3fbfb66-b32e-4c74-b456-c6ea5fb15663",
      input: message,
      ...(previousChatId && { previousChatId }),
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const chat: ChatApiResponse = await response.json();
  return {
    chatId: chat.id,
    response: chat.output[0].content,
    fullData: chat,
  };
}

async function startChatMessage(
  scenario: string,
  formality: string,
  response_length: string,
  proficiency: string,
  previousChatId?: string,
): Promise<ChatResponse> {
  const response = await fetch("https://api.vapi.ai/chat", {
    method: "POST",
    headers: {
      Authorization: process.env.Vapi_API_KEY!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      assistantId: "e3fbfb66-b32e-4c74-b456-c6ea5fb15663",
      input: "Hola",
      ...(previousChatId && { previousChatId }),
      // assistant: {
      //   firstMessageMode: "assistant-speaks-first-with-model-generated-message"
      // },
      assistantOverrides: {
        variableValues: {
          //first_message: `Hello`,
          scenario,
          formality,
          response_length,
          proficiency,
        },
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const chat: ChatApiResponse = await response.json();
  return {
    chatId: chat.id,
    response: chat.output[0].content,
    fullData: chat,
  };
}

export async function POST(req: Request) {
  if (!process.env.VAPI_API_KEY) {
    throw new Error("Please add missing vapi api key");
  }
  const { chatId, message, scenario, formality, response_length, proficiency } =
    await req.json();

  if ((message.trim().length === 0 || !message) && chatId !== "") {
    return Response.json({ error: "no message given" });
  }

  let chat;
  if (chatId === "") {
    chat = await startChatMessage(
      scenario,
      formality,
      response_length,
      proficiency,
    );
  } else {
    chat = await sendChatMessage(message, chatId);
  }
  return Response.json({
    chatId: chat.chatId,
    message: chat.response,
    data: chat.fullData,
  });
}
