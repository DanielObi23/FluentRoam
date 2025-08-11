import Vapi from "@vapi-ai/web";
import { VapiClient } from "@vapi-ai/server-sdk";

if (!process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN) {
    throw new Error("Please add missing vapi web token")
}
export const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN);

if (!process.env.VAPI_API_KEY) {
    throw new Error("Please add missing vapi api key")
}
export const vapiClient = new VapiClient({ token: process.env.VAPI_API_KEY });