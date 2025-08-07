// update response type any and give it a type

import axios from "axios"
import { v4 as uuidv4 } from "uuid";

let key = process.env.AZURE_TRANSLATE_API_KEY
if (!key) {
    throw new Error("Please add Azure translate API key")
}
let endpoint = "https://api.cognitive.microsofttranslator.com";
let resourceLocation = "ukwest";


export default async function azureTranslate(from: string, to: string, text: string) {
    let params = new URLSearchParams();
    params.append("api-version", "3.0");
    params.append("from", from);
    params.append("to", to);

    try {
        axios({
            baseURL: endpoint,
            url: '/translate',
            method: 'post',
            headers: {
                'Ocp-Apim-Subscription-Key': key,
                'Ocp-Apim-Subscription-Region': resourceLocation,
                'Content-type': 'application/json',
                'X-ClientTraceId': uuidv4().toString()
            },
            params: params,
            data: [{
                'text': text
            }],
            responseType: 'json'
        }).then(function(response: any){
            const translation = response.data[0].translations[0].text
            console.log(translation);
            return {status: 200, message: translation}
        })
    } catch (err) {
        console.log("Azure Translate Error: ", err)
        return {status: 404, message: "Error translating text"}
    }
    
}