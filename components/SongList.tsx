import React from 'react';
import { Song } from '../types';
import { StarIcon, FilledStarIcon, SearchIcon } from './icons';

interface SongListProps {
  songs: Song[];
  favorites: number[];
  onSelectSong: (id: number) => void;
  onToggleFavorite: (id: number) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const highlightText = (text: string, query: string): React.ReactNode => {
  const cleanedQuery = query.trim();
  if (!cleanedQuery) {
    return text;
  }
  const escapedQuery = cleanedQuery.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  const parts = text.split(new RegExp(`(${escapedQuery})`, 'gi'));
  
  return (
    <>
      {parts.map((part, i) => (
        i % 2 === 1 ? (
          <span key={i} className="bg-yellow-200">
            {part}
          </span>
        ) : (
          part
        )
      ))}
    </>
  );
};

const SongList: React.FC<SongListProps> = ({ songs, favorites, onSelectSong, onToggleFavorite, searchQuery, setSearchQuery }) => {
  
  const handleFavoriteClick = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    onToggleFavorite(id);
  }

  return (
    <div className="space-y-4">
      <div className="sticky top-16 z-10 pt-2 pb-4 bg-gray-50">
        <form className="relative" onSubmit={(e) => e.preventDefault()}>
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none" aria-hidden="true">
            <SearchIcon className="w-5 h-5 text-gray-400" />
          </span>
          <input
            type="search"
            placeholder="खोजें (संख्या, शीर्षक, या बोल)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-12 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            aria-label="Search songs"
          />
          <button
            type="submit"
            className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500 hover:text-teal-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500 rounded-r-lg"
            aria-label="Search"
          >
            <SearchIcon className="w-5 h-5" />
          </button>
        </form>
      </div>
      
      {songs.length > 0 ? (
        <ul className="divide-y divide-gray-200">
          {songs.map(song => (
            <li
              key={song.id}
              onClick={() => onSelectSong(song.id)}
              className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-100 transition-colors duration-200 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                 <span className="text-teal-600 font-bold w-8 text-center">{highlightText(song.number, searchQuery)}</span>
                 <span className="font-semibold">{highlightText(song.title, searchQuery)}</span>
              </div>
              <button onClick={(e) => handleFavoriteClick(e, song.id)} className="p-2 rounded-full hover:bg-yellow-100">
                {favorites.includes(song.id) ? (
                  <FilledStarIcon className="w-6 h-6 text-yellow-500" />
                ) : (
                  <StarIcon className="w-6 h-6 text-gray-400" />
                )}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500 mt-8">कोई गीत नहीं मिला।</p>
      )}
    </div>
  );
};

export default SongList;