import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://consumet-api.herokuapp.com/' }),
  endpoints: builder => ({
    getPopularAnime: builder.query({
      query: () => 'meta/anilist/popular'
    }),
    getTrendingAnime: builder.query({
      query: () => 'meta/anilist/trending'
    }),
    getRecentRelease: builder.query({
      query: () => 'recent-release'
    }),
    getAnimeSearch: builder.query({
      query: query => `meta/anilist/${query}`
    }),
    getRecentEpisodes: builder.query({
      query: () => ({
        url: 'meta/anilist/recent-episodes',
        params: {
          provider: 'zoro'
        }
      })
    }),
    getAnimeDetailsById: builder.query({
      query: id => ({
        url: `meta/anilist/info/${id}`,
        params: {
          provider: 'zoro'
        }
      })
    }),
    getAnimeEpisodeById: builder.query({
      query: id => ({
        url: `meta/anilist/watch/${id}`,
        method: 'GET',
        params: {
          provider: 'zoro'
        }
      })
    })
  })
})

export const {
  useGetPopularAnimeQuery,
  useGetTrendingAnimeQuery,
  useGetAnimeSearchQuery,
  useGetRecentEpisodesQuery,
  useGetAnimeDetailsByIdQuery,
  useGetAnimeEpisodeByIdQuery
} = apiSlice