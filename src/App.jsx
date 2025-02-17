import Timer from './components/Timer';
import BackgroundImage from './components/BackgroundImage';
import MusicPlayer from './components/MusicPlayer';

function App() {
  return (
    <div className="min-h-screen">
      <BackgroundImage />
      <Timer />
      <MusicPlayer />
    </div>
  );
}

export default App;
