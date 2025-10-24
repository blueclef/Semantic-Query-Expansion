
import { GoogleGenAI, Type } from "@google/genai";
import type { LiteraryExpansionResponse } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const systemInstruction = `You are a "Literary Expression Generator," a sophisticated AI that merges the creativity of a generative model with the analytical precision of a semantic model.

Your goal is to generate contextually and emotionally resonant literary devices (Metaphors, Similes, Personifications) for a user's input query.

You must follow a strict two-stage process:

**Stage 1: Creative Candidate Generation**
Based on the user's query and selected tone, you will generate a diverse and creative list of initial candidates for each of the three literary devices:
- **Metaphor (은유법):** An implicit comparison (A is B).
- **Simile (직유법):** An explicit comparison using 'like' or 'as' (A is like B).
- **Personification (활유법):** Attributing human qualities to non-human things.

**Stage 2: Semantic Filtering and Ranking**
After generating candidates, you will act as a "literary editor." You must score each generated expression based on its contextual and emotional similarity to the original query.
- The score must be a value between 0.0 and 1.0.
- A high score (e.g., > 0.75) means the expression is highly relevant, creative, and emotionally resonant with the query and tone.
- A low score means it's less relevant or a cliché.
- Filter out any candidates that are irrelevant or nonsensical.
- Rank the remaining, filtered candidates in descending order of their score.

Your final output MUST be a single JSON object that strictly adheres to the provided schema. Provide the top 3-5 ranked suggestions for each category.`;

const suggestionSchema = {
    type: Type.OBJECT,
    properties: {
        text: {
            type: Type.STRING,
            description: 'The literary expression.',
        },
        score: {
            type: Type.NUMBER,
            description: 'The semantic and emotional similarity score, from 0.0 to 1.0.',
        },
    },
    required: ['text', 'score'],
};

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        query: {
            type: Type.STRING,
            description: 'The original user input query.',
        },
        metaphors: {
            type: Type.ARRAY,
            description: 'A ranked list of generated metaphors.',
            items: suggestionSchema,
        },
        similes: {
            type: Type.ARRAY,
            description: 'A ranked list of generated similes.',
            items: suggestionSchema,
        },
        personifications: {
            type: Type.ARRAY,
            description: 'A ranked list of generated personifications.',
            items: suggestionSchema,
        },
    },
    required: ['query', 'metaphors', 'similes', 'personifications'],
};


export async function generateExpressions(query: string, tone: string): Promise<LiteraryExpansionResponse> {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Generate literary expressions for the concept "${query}" with a focus on a "${tone}" tone.`,
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                temperature: 0.8,
            },
        });

        const jsonString = response.text.trim();
        const parsedResponse = JSON.parse(jsonString) as LiteraryExpansionResponse;
        
        // Ensure all suggestions are sorted by score
        parsedResponse.metaphors?.sort((a, b) => b.score - a.score);
        parsedResponse.similes?.sort((a, b) => b.score - a.score);
        parsedResponse.personifications?.sort((a, b) => b.score - a.score);

        return parsedResponse;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to get response from Gemini API.");
    }
}
