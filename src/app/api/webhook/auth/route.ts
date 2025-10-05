import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { supabaseAdmin } from "@/lib/supabase-client";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error("Please add clerk webhook secret in env");
  }

  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured - No Svix headers");
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);

  let event: WebhookEvent;

  try {
    event = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (error) {
    console.error("Error verying webhook", error);
    return new Response("Error occured verying webhook", { status: 400 });
  }

  const eventType = event.type;
  //logs
  if (eventType === "user.created") {
    const user = event.data;
    const created_user = {
      id: user.id,
      email: user.email_addresses[0].email_address,
    };
    const { error } = await supabaseAdmin
      .from("users")
      .insert(created_user)
      .single();
    if (error) {
      console.error("error adding user to database", error.message);
      return;
    }
  }

  if (eventType === "user.deleted") {
    const user = event.data;
    const { error } = await supabaseAdmin
      .from("users")
      .delete()
      .eq("id", user.id);
    if (error) {
      console.error("error deleting user from database", error.message);
      console.log(error);
    }
  }

  return new Response("Webhook processed successfully", { status: 200 });
}
