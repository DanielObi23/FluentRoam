import { supabaseAdmin } from "@/lib/supabase-client";
import { VocabEntry } from "@/utils/vocabData/types";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  const { values } = await req.json();
  const user = await currentUser();

  if (!user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const vocabs = values.map((vocab: VocabEntry) => ({
    user_id: user.id,
    ...vocab,
  }));

  const { error, data } = await supabaseAdmin
    .from("vocabulary")
    .upsert(vocabs, {
      onConflict: "user_id, text, pos, translation",
      ignoreDuplicates: true, // skip duplicates
    });

  if (error) {
    console.log(error);
    return Response.json({ error: error.message, status: 500 });
  }

  return Response.json({ data, status: 201 });
}
