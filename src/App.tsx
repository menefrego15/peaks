import { useState } from "react";
import Card from "./components/Card";
import Navbar from "./components/Navbar/Navbar";
import Spinner from "./components/Spinner";
import { useCharactersData } from "./hooks/useCharactersData";
import { useLocalStorage } from "./hooks/useLocalStorage";

const App = () => {
  const [page, setPage] = useState<number>(0);
  const [favorites, setFavorites] = useLocalStorage<any>("favorites", []);
  const [showFavorites, setShowFavorites] = useState<boolean>(false);

  const { isLoading, error, data } = useCharactersData({ page });

  if (error) {
    if (error instanceof Error) {
      return <h1>An error has occurred: {JSON.stringify(error.message)}</h1>;
    }
  }

  const { data: result } = data || {};

  const handleFavorites = ({ id }: any) => {
    const character = result.results.find(
      (character: any) => character.id === id
    );
    isInFavorites(id)
      ? setFavorites(favorites.filter((e: any) => e.id !== id))
      : favorites?.length === 5
      ? alert("You can't have more than 5 characters in favorites")
      : setFavorites([...favorites, character]);
  };

  const isInFavorites = (id: any) => {
    if (favorites.some((e: any) => e.id === id)) {
      return true;
    }
    return false;
  };

  return (
    <div className="max-w-screen h-auto">
      <Navbar
        page={page}
        setPage={setPage}
        setShowFavorites={setShowFavorites}
        showFavorites={showFavorites}
      />
      <div className="w-full h-auto flex p-20 justify-center">
        {isLoading ? (
          <div className="w-full h-full justify-center flex items-center">
            <Spinner />
          </div>
        ) : (
          <div className="flex-wrap justify-center flex gap-10">
            {showFavorites
              ? favorites.map((result: any, _i: number) => (
                  <Card
                    key={result.id}
                    index={_i}
                    name={result.name}
                    image={result.thumbnail.path}
                    extension={result.thumbnail.extension}
                    comics={result.comics}
                    description={result.description}
                    handleFavorites={handleFavorites}
                    id={result.id}
                    isInFavorites={isInFavorites}
                  />
                ))
              : result.results.map((result: any, _i: number) => (
                  <Card
                    key={result.id}
                    index={_i}
                    name={result.name}
                    image={result.thumbnail.path}
                    extension={result.thumbnail.extension}
                    comics={result.comics}
                    description={result.description}
                    handleFavorites={handleFavorites}
                    id={result.id}
                    isInFavorites={isInFavorites}
                  />
                ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
