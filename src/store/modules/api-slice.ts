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

    // getProducts: builder.query({
    //   query: ({ category, filter }) => {
    //     return {
    //       url: category === "" ? "products" : `products/category/${category}`,
    //       params: {
    //         limit: filter.limit,
    //         // sort: filter.alphabet,
    //         // api stopped filtering by alphabet
    //         // alphabet sorting is now implemented in transformResponse
    //       },
    //     };
    //   },
    // }),
  }),
});

export const { useGetEpisodesOnePageQuery, useGetOneCharacterQuery } =
  rickMortyRestApi;