
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-base-200/50 backdrop-blur-sm border-b border-base-300/50 sticky top-0 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-brand-primary p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
                </svg>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-text-primary">
              Literary Expression Generator
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
