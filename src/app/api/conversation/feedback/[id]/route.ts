import { supabaseAdmin } from "@/lib/supabase-client";
import { currentUser } from "@clerk/nextjs/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id: session_id } = await params;
  if (!session_id) {
    return Response.json({ error: "No session id provided", status: 401 });
  }

  const user = await currentUser();
  if (!user) {
    return Response.json({ error: "Unauthorized", status: 401 });
  }

  const { error, data } = await supabaseAdmin
    .from("conversation")
    .select(
      "type, scenario, proficiency, feedback, vocabulary, audio, created_at",
    )
    .eq("session_id", session_id)
    .single();

  if (error) {
    console.log("Supabase Error", error);
    console.error("Error retrieving feedback data", error.message);
  }

  if (!data) {
    return Response.json({ error: "No session found", status: 404 });
  }

  return Response.json(data);
}
