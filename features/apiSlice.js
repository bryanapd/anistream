import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://consumet-api.herokuapp.com/' }),
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
  useGetRecentReleaseQuery,
  useGetAnimeSearchQuery,
  useGetAnimeDetailsByIdQuery,
  useGetAnimeEpisodeByIdQuery
} = apiSlice