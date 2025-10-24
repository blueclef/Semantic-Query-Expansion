
export interface Suggestion {
  text: string;
  score: number;
}

export interface ExpansionResponse {
  query: string;
  suggestions: Suggestion[];
}
