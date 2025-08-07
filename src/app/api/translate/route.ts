import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { auth } from '@clerk/nextjs/server'
import * as deepl from 'deepl-node';


if (!process.env.AZURE_TRANSLATE_API_KEY) {
    throw new Error("Please add missing azure translate api key")
}

const azureKey = process.env.AZURE_TRANSLATE_API_KEY;
const azureRegion = "uksouth";
const azureEndpoint = "https://api.cognitive.microsofttranslator.com";


if (!process.env.DEEPL_AUTH_KEY) {
    throw new Error("Please add missing DeepL auth key")
}

const deeplClient = new deepl.DeepLClient(process.env.DEEPL_AUTH_KEY!);

export async function POST(req: Request) {
    const { text, from, to } = await req.json();
    if (!text || !to) {
        return Response.json({ status: 400, message: "Missing text or target lang" });
    }

    const { has } = await auth()
    const hasTravellerPack = has({plan: "traveller_pack"})
    const hasNativePack = has({plan: "native_pack"})

    /*---------- TRAVELLER PACK -------- */
    if (hasTravellerPack) {
        const params = new URLSearchParams({ "api-version": "3.0", from, to });
        
        try {
            const { data } = await axios.post(
                `${azureEndpoint}/translate`,
                [{ text }],
                {
                params,
                headers: {
                    "Ocp-Apim-Subscription-Key": azureKey,
                    "Ocp-Apim-Subscription-Region": azureRegion,
                    "Content-Type": "application/json",
                    "X-ClientTraceId": uuidv4(),
                },
                }
            );
            const translation = data[0].translations[0].text
            return Response.json({ status: 200, message: translation });
        } catch (err: any) {
            console.error("Azure Translation Error");
            return Response.json({ status: 502, message: "Translation failed" });
        }
    }

    /*---------- NATIVE PACK -------- */
    if (hasNativePack) {
        try {
            const result = await deeplClient.translateText(text, from, to);
            const translatedText = Array.isArray(result) ? result.map(r => r.text).join(" ") : result.text;
            return {status: 200, message: translatedText}
        } catch (err) {
            console.error("Error translating the text")
            return {status: 502, message: "error translating"}
        }
    }

    /*---------- HELLO PACK -------- */
    return Response.json({status: 500, message: "Please subscribe to the Traveller or Native Pack"})
}