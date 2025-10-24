
export interface Suggestion {
  text: string;
  score: number;
}

export interface LiteraryExpansionResponse {
  query: string;

  /** A list of generated metaphors. */
  metaphors: Suggestion[];

  /** A list of generated similes. */
  similes: Suggestion[];

  /** A list of generated personifications. */
  personifications: Suggestion[];
}
