
import { GoogleGenAI, Type } from "@google/genai";
import type { ExpansionResponse } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const systemInstruction = `You are a Semantic Query Expansion System (SQES). Your goal is to improve search relevance by automatically generating contextually similar and effective search queries.

You will follow a three-stage hybrid architecture:
1.  **Candidate Generation:** Generate an initial, broad set of potential synonyms and related phrases for the user's query.
2.  **Contextual Filtering:** Critically filter the candidates based on contextual similarity. For example, for the query "cheap flights", the term "cheap" implies low cost, not low quality. Therefore, "low-cost airlines" is a relevant expansion, while "shoddy flights" is not. You must resolve this kind of ambiguity correctly.
3.  **Semantic Scoring & Ranking:** Calculate a semantic similarity score (between 0.0 and 1.0) for each filtered candidate against the original query. The score should represent how contextually close the suggestion is to the original query. Rank the suggestions in descending order of their score.

Your output MUST be a JSON object that adheres to the provided schema. The 'query' field should be the original user query. The 'suggestions' array should contain the top 5-10 ranked expansion queries.`;

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        query: {
            type: Type.STRING,
            description: 'The original user input query.',
        },
        suggestions: {
            type: Type.ARRAY,
            description: 'A ranked list of contextually relevant semantic expansion queries.',
            items: {
                type: Type.OBJECT,
                properties: {
                    text: {
                        type: Type.STRING,
                        description: 'The suggested expansion query.',
                    },
                    score: {
                        type: Type.NUMBER,
                        description: 'The cosine similarity score between the suggestion and the original query, from 0.0 to 1.0.',
                    },
                },
                required: ['text', 'score'],
            },
        },
    },
    required: ['query', 'suggestions'],
};

export async function expandQuery(query: string): Promise<ExpansionResponse> {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Expand the query: "${query}"`,
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                temperature: 0.3,
            },
        });

        const jsonString = response.text.trim();
        const parsedResponse = JSON.parse(jsonString) as ExpansionResponse;
        
        // Ensure suggestions are sorted by score desc
        parsedResponse.suggestions.sort((a, b) => b.score - a.score);

        return parsedResponse;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to get response from Gemini API.");
    }
}
