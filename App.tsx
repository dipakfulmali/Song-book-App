
import React, { useState, useMemo } from 'react';
import { Song } from './types';
import { songs } from './data/songs';
import { useLocalStorage } from './hooks/useLocalStorage';
import Header from './components/Header';
import SongList from './components/SongList';
import SongDetail from './components/SongDetail';

const App: React.FC = () => {
  const [selectedSongId, setSelectedSongId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useLocalStorage<number[]>('favorites', []);

  const filteredSongs = useMemo(() => {
    const cleanedQuery = searchQuery.toLowerCase().trim();
    if (!cleanedQuery) {
      return songs;
    }
    return songs.filter(song =>
      song.number.includes(cleanedQuery) ||
      song.title.toLowerCase().includes(cleanedQuery) ||
      song.lyrics.toLowerCase().includes(cleanedQuery)
    );
  }, [searchQuery]);

  const selectedSong = useMemo(() => {
    return songs.find(song => song.id === selectedSongId) || null;
  }, [selectedSongId]);

  const handleSelectSong = (id: number) => {
    setSelectedSongId(id);
  };

  const handleGoBack = () => {
    setSelectedSongId(null);
  };

  const toggleFavorite = (id: number) => {
    setFavorites(prevFavorites =>
      prevFavorites.includes(id)
        ? prevFavorites.filter(favId => favId !== id)
        : [...prevFavorites, id]
    );
  };

  return (
    <div className={`min-h-screen bg-gray-50 text-gray-800`}>
      <Header 
        showBackButton={!!selectedSong} 
        onBack={handleGoBack}
        songTitle={selectedSong?.title}
        songNumber={selectedSong?.number}
      />
      <main className="container mx-auto p-4 pb-24">
        {selectedSong ? (
          <SongDetail 
            song={selectedSong} 
            isFavorite={favorites.includes(selectedSong.id)}
            onToggleFavorite={() => toggleFavorite(selectedSong.id)}
            searchQuery={searchQuery}
          />
        ) : (
          <SongList
            songs={filteredSongs}
            favorites={favorites}
            onSelectSong={handleSelectSong}
            onToggleFavorite={toggleFavorite}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}
      </main>
    </div>
  );
};

export default App;