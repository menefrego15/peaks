import { useMemo, useState } from "react";
import CharactersList from "./components/CharactersList";
import Navbar from "./components/Navbar";
import Paginate from "./components/Paginate/Paginate";

const App = () => {
  const [page, setPage] = useState<number>(0);
  const [showFavorites, setShowFavorites] = useState<boolean>(false);

  const navbar = useMemo(() => <Navbar />, []);

  return (
    <div className="max-w-screen h-auto">
      {navbar}
      <div className="w-full flex-col h-auto flex p-20 justify-center">
        <Paginate
          setPage={setPage}
          page={page}
          setShowFavorites={setShowFavorites}
          showFavorites={showFavorites}
        />
        <CharactersList page={page} showFavorites={showFavorites} />
      </div>
    </div>
  );
};

export default App;
