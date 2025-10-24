
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import QueryInput from './components/QueryInput';
import ResultsDisplay from './components/ResultsDisplay';
import { generateExpressions } from './services/geminiService';
import type { LiteraryExpansionResponse } from './types';

const TONES = ['Melancholy', 'Vibrant', 'Awe', 'Mysterious', 'Joyful'];

const App: React.FC = () => {
  const [results, setResults] = useState<LiteraryExpansionResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [initialLoad, setInitialLoad] = useState<boolean>(true);
  const [tone, setTone] = useState<string>(TONES[0]);

  const handleGenerateExpressions = useCallback(async (query: string) => {
    if (!query.trim()) {
      setError('Please enter a concept or phrase.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setInitialLoad(false);
    setResults(null);

    try {
      const result = await generateExpressions(query, tone);
      setResults(result);
    } catch (err) {
      console.error(err);
      setError('Failed to generate expressions. The model may be unavailable or the request was malformed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [tone]);

  return (
    <div className="flex flex-col h-full min-h-screen bg-base-100 font-sans">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="max-w-3xl mx-auto flex flex-col gap-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
              Generate Evocative Literary Expressions
            </h2>
            <p className="mt-3 text-md sm:text-lg text-text-secondary max-w-2xl mx-auto">
              Enter a concept, select a tone, and let AI craft metaphors, similes, and personifications for you.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="md:col-span-3">
                <QueryInput onExpand={handleGenerateExpressions} isLoading={isLoading} />
            </div>
            <div className="w-full">
                <label htmlFor="tone-select" className="block text-sm font-medium text-text-secondary mb-1">
                    Select Tone
                </label>
                <select
                    id="tone-select"
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    disabled={isLoading}
                    className="w-full h-[50px] bg-base-200 border border-base-300 rounded-lg text-text-primary focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition duration-150 ease-in-out disabled:opacity-50 px-3"
                >
                    {TONES.map((t) => (
                        <option key={t} value={t}>{t}</option>
                    ))}
                </select>
            </div>
          </div>
          
          <div className="mt-4">
            <ResultsDisplay
              results={results}
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
