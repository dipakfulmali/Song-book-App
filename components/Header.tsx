
import React from 'react';
import { BackIcon } from './icons';

interface HeaderProps {
  showBackButton: boolean;
  onBack: () => void;
  songTitle?: string;
  songNumber?: string;
}

const Header: React.FC<HeaderProps> = ({ showBackButton, onBack, songTitle, songNumber }) => {
  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4 h-16">
        <div className="flex items-center space-x-4">
          {showBackButton ? (
            <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-200 transition-colors">
              <BackIcon className="w-6 h-6" />
            </button>
          ) : (
             <h1 className="text-xl font-bold text-teal-600">सिय्योन के गीत</h1>
          )}
        </div>
        
        {showBackButton && songTitle && (
            <div className="flex-1 min-w-0 text-center">
                <h2 className="text-lg font-bold truncate">{songNumber && `${songNumber}. `}{songTitle}</h2>
            </div>
        )}

        <div className="w-10"> {/* Spacer to balance the back button */}
        </div>
      </div>
    </header>
  );
};

export default Header;
