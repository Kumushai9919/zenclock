import { useState, useEffect } from 'react';
import { getStudyPlaylists } from '../services/spotifyApi';
import { IoPlaySkipForward, IoPlaySkipBack, IoShuffle } from "react-icons/io5";

const MusicPlayer = () => {
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPlaylistIndex, setCurrentPlaylistIndex] = useState(0);

  useEffect(() => {
    const loadPlaylists = async () => {
      try {
        setLoading(true);
        const fetchedPlaylists = await getStudyPlaylists();
        if (fetchedPlaylists && fetchedPlaylists.length > 0) {
          setPlaylists(fetchedPlaylists);
          setSelectedPlaylist(fetchedPlaylists[0]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPlaylists();
  }, []);

  const nextPlaylist = () => {
    const nextIndex = (currentPlaylistIndex + 1) % playlists.length;
    setCurrentPlaylistIndex(nextIndex);
    setSelectedPlaylist(playlists[nextIndex]);
  };

  const previousPlaylist = () => {
    const prevIndex = (currentPlaylistIndex - 1 + playlists.length) % playlists.length;
    setCurrentPlaylistIndex(prevIndex);
    setSelectedPlaylist(playlists[prevIndex]);
  };

  const shufflePlaylist = () => {
    const randomIndex = Math.floor(Math.random() * playlists.length);
    setCurrentPlaylistIndex(randomIndex);
    setSelectedPlaylist(playlists[randomIndex]);
  };

  if (loading) {
    return <div className="fixed bottom-0 w-full bg-black/80 p-4 text-white">Loading playlists...</div>;
  }

  if (error) {
    return <div className="fixed bottom-0 w-full bg-black/80 p-4 text-white">Error: {error}</div>;
  }

  return (
    <div className="fixed bottom-0 w-full bg-black/80 p-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-2">
          <select 
            value={selectedPlaylist?.id || ''}
            onChange={(e) => {
              const playlist = playlists.find(p => p.id === e.target.value);
              const index = playlists.findIndex(p => p.id === e.target.value);
              setSelectedPlaylist(playlist);
              setCurrentPlaylistIndex(index);
            }}
            className="flex-1 bg-white/10 text-white rounded px-2 py-1"
          >
            <option value="">Select a playlist</option>
            {playlists.map(playlist => (
              <option key={playlist.id} value={playlist.id}>
                {playlist.name}
              </option>
            ))}
          </select>
          
          <div className="flex gap-2">
            <button 
              onClick={previousPlaylist}
              className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all"
              title="Previous playlist"
            >
              <IoPlaySkipBack size={20} />
            </button>
            <button 
              onClick={shufflePlaylist}
              className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all"
              title="Shuffle playlists"
            >
              <IoShuffle size={20} />
            </button>
            <button 
              onClick={nextPlaylist}
              className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all"
              title="Next playlist"
            >
              <IoPlaySkipForward size={20} />
            </button>
          </div>
        </div>
        
        {selectedPlaylist && (
          <iframe
            src={`https://open.spotify.com/embed/playlist/${selectedPlaylist.id}?utm_source=generator`}
            width="100%"
            height="80"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="rounded-lg"
          />
        )}
      </div>
    </div>
  );
};

export default MusicPlayer;