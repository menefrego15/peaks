export type Image = {
  path?: string;
  extension?: string;
};

export type ComicSummary = {
  resourceURI?: string;
  name?: string;
};

export type ComicsList = {
  available?: number;
  returned?: number;
  collectionURI?: string;
  items?: Array<ComicSummary>;
};

export type Character = {
  id: number;
  name?: string;
  description?: string;
  thumbnail?: Image;
  comics?: ComicsList;
};
