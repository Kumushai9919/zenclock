import { useState, useEffect } from 'react';
import { getRandomImage } from '../services/pixabayApi';
import { IoRefreshOutline } from "react-icons/io5"; // Refresh icon
import { IoExpandOutline, IoContractOutline } from "react-icons/io5"; // Expand/Contract icons

const BackgroundImage = () => {
  const [backgroundUrl, setBackgroundUrl] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const loadImage = async () => {
    const imageUrl = await getRandomImage();
    console.log('Loaded image:', imageUrl);
    setBackgroundUrl(imageUrl);
  };

  useEffect(() => {
    loadImage();
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <>
      <div 
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: `url(${backgroundUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/50" /> {/* Overlay */}
      </div>

      <div className="fixed top-4 right-4 flex gap-2">
        <button 
          onClick={loadImage}
          className="p-2 bg-black/30 hover:bg-black/50 text-white rounded-full transition-all duration-300 backdrop-blur-sm"
          title="Change background"
        >
          <IoRefreshOutline size={24} />
        </button>
        <button 
          onClick={toggleFullscreen}
          className="p-2 bg-black/30 hover:bg-black/50 text-white rounded-full transition-all duration-300 backdrop-blur-sm"
          title="Toggle fullscreen"
        >
          {isFullscreen ? <IoContractOutline size={24} /> : <IoExpandOutline size={24} />}
        </button>
      </div>
    </>
  );
};

export default BackgroundImage;