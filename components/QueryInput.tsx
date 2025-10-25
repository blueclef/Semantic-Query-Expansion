import React, { useState } from 'react';
import { LoaderIcon } from './icons/LoaderIcon';
import { SearchIcon } from './icons/SearchIcon';
import { LiteraryForm } from '../types';

interface QueryInputProps {
    onSubmit: (prompt: string, form: LiteraryForm) => void;
    isLoading: boolean;
    selectedForm: LiteraryForm;
    onFormChange: (form: LiteraryForm) => void;
}

const formOptions: { value: LiteraryForm; label: string }[] = [
    { value: 'poem', label: 'Poem' },
    { value: 'short-story', label: 'Short Story' },
    { value: 'haiku', label: 'Haiku' },
    { value: 'limerick', label: 'Limerick' },
    { value: 'sonnet', label: 'Sonnet' },
    { value: 'custom', label: 'Custom Style' },
];

const QueryInput: React.FC<QueryInputProps> = ({ onSubmit, isLoading, selectedForm, onFormChange }) => {
    const [prompt, setPrompt] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (prompt.trim() && !isLoading) {
            onSubmit(prompt, selectedForm);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
            <div className="flex items-center bg-slate-800 rounded-lg shadow-md p-2 border-2 border-slate-700 focus-within:border-sky-500 transition-colors duration-200">
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Enter a theme, a scene, or a line of poetry..."
                    className="flex-grow bg-transparent text-slate-200 placeholder-slate-500 focus:outline-none resize-none p-2"
                    rows={3}
                    disabled={isLoading}
                />
                <div className="flex flex-col items-center ml-2 space-y-2">
                    <select
                        value={selectedForm}
                        onChange={(e) => onFormChange(e.target.value as LiteraryForm)}
                        disabled={isLoading}
                        className="p-2 bg-slate-700 text-white rounded-md focus:ring-2 focus:ring-sky-500 focus:outline-none transition duration-200 self-stretch"
                    >
                        {formOptions.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                    <button
                        type="submit"
                        disabled={isLoading || !prompt.trim()}
                        className="p-3 bg-sky-600 text-white rounded-md hover:bg-sky-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all duration-200 flex-shrink-0 w-full"
                        aria-label="Generate text"
                    >
                        {isLoading ? <LoaderIcon className="animate-spin h-6 w-6 mx-auto" /> : <SearchIcon className="h-6 w-6 mx-auto" />}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default QueryInput;