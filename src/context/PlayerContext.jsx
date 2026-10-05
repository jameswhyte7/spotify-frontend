import { createContext, useEffect, useRef, useState } from "react";
import axios from "axios";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();

  const url = 'http://localhost:4000'; // Fixed URL

  const [songsData, setSongsData] = useState([]);
  const [albumsData, setAlbumsData] = useState([]);
  const [track, setTrack] = useState(null); // Initially null
  const [playerStatus, setPlayerStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: { second: 0, minute: 0 },
    totalTime: { second: 0, minute: 0 },
  });

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setPlayerStatus(true);
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setPlayerStatus(false);
    }
  };

  const playwithId = async (id) => {
    if (songsData[id]) {
      await setTrack(songsData[id]);
      await audioRef.current.play();
      setPlayerStatus(true);
    }
  };

  const previous = async () => {
    if (track && track.id > 0) {
      const newTrack = songsData[track.id - 1];
      if (newTrack) {
        await setTrack(newTrack);
        await audioRef.current.play();
        setPlayerStatus(true);
      }
    }
  };

  const next = async () => {
    if (track && track.id < songsData.length - 1) {
      const newTrack = songsData[track.id + 1];
      if (newTrack) {
        await setTrack(newTrack);
        await audioRef.current.play();
        setPlayerStatus(true);
      }
    }
  };

  const seekSong = (e) => {
    if (audioRef.current && seekBg.current && audioRef.current.duration) {
      const clickX = e.nativeEvent.offsetX;
      const totalWidth = seekBg.current.offsetWidth;
      const percent = clickX / totalWidth;
      audioRef.current.currentTime = percent * audioRef.current.duration;
    }
  };

  const getSongsData = async () => {
    try {
      const response = await axios.get(`${url}/api/song/list`);
      const fetchedSongs = response.data.songs || [];
      setSongsData(fetchedSongs);
      if (fetchedSongs.length > 0) {
        setTrack(fetchedSongs[0]);
      }
    } catch (error) {
      console.error("Error fetching songs:", error);
    }
  };

  const getAlbumsData = async () => {
    try {
      const response = await axios.get(`${url}/api/album/list`);
      setAlbumsData(response.data.albums || []);
    } catch (error) {
      console.error("Error fetching albums:", error);
    }
  };

  useEffect(() => {
    if (!audioRef.current) return;

    const handleTimeUpdate = () => {
      if (!seekBar.current || !audioRef.current.duration) return;

      const currentTime = audioRef.current.currentTime;
      const duration = audioRef.current.duration;

      seekBar.current.style.width = `${Math.floor(
        (currentTime / duration) * 100
      )}%`;

      setTime({
        currentTime: {
          second: Math.floor(currentTime % 60),
          minute: Math.floor(currentTime / 60),
        },
        totalTime: {
          second: Math.floor(duration % 60),
          minute: Math.floor(duration / 60),
        },
      });
    };

    audioRef.current.ontimeupdate = handleTimeUpdate;

    return () => {
      audioRef.current.ontimeupdate = null; // Cleanup
    };
  }, [audioRef]);

  useEffect(() => {
    getSongsData();
    getAlbumsData();
  }, []);

  const contextValue = {
    audioRef,
    seekBg,
    seekBar,
    track,
    setTrack,
    playerStatus,
    setPlayerStatus,
    time,
    setTime,
    play,
    pause,
    playwithId,
    next,
    previous,
    seekSong,
    songsData,
    albumsData,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
