
import React from 'react';
import { ResultState, FontStyle, Alignment } from '../types';

interface ResultsDisplayProps {
    result: ResultState | null;
    isLoading: boolean;
    error: string | null;
}

const fontClasses: { [key in FontStyle]: string } = {
    serif: 'font-serif',
    'sans-serif': 'font-sans',
    monospace: 'font-mono',
};

const alignmentClasses: { [key in Alignment]: string } = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
};

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result, isLoading, error }) => {
    if (isLoading) {
        return (
            <div className="w-full max-w-2xl mx-auto p-8 bg-slate-800 rounded-lg shadow-md text-center text-slate-400">
                Generating your masterpiece...
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full max-w-2xl mx-auto p-8 bg-red-900/50 border border-red-700 rounded-lg shadow-md text-center text-red-300">
                {error}
            </div>
        );
    }
    
    if (!result || !result.text) {
        return (
            <div className="w-full max-w-2xl mx-auto p-8 bg-slate-800 rounded-lg shadow-md text-center text-slate-400">
                Your generated literary expression will appear here.
            </div>
        );
    }

    const { text, styleOptions } = result;
    const fontClass = fontClasses[styleOptions.font];
    const alignmentClass = alignmentClasses[styleOptions.alignment];

    return (
        <div 
            className={`w-full max-w-2xl mx-auto p-8 bg-slate-800 rounded-lg shadow-md text-slate-200 transition-all duration-300 ${fontClass} ${alignmentClass}`}
        >
            <pre className="whitespace-pre-wrap break-words text-lg leading-relaxed">
                {text}
            </pre>
        </div>
    );
};

export default ResultsDisplay;
