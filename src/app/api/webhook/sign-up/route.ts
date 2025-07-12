import { Webhook } from "svix"
import { headers } from "next/headers"
import { WebhookEvent } from "@clerk/nextjs/server"

// export async function GET() {
//   return new Response("Webhook route working!", { status: 200 });
// }

export async function POST(req: Request) {
    console.log("Webhook endpoint hit!")
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

    if (!WEBHOOK_SECRET) {
        throw new Error("Please add webhook secret")
    }

    const headerPayload = await headers();
    const svix_id = headerPayload.get("svix-id")
    const svix_timestamp = headerPayload.get("svix-timestamp")
    const svix_signature = headerPayload.get("svix-signature")
    
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response("Error occured - No Svix headers")
    }

    const payload = await req.json();
    const body = JSON.stringify(payload)

    const wh = new Webhook(WEBHOOK_SECRET);

    let event: WebhookEvent;

    try {
        event = wh.verify(body, {
                "svix-id": svix_id,
                "svix-timestamp": svix_timestamp,
                "svix-signature": svix_signature,
                }) as WebhookEvent;
    } catch (error) {
        console.error("Error verying webhook", error)
        return new Response("Error occured verying webhook", {status: 400})
    }

    const data = event.data
    const eventType = event.type
    console.log(data)
    //logs
    if (eventType === "user.created"){
        console.log(data)
    }
    return new Response("Webhook processed successfully", { status: 200 })
}
