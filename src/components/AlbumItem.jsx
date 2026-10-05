import React from "react";
import { useNavigate } from "react-router-dom";

// using props to pull data from albumsData in assets
const AlbumItem = ({ image, name, desc, id }) => {
  const navigate = useNavigate();

  return (
    // using template literal to provide the route, and using the id
    <div
      onClick={() => navigate(`/album/${id}`)}
      className="min-w-[180px] p-3 rounded cursor-pointer hover:bg-[#ffffff26]"
    >
      <img
        src={image}
        alt={name}
        className="w-56 h-56 object-cover rounded-md shadow-md"
      />
      <p className="font-bold mt-2 mb-1">{name}</p>
      <p className="text-slate-200 text-sm">{desc}</p>
    </div>
  );
};

export default AlbumItem;
