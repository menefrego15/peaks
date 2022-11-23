import React from "react";
import logo from "../../logo.svg";

const Navbar = ({ page, setPage, setShowFavorites, showFavorites }: any) => {
  return (
    <div>
      <div className="flex justify-center">
        <img src={logo} className="App-logo" alt="logo" />
      </div>
      <div className="w-full flex justify-center gap-x-10 items-center mb-10">
        <span
          className="text-white font-bold text-xl"
          data-testid="current-page"
        >
          {page}
        </span>
        <button
          disabled={page === 0}
          className="p-2 bg-red-500 uppercase disabled:opacity-50"
          onClick={() => setPage(page === 0 ? page - 0 : page - 1)}
        >
          prev
        </button>
        <button
          data-testid="addCount"
          className="p-2 bg-red-500 uppercase"
          onClick={() => setPage(page + 1)}
        >
          next
        </button>
        <button
          className="p-2 bg-red-500 uppercase"
          data-testid="favorite-btn"
          onClick={() => setShowFavorites(!showFavorites)}
        >
          {!showFavorites ? "show favorites" : "Don't show favorites"}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
