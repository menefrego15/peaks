import React, { useMemo, useState } from "react";

type CardProps = {
  name: string;
  image: string;
  extension: string;
  description: string;
  comics: any;
};

const Card = ({ image, extension, name, comics, description }: CardProps) => {
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const imageUrl = useMemo(() => {
    return `${image}/portrait_xlarge.${extension}`;
  }, [image]);

  return (
    <div className="w-60 relative h-80 rounded-lg border-2 border-[#f0141e]">
      {showDetails ? (
        <div
          style={{ minWidth: "500px" }}
          className="absolute bottom-0 z-50 transform overflow-hidden left-1/2 rounded-lg -translate-x-1/2 translate-y-full h-auto bg-red-500"
        >
          <div className="w-full flex relative justify-end">
            <img
              className="absolute top-0 left-0 w-1/2 h-full object-cover"
              src={imageUrl}
            />
            <div className="w-1/2">
              <div className="w-full p-10 h-full flex-col text-white text-center font-bold flex justify-center gap-y-10 items-center">
                <span>Name: {name}</span>
                <span>Description: {description.slice(0, 100)}...</span>
                <span>Comics appearance: {Number(comics.available)}</span>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <img
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={imageUrl}
      />
      <div className="absolute w-full bottom-0 bg-white left-0 h-10 flex justify-center items-center">
        <button onClick={(e) => setShowDetails(!showDetails)}>
          <span className="text-2xl text-center underline text-black font-bold leading-none">
            {name}
          </span>
        </button>
      </div>
    </div>
  );
};

export default Card;
