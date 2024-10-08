import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const rickMortyRestApi = createApi({
  reducerPath: 'rickMortyRestApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://rickandmortyapi.com/api' }),
  endpoints: (builder) => ({
    getEpisodesOnePage: builder.query({
      query: (pageNumber) => {
        return {
          url: 'episode',
          params: {
            page: pageNumber,
          },
        };
      },
    }),
    getMultipleCharacters: builder.query({
      query: (charactersIds) => {
        return {
          url: `character/${charactersIds}`,
        };
      },
    }),
    getCharactersOnePage: builder.query({
      query: ({ name, gender, status, page }) => {
        return {
          url: 'character',
          params: {
            name,
            gender,
            status,
            page,
          },
        };
      },
    }),
  }),
});

export const {
  useGetEpisodesOnePageQuery,
  useGetMultipleCharactersQuery,
  useGetCharactersOnePageQuery,
} = rickMortyRestApi;
