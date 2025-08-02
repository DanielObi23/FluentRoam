"use server"
import * as deepl from 'deepl-node';
import { SourceLanguageCode, TargetLanguageCode } from 'deepl-node';

if (!process.env.NEXT_PUBLIC_DEEPL_AUTH_KEY) {
    throw new Error("Please add missing DeepL auth key")
}

export type TranslateText = {
    text: string,
    targetLanguageCode: TargetLanguageCode,
    sourceLanguageCode: SourceLanguageCode | null
}

const deeplClient = new deepl.DeepLClient(process.env.NEXT_PUBLIC_DEEPL_AUTH_KEY!);
export async function translateText({text, targetLanguageCode, sourceLanguageCode}: TranslateText) {
    try {
        const result = await deeplClient.translateText(text, sourceLanguageCode, targetLanguageCode);
        console.log("server: " + result.text)
        return {status: 200, message: result.text}
    } catch (err) {
        console.error("Error translating the text")
        return {status: 404, message: "error translating"}
    }
    
}
