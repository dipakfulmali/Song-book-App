
import React from 'react';
import { Song } from '../types';
import { StarIcon, FilledStarIcon } from './icons';

interface SongDetailProps {
  song: Song;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  searchQuery: string;
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

const SongDetail: React.FC<SongDetailProps> = ({ song, isFavorite, onToggleFavorite, searchQuery }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
       <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold text-teal-700">{highlightText(song.title, searchQuery)}</h1>
          <p className="text-xl text-gray-500">गीत संख्या: {highlightText(song.number, searchQuery)}</p>
        </div>
        <button onClick={onToggleFavorite} className="p-3 rounded-full hover:bg-yellow-100 transition-colors">
          {isFavorite ? (
            <FilledStarIcon className="w-7 h-7 text-yellow-500" />
          ) : (
            <StarIcon className="w-7 h-7 text-gray-400" />
          )}
        </button>
      </div>
      <div className="whitespace-pre-wrap leading-loose text-gray-700">
        {highlightText(song.lyrics, searchQuery)}
      </div>
    </div>
  );
};

export default SongDetail;