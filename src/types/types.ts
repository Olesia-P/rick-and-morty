export type EpisodesData = {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: null | string;
  };
  results: SingleEpisode[];
};

export type CharactersData = {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: null | string;
  };
  results: SingleCharacter[];
};

export type LocationsData = {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: null | string;
  };
  results: SingleLocation[];
};

export type SingleLocation = {
  id: number;
  name: string;
  type: string;
  dimension: string;
};

export type SingleEpisode = {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
};

export type SingleCharacter = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
};

export type CharactersState = {
  charactersParams: {
    name: string;
    gender: string;
    status: string;
    page: string;
  };
};
