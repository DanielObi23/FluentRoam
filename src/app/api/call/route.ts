import Groq from "groq-sdk";
import { VapiClient } from "@vapi-ai/server-sdk";

if (!process.env.VAPI_API_KEY) {
    throw new Error("Please add missing vapi api key")
}
export const vapiClient = new VapiClient({ token: process.env.VAPI_API_KEY });


export async function GET() {
    const call: any = await vapiClient.calls.get("9159eb24-0e06-4e36-93ac-2fed687a3bfa");
    //console.log(transcript)
    const transcript = call.transcript

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    // UPDATE EVERY OCCURENCE OF SPANISH
    const content = `
        You are a bilingual Spanish teacher. After every conversation, output ONLY a JSON object with EXACTLY these keys:
        {
            "title": "string (max 10 words)",
            "feedback": "markdown string with headings/formatting",
            "target_vocabulary": [{
                "vocab": "string",
                "part_of_speech": "string",
                "meaning": ["string"],
                "tone": "Casual|Neutral|Formal",
                "regional_variations": [{
                                    "country":"string", 
                                    "word":"string", 
                                    "part_of_speech": "string", 
                                    "tone": "Casual|Neutral|Formal", 
                                    "meaning": ["string"], 
                                    "example": {"sentence": "string", "translation": "string"}
                                    }] || [],
                "examples": [{"sentence": "string", "translation": "string"}],
                "idioms": [{
                        "phrase":"string", 
                        "meaning":"string", 
                        "region": "string of location where the idiom is used"
                        }] || [],
                "synonyms": ["string"],
                "antonyms": ["string"]
            }]
        }

        RULES:
        - ALWAYS include ALL top-level keys
        - Arrays must have minimum items (target_vocabulary: 4+, examples: 1+)
        - For empty arrays, use []
        - NEVER add extra keys or explanations
        - title - short, realistic, instantly-identifiable title for the learner (max 10 words).  
        - feedback - long, natural, teacher-style feedback in markdown with:
            • the feedback is about grammar as this is a language role play for the user to practice spanish
            • start with a quick encouragement, e.g "You did great but there are key areas you should improve on", 
                then only talk about mistakes in friendly tone, don't spend time listing what they did write
            • Refer to "the user" as "you"  
            • Error highlighting (❌ / ✅)  
            • Cultural insights (bullet list)  
            • Pronunciation tips (IPA) only if it changes the meaning of the word/sentence
            • Suggestions for improvement (bullet list)  
            • Must be properly formatted, proper heading, proper spacing and proper highlighting etc
        - target_vocabulary - array of 7-20 vocab objects (It must be at least 7, first get from the conversation, which words/phrases are high-utility words or user struggled with); each object must include:
            • vocab (infinitive form) or phrase
            • part_of_speech or write phrase if vocab is a phrase
            • meaning (array of 1-3 English glosses)  
            • tone: Casual | Neutral | Formal  
            • regional_variations (array or [])  
            • examples (array; first example must show ❌ vs ✅ usage from the conversation, ignore if it doesn't apply)  
            • idioms (array of {phrase, meaning, region})  
            • synonyms and antonyms arrays  

        Return **only** the JSON object—no explanations, no markdown fences.
    `;

    const chatCompletion = await groq.chat.completions.create({
        messages: [
            {
            role: "system",
            content: content
            },
            {
            role: "user",
            content: `Transcript: ${transcript}\n\nOutput ONLY valid JSON:`
            }
        ],
        model: "moonshotai/kimi-k2-instruct", // More capable model
        temperature: 0.5, // More deterministic
        max_completion_tokens: 4096, // Higher token limit
        top_p: 0.9,
        response_format: { type: "json_object" },
        stop: null
    });
    
    console.log(chatCompletion.choices[0].message.content)
    //const result = await main(transcript)
    // console.log(result)
    return Response.json(chatCompletion.choices[0].message.content)
}




