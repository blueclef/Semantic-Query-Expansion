
import React from 'react';
import type { Suggestion } from '../types';
import { LoaderIcon } from './icons/LoaderIcon';

interface ResultsDisplayProps {
  suggestions: Suggestion[];
  isLoading: boolean;
  error: string | null;
  isInitial: boolean;
}

const ScoreBar: React.FC<{ score: number }> = ({ score }) => {
    const percentage = score * 100;
    let bgColor = 'bg-red-500';
    if (percentage > 85) {
        bgColor = 'bg-green-500';
    } else if (percentage > 70) {
        bgColor = 'bg-yellow-500';
    } else if (percentage > 50) {
        bgColor = 'bg-orange-500';
    }

    return (
        <div className="w-full bg-base-300 rounded-full h-2.5">
            <div className={`${bgColor} h-2.5 rounded-full`} style={{ width: `${percentage}%` }}></div>
        </div>
    );
};


const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ suggestions, isLoading, error, isInitial }) => {
  if (isInitial) {
    return (
        <div className="text-center py-10 px-6 bg-base-200 rounded-lg border border-dashed border-base-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-text-primary">Waiting for your query</h3>
            <p className="mt-1 text-sm text-text-secondary">Your generated suggestions will appear here.</p>
        </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 py-16">
        <LoaderIcon className="h-10 w-10 animate-spin text-brand-primary" />
        <p className="text-text-secondary">Generating semantic expansions...</p>
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

  if (suggestions.length === 0 && !isLoading) {
     return (
        <div className="text-center py-10 px-6 bg-base-200 rounded-lg border border-dashed border-base-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-text-primary">No suggestions found</h3>
            <p className="mt-1 text-sm text-text-secondary">Try a different or more specific query.</p>
        </div>
    );
  }

  return (
    <div className="flow-root">
        <h3 className="text-lg font-medium leading-6 text-text-primary mb-4">Generated Suggestions</h3>
        <ul role="list" className="space-y-4">
            {suggestions.map((suggestion, index) => (
            <li key={index} className="bg-base-200 p-4 rounded-lg border border-base-300 shadow-sm transition-transform hover:scale-[1.02] hover:border-brand-primary/50">
                <div className="flex items-center space-x-4">
                <div className="flex-1 min-w-0">
                    <p className="text-lg font-medium text-text-primary truncate">{suggestion.text}</p>
                    <div className="mt-2">
                        <ScoreBar score={suggestion.score} />
                    </div>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-text-primary">
                    {(suggestion.score * 100).toFixed(1)}%
                </div>
                </div>
            </li>
            ))}
        </ul>
    </div>
  );
};

export default ResultsDisplay;
