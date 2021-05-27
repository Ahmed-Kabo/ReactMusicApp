import LibrarySong from "./librarySong";

const Library = ({
  songs,
  isPlaying,
  isActiveLibrary,
  setCurrentSong,
  setSongs,
  audioRef
}) => {
  return (
    <div className={`library  ${isActiveLibrary ? "active-library" : ""}`}>
      <h1>your library</h1>

      {songs.map((song) => (
        <LibrarySong
          song={song}
          songs={songs}
          cover={song.cover}
          name={song.name}
          artist={song.artist}
          active={song.active}
          key={song.id}
          id={song.id}
          setCurrentSong={setCurrentSong}
          setSongs={setSongs}
          isPlaying={isPlaying}
          audioRef={audioRef}
        />
      ))}
    </div>
  );
};
export default Library;
