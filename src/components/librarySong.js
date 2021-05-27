const LibrarySong = ({
  audioRef,
  isPlaying,
  songs,
  setSongs,
  cover,
  name,
  artist,
  song,
  setCurrentSong,
  id,
}) => {
  const onClickLibrarySong = () => {
    setCurrentSong(song);
    const newSongActive = songs.map((song) => {
      if (song.id === id) {
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
    setSongs(newSongActive);
    if (isPlaying) audioRef.current.play();
  };

  return (
    <div
      className={`library-song ${song.active ? "active-song" : ""}`}
      onClick={onClickLibrarySong}
    >
      <img
        src={cover}
        alt={name}
        
      />
      <div className="library-song__data">
        <h3>{name}</h3>
        <h4>{artist}</h4>
      </div>
    </div>
  );
};
export default LibrarySong;
