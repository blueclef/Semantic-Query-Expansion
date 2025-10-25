import React, { useState, useRef } from 'react';
import Header from './components/Header';
import QueryInput from './components/QueryInput';
import StyleControls from './components/StyleControls';
import ResultsDisplay from './components/ResultsDisplay';
import { generateLiteraryText } from './services/geminiService';
import { generatePdf } from './services/pdfService';
import { 
    ResultState, 
    StyleOptions, 
    StyleConfig,
    LiteraryForm,
} from './types';

const App: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<ResultState | null>(null);
    const [literaryForm, setLiteraryForm] = useState<LiteraryForm>('poem');
    const resultsRef = useRef<HTMLDivElement>(null);

    const [styleOptions, setStyleOptions] = useState<StyleOptions>({
        font: 'serif',
        alignment: 'left',
    });

    const [styleConfig, setStyleConfig] = useState<StyleConfig>({
        sentenceComplexity: 'medium',
        lexicalDensity: 'balanced',
        punctuationRhythm: 'medium-comma',
        figurativeFrequency: 'medium',
        tone: 'Neutral'
    });
    
    const handleStyleOptionsChange = (newStyles: Partial<StyleOptions>) => {
        setStyleOptions(prev => ({ ...prev, ...newStyles }));
        if (result) {
            setResult(prev => prev ? { ...prev, styleOptions: { ...prev.styleOptions, ...newStyles } } : null);
        }
    };

    const handleSubmit = async (prompt: string, form: LiteraryForm) => {
        setIsLoading(true);
        setError(null);
        setResult(null);

        try {
            const generatedText = await generateLiteraryText({ prompt, styleConfig, literaryForm: form });
            if (generatedText.startsWith('Error')) {
                throw new Error(generatedText);
            }
            setResult({ text: generatedText, styleOptions });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleExport = () => {
        if (resultsRef.current?.firstChild) {
            generatePdf(resultsRef.current.firstChild as HTMLElement);
        }
    };

    return (
        <div className="bg-slate-900 min-h-screen text-white font-sans">
            <Header />
            <main className="container mx-auto p-4 md:p-8 space-y-8">
                <QueryInput 
                    onSubmit={handleSubmit} 
                    isLoading={isLoading} 
                    selectedForm={literaryForm}
                    onFormChange={setLiteraryForm}
                />
                
                {literaryForm === 'custom' && (
                    <StyleControls 
                        styleConfig={styleConfig}
                        onStyleConfigChange={setStyleConfig}
                        styleOptions={styleOptions}
                        onStyleChange={handleStyleOptionsChange}
                        onExport={handleExport}
                        hasContent={!!result?.text}
                    />
                )}

                <div ref={resultsRef}>
                    <ResultsDisplay result={result} isLoading={isLoading} error={error} />
                </div>
            </main>
        </div>
    );
};

export default App;