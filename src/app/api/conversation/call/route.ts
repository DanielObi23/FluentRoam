import Groq from "groq-sdk";
import { VapiClient } from "@vapi-ai/server-sdk";
import { feedbackPromptSpanish } from "@/utils/conversationData/spanishVapi";
import { supabaseAdmin } from "@/lib/supabase-client";
import { currentUser } from "@clerk/nextjs/server";

if (!process.env.VAPI_API_KEY) {
  throw new Error("Please add missing vapi api key");
}
export const vapiClient = new VapiClient({ token: process.env.VAPI_API_KEY });

interface VapiCall {
  transcript?: string;
  recordingUrl?: string;
  [key: string]: unknown;
}

export async function POST(req: Request) {
  const { callId, proficiency, scenario, formality } = await req.json();
  if (!callId || !proficiency || !scenario || !formality) {
    return Response.json({ error: "missing data", status: 400 });
  }

  const user = await currentUser();
  if (!user) {
    return Response.json({ error: "Unauthorized", status: 401 });
  }

  const call: VapiCall = await vapiClient.calls.get(callId);
  const transcript = call.transcript;
  const audio = call.recordingUrl;

  if (!transcript)
    return Response.json({ status: 500, error: "no transcript provided" });

  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: feedbackPromptSpanish,
      },
      {
        role: "user",
        content: `Transcript: ${transcript}\n\nOutput ONLY valid JSON`,
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
    session_id: callId,
    proficiency,
    scenario,
    formality,
    type: "call",
    audio,
    user_id: user.id,
    feedback,
    vocabulary,
  });

  if (error) {
    return Response.json({ error: "error updating supabase", status: 500 });
  }

  return Response.json({ status: 201 });
}
