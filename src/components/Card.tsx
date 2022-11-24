import React, { useMemo, useState } from "react";
import { Character } from "../@types/CharactersType";
import Button from "./Button";
import DetailsPopover from "./DetailsPopover";

interface CardProps extends Character {
  handleFavorites: ({ id }: { id: number }) => void;
  isInFavorites: (arg0: number) => boolean;
  index?: number;
}

const Card = ({
  index,
  thumbnail,
  name,
  comics,
  description,
  handleFavorites,
  id,
  isInFavorites,
}: CardProps) => {
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const imageUrl = useMemo(() => {
    return `${thumbnail?.path}/portrait_xlarge.${thumbnail?.extension}`;
  }, [thumbnail?.path, thumbnail?.extension]);

  return (
    <div
      key={id}
      className="w-60 relative h-auto gap-y-4 rounded-2xl flex-col py-2 shadow-lg bg-black flex items-center justify-between"
    >
      {showDetails ? (
        <DetailsPopover
          id={id}
          name={name}
          imageUrl={imageUrl}
          description={description}
          comics={comics}
        />
      ) : null}
      <img
        style={{ width: "90%", height: "240px" }}
        className="rounded-xl object-cover"
        src={imageUrl}
        alt={`${name}-thumbnail`}
      />
      <div className="w-full h-auto flex flex-col justify-center items-center gap-y-2 px-4">
        <button onClick={(e) => setShowDetails(!showDetails)}>
          <span
            data-testid={`character-name-${index}`}
            className="text-xl text-center underline text-white font-bold leading-none"
          >
            {name}
          </span>
        </button>
        <Button
          label={isInFavorites(id) ? "Dislike" : "Like"}
          variant={isInFavorites(id) ? "primary" : "secondary"}
          className="w-full"
          onClick={() => {
            handleFavorites({ id });
          }}
        />
      </div>
    </div>
  );
};

export default Card;
