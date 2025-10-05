import { VapiClient } from "@vapi-ai/server-sdk";

if (!process.env.VAPI_API_KEY) {
  throw new Error("Please add missing VAPI_API_KEY");
}

export const vapiClient = new VapiClient({ token: process.env.VAPI_API_KEY });
