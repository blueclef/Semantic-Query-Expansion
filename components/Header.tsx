
import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="text-center py-6 bg-slate-900 border-b border-slate-700">
            <h1 className="text-4xl font-bold text-sky-400 tracking-wider">
                Literary Expressions AI
            </h1>
            <p className="text-slate-400 mt-2">
                Craft beautiful prose and poetry with the power of Gemini
            </p>
        </header>
    );
};

export default Header;
