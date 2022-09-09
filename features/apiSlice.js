import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://consumet-api.herokuapp.com/' }),
  endpoints: builder => ({
    getPopularAnime: builder.query({
      query: () => ({
        url: 'meta/anilist/popular',
        params: {
          perPage: 50
        }
      })
    }),
    getTrendingAnime: builder.query({
      query: () => ({
        url: 'meta/anilist/trending',
        params: {
          perPage: 50
        }
      })
    }),
    getAnimeGenre: builder.query({
      query: genre => `meta/anilist/${genre}`
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
  useGetAnimeGenreQuery,
  useGetAnimeSearchQuery,
  useGetRecentEpisodesQuery,
  useGetAnimeDetailsByIdQuery,
  useGetAnimeEpisodeByIdQuery
} = apiSlice