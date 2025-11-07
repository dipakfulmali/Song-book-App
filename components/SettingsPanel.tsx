
import React from 'react';
import { SunIcon, MoonIcon, PlusIcon, MinusIcon } from './icons';

interface SettingsPanelProps {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
    increaseFontSize: () => void;
    decreaseFontSize: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ theme, toggleTheme, increaseFontSize, decreaseFontSize }) => {
    return (
        <div className="fixed bottom-4 right-4 z-20 flex flex-col items-center space-y-2">
            <div className="flex bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700">
                <button onClick={decreaseFontSize} className="p-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-l-full transition-colors">
                    <MinusIcon className="w-5 h-5" />
                </button>
                <div className="w-px bg-gray-200 dark:bg-gray-700"></div>
                <button onClick={increaseFontSize} className="p-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-r-full transition-colors">
                    <PlusIcon className="w-5 h-5" />
                </button>
            </div>
            <button 
                onClick={toggleTheme} 
                className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle theme"
            >
                {theme === 'light' ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
            </button>
        </div>
    );
};

export default SettingsPanel;
