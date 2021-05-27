import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";
const Player = ({
  currentSong,
  setCurrentSong,
  audioRef,
  isPlaying,
  setIsPlaying,
  songs,
  setSongs,
  songInfo,
  setSongInfo,
}) => {
  /******************************************************
  =========function  components for time  control  =======
  ******************************************************/
  const onInputChange = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  function getTime(time) {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  }

  //style input 

  const colorStyle = {
    transform : `translateX(${songInfo.animation}%)`
  }
  /******************************************************
  =========function  components for play control  =======
  ******************************************************/
  //play music function
  const playSong = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };
  //function active state for play music when skip

  const activeLibraryWhenSkip = (nextPrev) => {
    //to make active when i go to nex song
    const newSong = songs.map((song) => {
      if (song.id === nextPrev.id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });
    setSongs(newSong);
  };
  //skip function back and forward
  const skipTrackHandler = async (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "skip-forward") {
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
      activeLibraryWhenSkip(songs[(currentIndex + 1) % songs.length]);
    }
    if (direction === "skip-back") {
      if ((currentIndex - 1) % songs.length === -1) {
        await setCurrentSong(songs[songs.length - 1]);
        activeLibraryWhenSkip(songs[songs.length - 1]);

        return;
      }
      await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
      activeLibraryWhenSkip(songs[(currentIndex - 1) % songs.length]);
    }
    if (isPlaying) audioRef.current.play();
  };

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div className="track" style={{background:`linear-gradient(to right ,${currentSong.color[0]},${currentSong.color[1]} )`}} >
          <input
            type="range"
            onChange={onInputChange}
            value={songInfo.currentTime}
            min={0}
            max={songInfo.duration}
          />
          <div className="track-animation" style={colorStyle}> </div>
        </div>
        <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          size="2x"
          icon={faAngleLeft}
          onClick={() => skipTrackHandler("skip-back")}
        />
        <FontAwesomeIcon
          size="2x"
          icon={!isPlaying ? faPlay : faPause}
          onClick={playSong}
        />
        <FontAwesomeIcon
          size="2x"
          icon={faAngleRight}
          onClick={() => skipTrackHandler("skip-forward")}
        />
      </div>
    </div>
  );
};
export default Player;
