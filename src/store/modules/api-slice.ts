import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const rickMortyRestApi = createApi({
  reducerPath: "rickMortyRestApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://rickandmortyapi.com/api" }),
  endpoints: (builder) => ({
    getEpisodesOnePage: builder.query({
      query: (pageNumber) => {
        return {
          url: "episode",
          params: {
            page: pageNumber,
          },
        };
      },
    }),
    getOneCharacter: builder.query({
      query: (charactersIds) => {
        return {
          url: `character/${charactersIds}`,
        };
      },
    }),
    getCharactersOnePage: builder.query({
      query: ({ name, gender, status, page }) => {
        return {
          url: "character",
          params: {
            name: name,
            gender: gender,
            status: status,
            page: page,
          },
        };
      },
    }),
  }),
});

export const {
  useGetEpisodesOnePageQuery,
  useGetOneCharacterQuery,
  useGetCharactersOnePageQuery,
} = rickMortyRestApi;
