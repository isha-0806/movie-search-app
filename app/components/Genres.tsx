import React from "react";

const Genres: React.FC<Genres> = ({ index, name, length }) => {
  return (
    <div className="flex gap-4 text-textColor hover:text-white cursor-pointer">
      <div>{name}</div>
      <div className="text-text-color">{index + 1 !== length ? "/" : ""}</div>
    </div>
  );
};

export default Genres;
