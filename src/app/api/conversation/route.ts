import { supabaseAdmin } from "@/lib/supabase-client";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  const { page = 1, pageLimit = 10, search = "" } = await req.json();
  const user = await currentUser();

  if (!user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  // Calculate offset for pagination
  const from = (page - 1) * pageLimit;
  const to = from + pageLimit - 1;

  const { error, data } = await supabaseAdmin
    .from("conversation")
    .select("session_id, type, title")
    .eq("user_id", user?.id)
    .ilike("title", `%${search}%`)
    .range(from, to)
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
    return Response.json({ error: error.message, status: 500 });
  }

  return Response.json(data);
}
