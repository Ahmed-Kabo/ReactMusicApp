import { useState, useRef } from "react";
import Nav from "./components/nav";
import Player from "./components/player";
import Song from "./components/song";
import Data from "../src/data";
//import style
import "./styles/App.scss";
import Library from "./components/library";

function App() {
  const [songs, setSongs] = useState(Data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isActiveLibrary, setIsActiveLibrary] = useState(false);
  const audioRef = useRef();

  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animation: 0,
  });

  const timeHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;

    const startTime = Math.round(current);
    const endTime = Math.round(duration);
    const percentage = Math.round((current / duration) * 100);

    console.log(percentage);
    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration,
      animation: percentage,
    });
  };

  //when end music
  const endSong = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    if (isPlaying) audioRef.current.play();
    return;
  };

  return (
    <div className={`App ${isActiveLibrary? "active-body" : ""} ${isPlaying? "active-app" : ""}`}>
      <Nav
        isActiveLibrary={isActiveLibrary}
        setIsActiveLibrary={setIsActiveLibrary}
      />
      <Song
        currentSong={currentSong}
        isPlaying={isPlaying}
        setCurrentSong={setCurrentSong}
      />
      <Player
        audioRef={audioRef}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        songs={songs}
        setSongs={setSongs}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
      />
      <Library
        songs={songs}
        setSongs={setSongs}
        isActiveLibrary={isActiveLibrary}
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
        audioRef={audioRef}
      />
      <audio
        ref={audioRef}
        src={currentSong.audio}
        onTimeUpdate={timeHandler}
        onEnded={endSong}
      ></audio>
    </div>
  );
}

export default App;
