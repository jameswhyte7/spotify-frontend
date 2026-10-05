import React, { useContext } from "react";
import Navbar from "./Navbar";

import AlbumItem from "./AlbumItem";
import SongItem from "./SongItem";
import { PlayerContext } from "../context/PlayerContext";

const DisplayHome = () => {

  // songsData & albumsData from the Context
  const {songsData, albumsData} = useContext(PlayerContext);

  return (
    <>
      <Navbar />
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Featured Charts</h1>
        <div className="flex overflow-auto">
          {/* AlbumData is one array so using the map method */}
          {/* And parameters are item, index */}
          {albumsData.map((item, index) => (
            <AlbumItem key={index} name={item.name} desc={item.desc} id={item._id} image={item.image}/>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Today's Biggest Hits</h1>
        <div className="flex overflow-auto">
          {/* AlbumData is one array so using the map method */}
          {/* And parameters are item, index */}
          {songsData.map((item, index) => (
            <SongItem key={index} name={item.name} desc={item.desc} id={item._id} image={item.image} />
          ))}
        </div>
      </div>
    </>
  );
};

export default DisplayHome;
