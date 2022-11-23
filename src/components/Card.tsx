import React, { useMemo, useState } from "react";

type CardProps = {
  name: string;
  image: string;
  extension: string;
  description: string;
  comics: any;
  handleFavorites: any;
  id: number;
  isInFavorites: any;
  index: number;
};

const Card = ({
  index,
  image,
  extension,
  name,
  comics,
  description,
  handleFavorites,
  id,
  isInFavorites,
}: CardProps) => {
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const imageUrl = useMemo(() => {
    return `${image}/portrait_xlarge.${extension}`;
  }, [image, extension]);

  return (
    <div className="w-60 relative h-80 rounded-lg border-2 border-[#f0141e]">
      <div
        onClick={() => handleFavorites({ id })}
        className="absolute bottom-0 z-20 top-4 left-4 cursor-pointer h-8"
      >
        {isInFavorites(id) ? (
          <svg
            width="30"
            height="30"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.5 11.6667V10H19.1666V11.6667H12.5ZM9.16665 17.5L6.52081 15.125C5.52081 14.2222 4.66331 13.4167 3.94831 12.7083C3.23276 12 2.64248 11.3333 2.17748 10.7083C1.71192 10.0833 1.37165 9.47917 1.15665 8.89583C0.941091 8.3125 0.833313 7.70139 0.833313 7.0625C0.833313 5.75694 1.27081 4.67 2.14581 3.80167C3.02081 2.93389 4.11109 2.5 5.41665 2.5C6.13887 2.5 6.82637 2.64917 7.47915 2.9475C8.13192 3.24639 8.69442 3.67361 9.16665 4.22917C9.63887 3.67361 10.2014 3.24639 10.8541 2.9475C11.5069 2.64917 12.1944 2.5 12.9166 2.5C14.0972 2.5 15.0866 2.8575 15.885 3.5725C16.6839 4.28806 17.1805 5.125 17.375 6.08333C17.125 5.98611 16.875 5.91306 16.625 5.86417C16.375 5.81583 16.1319 5.79167 15.8958 5.79167C14.493 5.79167 13.2986 6.28111 12.3125 7.26C11.3264 8.23944 10.8333 9.43056 10.8333 10.8333C10.8333 11.5556 10.9791 12.2394 11.2708 12.885C11.5625 13.5311 11.9722 14.0833 12.5 14.5417C12.2361 14.7778 11.8922 15.08 11.4683 15.4483C11.045 15.8161 10.6805 16.1389 10.375 16.4167L9.16665 17.5Z"
              fill="#FFFFFF"
              stroke="#f0141e"
            />
          </svg>
        ) : (
          <svg
            width="30"
            height="30"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 14.1667V11.6667H12.5V10H15V7.5H16.6666V10H19.1666V11.6667H16.6666V14.1667H15ZM9.16665 17.5L6.52081 15.125C5.52081 14.2222 4.66331 13.4167 3.94831 12.7083C3.23276 12 2.64248 11.3333 2.17748 10.7083C1.71192 10.0833 1.37165 9.47917 1.15665 8.89583C0.941091 8.3125 0.833313 7.70139 0.833313 7.0625C0.833313 5.75694 1.27081 4.67 2.14581 3.80167C3.02081 2.93389 4.11109 2.5 5.41665 2.5C6.13887 2.5 6.82637 2.64917 7.47915 2.9475C8.13192 3.24639 8.69442 3.67361 9.16665 4.22917C9.63887 3.67361 10.2014 3.24639 10.8541 2.9475C11.5069 2.64917 12.1944 2.5 12.9166 2.5C14.0972 2.5 15.0866 2.8575 15.885 3.5725C16.6839 4.28806 17.1805 5.125 17.375 6.08333C17.125 5.98611 16.875 5.91306 16.625 5.86417C16.375 5.81583 16.1319 5.79167 15.8958 5.79167C14.493 5.79167 13.2986 6.28111 12.3125 7.26C11.3264 8.23944 10.8333 9.43056 10.8333 10.8333C10.8333 11.5556 10.9791 12.2394 11.2708 12.885C11.5625 13.5311 11.9722 14.0833 12.5 14.5417C12.2361 14.7778 11.8922 15.08 11.4683 15.4483C11.045 15.8161 10.6805 16.1389 10.375 16.4167L9.16665 17.5Z"
              fill="#FFFFFF"
              stroke="#f0141e"
            />
          </svg>
        )}
      </div>
      {showDetails ? (
        <div
          style={{ minWidth: "500px" }}
          className="absolute bottom-0 z-50 transform overflow-hidden left-1/2 rounded-lg -translate-x-1/2 translate-y-full h-auto bg-red-500"
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
                <span>Description: {description.slice(0, 100)}...</span>
                <span>Comics appearance: {Number(comics.available)}</span>
                <span>
                  First 3 comics:{" "}
                  {comics.items
                    .slice(comics.items.length - 3, comics.items.length)
                    .reverse()
                    .map((comic: any, _i: number) => (
                      <div key={_i}>{comic.name}</div>
                    ))}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <img
        className="absolute top-0 left-0 w-full rounded-md h-full object-cover"
        src={imageUrl}
        alt={`${name}-thumbnail`}
      />
      <div className="absolute w-full bottom-0 bg-[#111111] rounded-b-md left-0 h-10 flex justify-center items-center">
        <button onClick={(e) => setShowDetails(!showDetails)}>
          <span
            data-testid={`character-name-${index}`}
            className="text-xl text-center underline text-white font-bold leading-none"
          >
            {name}
          </span>
        </button>
      </div>
    </div>
  );
};

export default Card;
