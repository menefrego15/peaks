import React from "react";
import Button from "../Button";

type PaginateProps = {
  page: number;
  setPage: (arg0: number) => void;
  showFavorites: boolean;
  setShowFavorites: (arg0: boolean) => void;
};

const Paginate = ({
  page,
  setPage,
  setShowFavorites,
  showFavorites,
}: PaginateProps) => {
  return (
    <div className="w-full flex justify-center gap-x-10 items-center mb-10">
      <span className="text-white font-bold text-xl" data-testid="current-page">
        {page}
      </span>
      <Button
        disabled={page === 0}
        className="p-2 bg-red-500 uppercase disabled:opacity-50"
        onClick={() => setPage(page === 0 ? page - 0 : page - 1)}
        label="prev"
      />
      <Button
        data-testid="addCount"
        onClick={() => setPage(page + 1)}
        label="next"
      />
      <Button
        data-testid="favorite-btn"
        onClick={() => setShowFavorites(!showFavorites)}
        label={!showFavorites ? "show favorites" : "Don't show favorites"}
      />
    </div>
  );
};

export default Paginate;
