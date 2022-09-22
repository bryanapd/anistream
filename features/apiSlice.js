import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import queryString from 'query-string'

export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://consumet-api.herokuapp.com/', 
    paramsSerializer: (params) => 
      queryString.stringify(params, { arrayFormat: 'comma',  })
  }),
  endpoints: builder => ({
    getPopularAnime: builder.query({
      query: query => {
        const { page, perPage } = query
        return {
          url: 'meta/anilist/popular',
          params: { page, perPage }
        }
      }
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
      query: query => {
        const { url, page, perPage } = query
        return {
          url: `meta/anilist/${url}`,
          params: { page, perPage }
        }
      }
    }),
    getAnimeAdvancedSearch: builder.query({
      query: advancedQuery => {
        const { query, page, perPage, season, format, sort, genres, id, year, status } = advancedQuery
        return{
          url: `meta/anilist/advanced-search?${genres ? `genres=[${genres}]` : ''}`,
          params: { query, page, perPage, season, format, sort, id, year, status }
        }
      }
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
    }),
    getAnimeByGenre: builder.query({
      query: slug => ({
        url: `meta/anilist/genre?genres=["${slug}"]`,
        method: 'GET',
        // params: {
        //   genres: slug
        // }
      })
    })
  })
})

export const {
  useGetPopularAnimeQuery,
  useGetTrendingAnimeQuery,
  useGetAnimeGenreQuery,
  useGetAnimeSearchQuery,
  useGetAnimeAdvancedSearchQuery,
  useGetRecentEpisodesQuery,
  useGetAnimeDetailsByIdQuery,
  useGetAnimeEpisodeByIdQuery,
  useGetAnimeByGenreQuery
} = apiSlice