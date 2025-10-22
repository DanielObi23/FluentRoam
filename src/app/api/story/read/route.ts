import { supabaseAdmin } from "@/lib/supabase-client";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  const { page, id } = await req.json();
  const user = await currentUser();

  if (!user) {
    return Response.json({ error: "Unauthorized", status: 401 });
  }

  if (page === 1) {
    const { error, data } = await supabaseAdmin
      .from("story")
      .select("plot, tags, type, story, num_of_pages")
      .eq("id", id)
      .single();

    if (error) {
      return Response.json({ status: 500, error: "error retrieving data" });
    }
    return Response.json({
      plot: data.plot,
      tags: data.tags,
      type: data.type,
      summary: data.story.summary,
      title: data.story.title,
      numOfPages: data.num_of_pages,
    });
  }

  const { error, data } = await supabaseAdmin
    .from("story")
    .select("story, num_of_pages")
    .eq("id", id)
    .single();

  if (error) {
    console.log("Supabase Error", error);
    return Response.json({ status: 500, error: "error retrieving data" });
  }

  return Response.json({
    page: data.story.pages[page - 2],
    numOfPages: data.num_of_pages,
  });
}
