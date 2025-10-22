import Groq from "groq-sdk";
import { feedbackPromptSpanish } from "@/utils/conversationData/spanishVapi";
import { supabaseAdmin } from "@/lib/supabase-client";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  const { chatId, proficiency, scenario, formality, transcript } =
    await req.json();
  const user = await currentUser();

  if (!user) {
    return Response.json({ error: "Unauthorized", status: 401 });
  }

  if (!chatId || !proficiency || !scenario || !formality || !transcript) {
    return Response.json({ error: "missing data", status: 400 });
  }

  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: feedbackPromptSpanish,
      },
      {
        role: "user",
        content: `Transcript: ${transcript}\n\nOutput ONLY valid JSON:`,
      },
    ],
    model: "moonshotai/kimi-k2-instruct",
    temperature: 0.5,
    max_completion_tokens: 4096,
    top_p: 0.9,
    response_format: { type: "json_object" },
    stop: null,
  });

  const summary = JSON.parse(chatCompletion.choices[0].message.content!);
  const feedback = summary.feedback;
  const vocabulary = summary.vocabulary;

  const { error } = await supabaseAdmin.from("conversation").insert({
    session_id: chatId,
    proficiency,
    scenario,
    formality,
    type: "chat",
    user_id: user.id,
    feedback,
    vocabulary,
  });

  if (error) {
    console.log("Error saving chat", error);
    return Response.json({ error: "error saving chat", status: 500 });
  }

  return Response.json({ status: 201 });
}
