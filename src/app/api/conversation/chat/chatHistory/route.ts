export async function POST(req: Request) {
  if (!process.env.VAPI_API_KEY) {
    throw new Error("Please add missing vapi api key");
  }
  const { id } = await req.json();
  // Get Chat (GET /chat/:id)
  const response = await fetch(`https://api.vapi.ai/chat/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.Vapi_API_KEY!}`,
    },
  });

  const body = await response.json();

  return Response.json({ messages: body.messages, chatID: id });
}
