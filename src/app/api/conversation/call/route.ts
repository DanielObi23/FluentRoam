import Groq from "groq-sdk";
import { VapiClient } from "@vapi-ai/server-sdk";
import { feedbackPromptSpanish } from "@/utils/conversationData/spanishVapi";
import { supabaseAdmin } from "@/lib/supabase-client";
import { currentUser } from "@clerk/nextjs/server";

if (!process.env.VAPI_API_KEY) {
  throw new Error("Please add missing vapi api key");
}
export const vapiClient = new VapiClient({ token: process.env.VAPI_API_KEY });

export async function POST(req: Request) {
  const { callId, proficiency, scenario, formality, type } = await req.json();
  const user = await currentUser();

  if (!user) {
    return Response.json({ error: "Unauthorized", status: 401 });
  }

  if (!callId || !proficiency || !scenario || !formality || !type) {
    return Response.json({ error: "missing data", status: 400 });
  }

  const call: any = await vapiClient.calls.get(callId);
  const transcript = call?.transcript;
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
  const title = summary.title;
  const feedback = summary.feedback;
  const vocabulary = summary.vocabulary;

  let audio;
  if (type === "call") {
    audio = call.recordingUrl;
  }

  console.log({
    session_id: callId,
    proficiency,
    scenario,
    formality,
    type,
    audio,
    user_id: user.id,
    title,
    feedback,
    vocabulary,
  });

  const { error } = await supabaseAdmin.from("conversation").insert({
    session_id: callId,
    proficiency,
    scenario,
    formality,
    type,
    audio,
    user_id: user.id,
    title,
    feedback,
    vocabulary,
  });

  if (error) {
    return Response.json({ error: "error updating supabase", status: 500 });
  }

  return Response.json({ status: 201 });
}
