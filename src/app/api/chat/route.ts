interface ChatMessage {
  role: 'user' | 'assistant';
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
  previousChatId?: string
): Promise<ChatResponse> {
  const response = await fetch('https://api.vapi.ai/chat', {
    method: 'POST',
    headers: {
      'Authorization': process.env.Vapi_API_KEY!,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      assistantId: "e3fbfb66-b32e-4c74-b456-c6ea5fb15663",
      input: message,
      ...(previousChatId && { previousChatId })
    })
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const chat: ChatApiResponse = await response.json();
  return {
    chatId: chat.id,
    response: chat.output[0].content,
    fullData: chat
  };
}

// FIX THE ERROR HANDLING
export async function POST(req: Request) {
  const {chatId, message} = await req.json()

  if (message.trim().length === 0 || !message) {
    return Response.json({error: "no message given"})
  }

  let chat;
  if (chatId === "") {
    console.log("none")
    chat = await sendChatMessage(message)
  } else {
    console.log(`chat-id: ${chatId}`)
    chat = await sendChatMessage(message, chatId)
  }
  console.log(chat.response)
  return Response.json({chatId: chat.chatId, message: chat.response, data: chat.fullData})
}

