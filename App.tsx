
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import QueryInput from './components/QueryInput';
import ResultsDisplay from './components/ResultsDisplay';
import { expandQuery } from './services/geminiService';
import type { Suggestion } from './types';

const App: React.FC = () => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [initialLoad, setInitialLoad] = useState<boolean>(true);

  const handleExpandQuery = useCallback(async (query: string) => {
    if (!query.trim()) {
      setError('Query cannot be empty.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setInitialLoad(false);
    setSuggestions([]);

    try {
      const result = await expandQuery(query);
      setSuggestions(result.suggestions);
    } catch (err) {
      console.error(err);
      setError('Failed to expand query. The model may be unavailable or the request was malformed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="flex flex-col h-full min-h-screen bg-base-100 font-sans">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="max-w-3xl mx-auto flex flex-col gap-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
              Expand Your Search Horizons
            </h2>
            <p className="mt-3 text-md sm:text-lg text-text-secondary max-w-2xl mx-auto">
              Enter a keyword below to generate contextually relevant search queries, ranked by semantic similarity.
            </p>
          </div>
          
          <QueryInput onExpand={handleExpandQuery} isLoading={isLoading} />
          
          <div className="mt-4">
            <ResultsDisplay
              suggestions={suggestions}
              isLoading={isLoading}
              error={error}
              isInitial={initialLoad}
            />
          </div>
        </div>
      </main>
      <footer className="py-4 text-center text-sm text-text-secondary/50">
        <p>Powered by Gemini API</p>
      </footer>
    </div>
  );
};

export default App;
