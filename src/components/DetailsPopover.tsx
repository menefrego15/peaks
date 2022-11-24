import React from "react";
import type { Character, ComicSummary } from "../@types/CharactersType";

interface DetailsPopoverProps extends Character {
  imageUrl?: string;
}

const DetailsPopover = (props: DetailsPopoverProps) => {
  const { imageUrl, name, description, comics } = props;
  return (
    <div
      style={{ minWidth: "500px" }}
      className="absolute bottom-0 z-50 transform overflow-hidden left-1/2 rounded-lg -translate-x-1/2 translate-y-full h-auto bg-black"
    >
      <div className="w-full flex relative justify-end">
        <img
          alt={`${name}-thumbnail`}
          className="absolute top-0 left-0 w-1/2 h-full object-cover"
          src={imageUrl}
        />
        <div className="w-1/2">
          <div className="w-full p-10 h-full flex-col text-white text-center font-bold flex justify-center gap-y-10 items-center">
            <span>Name: {name}</span>
            <span>Description: {description?.slice(0, 100)}...</span>
            <span>Comics appearance: {Number(comics?.available)}</span>
            <span>
              First 3 comics:{" "}
              {comics?.items
                ?.slice(comics.items.length - 3, comics?.items?.length)
                .reverse()
                .map((comic: ComicSummary, _i: number) => (
                  <div key={_i}>{comic.name}</div>
                ))}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPopover;
