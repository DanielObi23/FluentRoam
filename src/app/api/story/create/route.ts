import { systemContent, userContent } from "@/utils/storyData/groqPrompt";
import Groq from "groq-sdk";
import { supabaseAdmin } from "@/lib/supabase-client";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  const { plot, proficiency, type, pov, genre, theme, tone } = await req.json();
  if (!plot || !proficiency || !type || !pov || !genre || !theme || !tone) {
    return Response.json({ error: "missing data", status: 400 });
  }

  const user = await currentUser();
  if (!user) {
    return Response.json({ error: "Unauthorized", status: 401 });
  }

  const parameters = {
    plot,
    proficiency,
    type,
    pov,
    genre,
    theme,
    tone,
  };

  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: systemContent,
      },
      {
        role: "user",
        content: `
        Generate a Spanish story with the following specifications: \n\n
        parameters: ${JSON.stringify(parameters)}\n
        `,
      },
    ],
    model: "moonshotai/kimi-k2-instruct",
    temperature: 0.5,
    max_completion_tokens: 4096,
    top_p: 0.9,
    response_format: { type: "json_object" },
    stop: null,
  });

  const story = JSON.parse(chatCompletion.choices[0].message.content!);
  const tags = {
    genre,
    theme,
    tone,
  };

  const { error } = await supabaseAdmin.from("story").insert({
    user_id: user.id,
    tags,
    story,
    plot,
    proficiency,
    type,
    num_of_pages: story.pages.length - 1,
  });

  if (error) {
    return Response.json({ error: "error updating supabase", status: 500 });
  }

  return Response.json({ status: 201 });
}
