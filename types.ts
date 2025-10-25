export type FontStyle = 'serif' | 'sans-serif' | 'monospace';
export type Alignment = 'left' | 'center' | 'right';

export interface StyleOptions {
    font: FontStyle;
    alignment: Alignment;
}

export type SentenceComplexity = 'low' | 'medium' | 'high';
export type LexicalDensity = 'high-noun-verb' | 'balanced' | 'high-adj-adv';
export type PunctuationRhythm = 'low-comma' | 'medium-comma' | 'high-comma';
export type FigurativeFrequency = 'low' | 'medium' | 'high';

export interface StyleConfig {
    sentenceComplexity: SentenceComplexity;
    lexicalDensity: LexicalDensity;
    punctuationRhythm: PunctuationRhythm;
    figurativeFrequency: FigurativeFrequency;
    tone: string;
}

export interface StylePreset {
    name: string;
    config: StyleConfig;
}

export interface ResultState {
    text: string;
    styleOptions: StyleOptions;
}

export type LiteraryForm = 'poem' | 'short-story' | 'haiku' | 'limerick' | 'sonnet' | 'custom';

export interface QueryParams {
    prompt: string;
    styleConfig: StyleConfig;
    literaryForm: LiteraryForm;
}