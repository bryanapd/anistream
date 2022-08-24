import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://gogoanime.herokuapp.com/' }),
  endpoints: builder => ({
    getPopularAnime: builder.query({
      query: () => 'popular'
    }),
    getRecentRelease: builder.query({
      query: () => 'recent-release'
    }),
    getAnimeSearch: builder.query({
      query: query => `search?keyw=${query}`
    }),
    getAnimeDetails: builder.query({
      query: id => `anime-details/${id}`
    }),
    getAnimeEpisode: builder.query({
      query: id => ({
        url: `https://consumet-api.herokuapp.com/anime/gogoanime/watch/${id}`,
        method: 'GET',
        params: {
          server: 'gogocdn'
        }
      })
    })
  })
})

export const {
  useGetPopularAnimeQuery,
  useGetRecentReleaseQuery,
  useGetAnimeSearchQuery,
  useGetAnimeDetailsQuery,
  useGetAnimeEpisodeQuery
} = apiSlice