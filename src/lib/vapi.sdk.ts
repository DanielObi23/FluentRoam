import Vapi from "@vapi-ai/web";

if (!process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN) {
    throw new Error("Please add missing vapi web token")
}
export const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN);