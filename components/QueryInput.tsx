
import React, { useState } from 'react';
import { SearchIcon } from './icons/SearchIcon';

interface QueryInputProps {
  onExpand: (query: string) => void;
  isLoading: boolean;
}

const QueryInput: React.FC<QueryInputProps> = ({ onExpand, isLoading }) => {
  const [query, setQuery] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onExpand(query);
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
          <SearchIcon className="h-5 w-5 text-text-secondary" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g., sadness, a busy city"
          disabled={isLoading}
          className="w-full h-[50px] pl-11 pr-32 py-3 text-lg bg-base-200 border border-base-300 rounded-lg text-text-primary focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition duration-150 ease-in-out disabled:opacity-50"
          aria-label="Enter a concept or phrase"
        />
        <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
            <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center rounded-md bg-brand-primary px-6 py-2 text-base font-semibold text-white shadow-sm hover:bg-brand-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary disabled:bg-base-300 disabled:cursor-not-allowed transition-colors"
            >
                {isLoading ? 'Generating...' : 'Generate'}
            </button>
        </div>
      </div>
    </form>
  );
};

export default QueryInput;
