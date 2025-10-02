import { supabaseAdmin } from "@/lib/supabase-client";
import { currentUser } from "@clerk/nextjs/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const page = searchParams.get("page") ?? "1";
  const pageLimit = searchParams.get("pageLimit") ?? "10";
  const search = searchParams.get("search") ?? "";
  const user = await currentUser();

  if (!user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  // Calculate offset for pagination
  const from = (parseInt(page) - 1) * parseInt(pageLimit);
  const to = from + parseInt(pageLimit) - 1;

  const { error, data } = await supabaseAdmin
    .from("vocabulary")
    .select("*")
    .eq("user_id", user?.id)
    .ilike("text", `%${search}%`)
    .ilike("translation", `%${search}%`)
    .range(from, to)
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
    return Response.json({ error: error.message, status: 500 });
  }

  return Response.json({ data, status: 200 });
}

export async function POST(req: Request) {
  const { text, translation, context, pos } = await req.json();
  const user = await currentUser();

  if (!user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const { error, data } = await supabaseAdmin
    .from("vocabulary")
    .insert({ user_id: user.id, text, translation, context, pos });

  if (error) {
    console.log(error);
    return Response.json({ error: error.message, status: 500 });
  }

  return Response.json({ data, status: 201 });
}

export async function PATCH(req: Request) {
  const { id, text, translation, context, pos } = await req.json();
  const user = await currentUser();

  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabaseAdmin
    .from("vocabulary")
    .update({ text, translation, context, pos })
    .eq("id", id)
    .eq("user_id", user.id)
    .select()
    .single();

  if (error) {
    console.error(error);
    return Response.json({ error: error.message }, { status: 500 });
  }

  console.log(data);
  return Response.json({ data, status: 200 });
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const user = await currentUser();

  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { error, data } = await supabaseAdmin
    .from("vocabulary")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id)
    .select()
    .single();

  if (error) {
    console.error(error);
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ data, status: 200 });
}
