import React, { useEffect, useRef, useContext } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import DisplayHome from "./DisplayHome";
import DisplayAlbum from "./DisplayAlbum";
import { albumsData } from "../assets/assets";
import { PlayerContext } from "../context/PlayerContext";

const Display = () => {

  const {albumsData} = useContext(PlayerContext);

  const displayRef = useRef();
  const location = useLocation();

  // Determine if the current route is an album page
  const isAlbum = location.pathname.includes("album");

  // Extract albumId and find background color if on an album page
  const albumId = isAlbum ? location.pathname.split('/').pop() : "";
  const bgColor = isAlbum ? albumsData.find((x)=>(x._id == albumId)).bgColor : ""

  useEffect(() => {
    if (isAlbum && bgColor) {
      displayRef.current.style.background = `linear-gradient(${bgColor}, #121212)`;
    } else {
      displayRef.current.style.background = `#121212`;
    }
  }, [isAlbum, bgColor]); // Re-run effect only when `isAlbum` or `bgColor` changes

  return (
    <div
      ref={displayRef}
      className="w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] ml-0"
    >
      <Routes>
        <Route path="/" element={<DisplayHome />} />
        <Route path="/album/:id" element={<DisplayAlbum album={albumsData.find((x) => (x._id == albumId))} />} />
      </Routes>
    </div>
  );
};

export default Display;
