import React, { useState } from 'react';
import { 
    FontStyle, 
    Alignment, 
    StyleOptions, 
    StyleConfig, 
    SentenceComplexity, 
    LexicalDensity, 
    PunctuationRhythm, 
    FigurativeFrequency,
    StylePreset
} from '../types';

interface StyleControlsProps {
    styleConfig: StyleConfig;
    onStyleConfigChange: (config: StyleConfig) => void;
    styleOptions: StyleOptions;
    onStyleChange: (newStyles: Partial<StyleOptions>) => void;
    onExport: () => void;
    hasContent: boolean;
}

const presets: StylePreset[] = [
    {
        name: 'Hemingway',
        config: {
            sentenceComplexity: 'low',
            lexicalDensity: 'high-noun-verb',
            punctuationRhythm: 'low-comma',
            figurativeFrequency: 'low',
            tone: 'Direct, concise, objective, detached'
        }
    },
    {
        name: 'Murakami',
        config: {
            sentenceComplexity: 'high',
            lexicalDensity: 'balanced',
            punctuationRhythm: 'medium-comma',
            figurativeFrequency: 'high',
            tone: 'Surreal, melancholic, contemplative, conversational'
        }
    },
    {
        name: 'Marquez',
        config: {
            sentenceComplexity: 'high',
            lexicalDensity: 'high-adj-adv',
            punctuationRhythm: 'high-comma',
            figurativeFrequency: 'high',
            tone: 'Magical realism, epic, multi-generational, sensory'
        }
    }
];

const StyleControls: React.FC<StyleControlsProps> = ({
    styleConfig,
    onStyleConfigChange,
    styleOptions,
    onStyleChange,
    onExport,
    hasContent,
}) => {
    const [activeTab, setActiveTab] = useState('generation');

    const handlePresetClick = (preset: StylePreset) => {
        onStyleConfigChange(preset.config);
    };

    const handleStyleConfigFieldChange = <K extends keyof StyleConfig>(field: K, value: StyleConfig[K]) => {
        onStyleConfigChange({ ...styleConfig, [field]: value });
    };

    const renderGenerationControls = () => (
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Style Presets</label>
                <div className="flex flex-wrap gap-2">
                    {presets.map(p => (
                        <button key={p.name} onClick={() => handlePresetClick(p)} className="px-3 py-1.5 bg-slate-600 text-white text-sm font-semibold rounded-md hover:bg-sky-600 transition duration-200">
                            {p.name}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Granular Controls */}
                <ControlSelect label="Sentence Complexity" value={styleConfig.sentenceComplexity} onChange={e => handleStyleConfigFieldChange('sentenceComplexity', e.target.value as SentenceComplexity)}>
                    <option value="low">Low (Short, Direct)</option>
                    <option value="medium">Medium (Varied)</option>
                    <option value="high">High (Long, Complex)</option>
                </ControlSelect>
                <ControlSelect label="Lexical Density" value={styleConfig.lexicalDensity} onChange={e => handleStyleConfigFieldChange('lexicalDensity', e.target.value as LexicalDensity)}>
                    <option value="high-noun-verb">Nouns/Verbs (Concise)</option>
                    <option value="balanced">Balanced</option>
                    <option value="high-adj-adv">Adjectives/Adverbs (Descriptive)</option>
                </ControlSelect>
                 <ControlSelect label="Punctuation Rhythm" value={styleConfig.punctuationRhythm} onChange={e => handleStyleConfigFieldChange('punctuationRhythm', e.target.value as PunctuationRhythm)}>
                    <option value="low-comma">Low (Minimal)</option>
                    <option value="medium-comma">Medium (Standard)</option>
                    <option value="high-comma">High (Complex)</option>
                </ControlSelect>
                <ControlSelect label="Figurative Frequency" value={styleConfig.figurativeFrequency} onChange={e => handleStyleConfigFieldChange('figurativeFrequency', e.target.value as FigurativeFrequency)}>
                    <option value="low">Low (Subtle)</option>
                    <option value="medium">Medium</option>
                    <option value="high">High (Elaborate)</option>
                </ControlSelect>
            </div>
             <div>
                <label htmlFor="tone-input" className="block text-sm font-medium text-slate-400 mb-1">Tone</label>
                <input
                    id="tone-input"
                    type="text"
                    value={styleConfig.tone}
                    onChange={e => handleStyleConfigFieldChange('tone', e.target.value)}
                    className="w-full p-2 bg-slate-700 text-white rounded-md focus:ring-2 focus:ring-sky-500 focus:outline-none transition duration-200"
                    placeholder="e.g., Joyful, Ominous, Detached"
                />
            </div>
        </div>
    );
    
    const renderFormattingControls = () => (
        <div className="flex items-end justify-between gap-4">
            <div className="flex items-center gap-4">
                <ControlSelect label="Font" value={styleOptions.font} onChange={e => onStyleChange({ font: e.target.value as FontStyle })} disabled={!hasContent}>
                    <option value="serif">Serif</option>
                    <option value="sans-serif">Sans-Serif</option>
                    <option value="monospace">Monospace</option>
                </ControlSelect>
                <ControlSelect label="Alignment" value={styleOptions.alignment} onChange={e => onStyleChange({ alignment: e.target.value as Alignment })} disabled={!hasContent}>
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                </ControlSelect>
            </div>
            <button
                onClick={onExport}
                disabled={!hasContent}
                className="px-4 py-2 bg-emerald-600 text-white font-semibold rounded-md hover:bg-emerald-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition duration-200 self-end"
            >
                Export as PDF
            </button>
        </div>
    );

    return (
        <div className="p-4 bg-slate-800 rounded-lg shadow-md w-full max-w-2xl mx-auto">
            <div className="border-b border-slate-700 mb-4">
                <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                    <TabButton name="Generation Style" activeTab={activeTab} onClick={() => setActiveTab('generation')} />
                    <TabButton name="Formatting" activeTab={activeTab} onClick={() => setActiveTab('formatting')} />
                </nav>
            </div>
            <div>
                {activeTab === 'generation' ? renderGenerationControls() : renderFormattingControls()}
            </div>
        </div>
    );
};

const TabButton: React.FC<{name: string, activeTab: string, onClick: () => void}> = ({name, activeTab, onClick}) => {
    const isActive = name.toLowerCase().replace(' ', '-') === activeTab;
    return (
        <button
            onClick={onClick}
            className={`${
                isActive
                ? 'border-sky-500 text-sky-400'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-400'
            } whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors duration-200 focus:outline-none`}
        >
            {name}
        </button>
    );
}

const ControlSelect: React.FC<React.PropsWithChildren<React.SelectHTMLAttributes<HTMLSelectElement> & {label: string}>> = ({label, children, ...props}) => (
    <div>
        <label htmlFor={`${label}-select`} className="block text-sm font-medium text-slate-400 mb-1">{label}</label>
        <select
            id={`${label}-select`}
            className="w-full p-2 bg-slate-700 text-white rounded-md focus:ring-2 focus:ring-sky-500 focus:outline-none transition duration-200 disabled:opacity-50"
            {...props}
        >
            {children}
        </select>
    </div>
);


export default StyleControls;