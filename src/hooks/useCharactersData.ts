import { useQuery } from "react-query";
import { baseUrl, publicKey } from "../config";

const fetchCharacters = async (page = 0) => {
  const paginate = 100 + page * 10;
  const res = await fetch(
    `${baseUrl}/v1/public/characters?offset=${paginate}&apikey=${publicKey}`
  );
  return await res.json();
};

export function useCharactersData({ page }: { page: number }) {
  return useQuery({
    queryKey: ["marvelCharacters", page],
    queryFn: () => fetchCharacters(page),
  });
}
