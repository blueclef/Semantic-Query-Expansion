
import React from 'react';
import type { LiteraryExpansionResponse, Suggestion } from '../types';
import { LoaderIcon } from './icons/LoaderIcon';

interface ResultsDisplayProps {
  results: LiteraryExpansionResponse | null;
  isLoading: boolean;
  error: string | null;
  isInitial: boolean;
}

const ResultCategory: React.FC<{ title: string; suggestions: Suggestion[] }> = ({ title, suggestions }) => {
  if (!suggestions || suggestions.length === 0) {
    return null;
  }

  return (
    <div className="bg-base-200 p-6 rounded-lg border border-base-300 shadow-sm">
      <h3 className="text-lg font-semibold leading-6 text-brand-primary mb-4">{title}</h3>
      <ul className="space-y-4">
        {suggestions.map((suggestion, index) => (
          <li key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <p className="text-text-primary text-base flex-1">“{suggestion.text}”</p>
            <div className="flex items-center mt-2 sm:mt-0 sm:ml-4">
                <span className="text-sm font-mono text-text-secondary mr-2">
                    Score:
                </span>
                <span className="text-sm font-semibold text-brand-primary">
                    {(suggestion.score * 100).toFixed(1)}%
                </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results, isLoading, error, isInitial }) => {
  if (isInitial) {
    return (
        <div className="text-center py-10 px-6 bg-base-200 rounded-lg border border-dashed border-base-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232zM10 5H5v5" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-text-primary">Awaiting Your Muse</h3>
            <p className="mt-1 text-sm text-text-secondary">Your generated literary expressions will appear here.</p>
        </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 py-16">
        <LoaderIcon className="h-10 w-10 animate-spin text-brand-primary" />
        <p className="text-text-secondary">Crafting literary expressions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg" role="alert">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  const hasResults = results && (results.metaphors?.length > 0 || results.similes?.length > 0 || results.personifications?.length > 0);

  if (!hasResults) {
     return (
        <div className="text-center py-10 px-6 bg-base-200 rounded-lg border border-dashed border-base-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-text-primary">No expressions found</h3>
            <p className="mt-1 text-sm text-text-secondary">Try a different concept, tone, or try again.</p>
        </div>
    );
  }

  return (
    <div className="space-y-8">
        <ResultCategory title="Metaphors (은유법)" suggestions={results.metaphors} />
        <ResultCategory title="Similes (직유법)" suggestions={results.similes} />
        <ResultCategory title="Personifications (활유법)" suggestions={results.personifications} />
    </div>
  );
};

export default ResultsDisplay;
