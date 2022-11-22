import React, { useEffect } from "react";
import { useQuery } from "react-query";
import Card from "./components/Card";
import Spinner from "./components/Spinner";
import { baseUrl, publicKey } from "./config";
import logo from "./logo.svg";

const App = () => {
  const { isLoading, error, data } = useQuery("marvelCharacters", () =>
    fetch(`${baseUrl}/characters?apikey=${publicKey}`).then((res) => res.json())
  );

  if (isLoading)
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <Spinner />
      </div>
    );

  if (error) {
    if (error instanceof Error) {
      return <h1>An error has occurred: {error.message}</h1>;
    }
  }

  const { data: result } = data;

  return (
    <div className="container w-full h-auto mx-auto">
      <div className="flex justify-center">
        <img src={logo} className="App-logo" alt="logo" />
      </div>
      <div className="w-full h-auto">
        <div className="flex-wrap justify-center flex gap-10">
          {result.results.map((result: any) => (
            <Card
              key={result.id}
              name={result.name}
              image={result.thumbnail.path}
              extension={result.thumbnail.extension}
              comics={result.comics}
              description={result.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
