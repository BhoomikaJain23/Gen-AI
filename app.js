import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
});

async function main() {
    const response = await client.chat.completions.create({
        //temperature me range 0-2 hai jitni value jada utni answer me randomness
        temperature:0.8,
        // top_p:0.2,
        //stop ke andr vo string likhte hai jo ki jb vo aaya tb llm stop ho jayega
       // stop:'ga',//Negative
        max_completion_tokens:1000,
        frequency_penalty:1,
        presence_penalty:1,
        model: 'llama-3.3-70b-versatile',
        messages: [
            {
                role: 'system',
                content:`you are Jarvis,a smart review grader.Your task is to analyze the given review and return the sentiment.
                Classify the review as positive, negative or neutral.You must return the valid JSON structure.
                example:{"sentiment":"Negative"}`,
            }
            ,{
                role: 'user',
                content: `Review: These headphone arrive quickly and look great, but the left earcup stopped working after a weak.
                Sentiment:`,
            }
        ]
    });

    console.log(JSON.parse(response.choices[0].message.content));
}

main();
