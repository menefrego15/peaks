import React from "react";
import { Character } from "../@types/CharactersType";
import { useCharactersData } from "../hooks/useCharactersData";
import { useLocalStorage } from "../hooks/useLocalStorage";
import Card from "./Card";
import Spinner from "./Spinner";

type CharactersListProps = {
  showFavorites: boolean;
  page: number;
};

const CharactersList = ({ page, showFavorites }: CharactersListProps) => {
  const { isLoading, error, data } = useCharactersData({ page });
  const { data: result } = data || {};
  const [favorites, setFavorites] = useLocalStorage<Character[]>(
    "favorites",
    []
  );

  const handleFavorites = ({ id }: any) => {
    const character = result.results.find(
      (character: Character) => character.id === id
    );
    if (character !== undefined) {
      isInFavorites(id)
        ? setFavorites(favorites.filter((e: Character) => e.id !== id))
        : favorites?.length === 5
        ? alert("You can't have more than 5 characters in favorites")
        : setFavorites([...favorites, character]);
    }
  };

  const isInFavorites = (id: number) => {
    if (favorites.some((e: Character) => e.id === id)) {
      return true;
    }
    return false;
  };

  if (error) {
    if (error instanceof Error) {
      return <h1>An error has occurred: {JSON.stringify(error.message)}</h1>;
    }
  }

  if (isLoading) {
    return (
      <div className="w-full h-full justify-center flex items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex-wrap justify-center flex gap-10">
      {showFavorites && favorites?.length > 0
        ? favorites.map((result: Character, _i: number) => (
            <Card
              key={_i}
              index={_i}
              name={result.name}
              thumbnail={result.thumbnail}
              comics={result.comics}
              description={result.description}
              handleFavorites={handleFavorites}
              id={result.id}
              isInFavorites={isInFavorites}
            />
          ))
        : result.results.map((result: Character, _i: number) => (
            <Card
              key={_i}
              index={_i}
              name={result.name}
              thumbnail={result.thumbnail}
              comics={result.comics}
              description={result.description}
              handleFavorites={handleFavorites}
              id={result.id}
              isInFavorites={isInFavorites}
            />
          ))}
    </div>
  );
};

export default CharactersList;
