import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { apiSlice } from "../features/apiSlice";
import episodeReducer from '../features/episodeSlice'
import genreReducer from '../features/genreSlice'
import yearReducer from '../features/yearSlice'
import seasonReducer from '../features/seasonSlice'
import formatReducer from '../features/formatSlice'

const store = configureStore({ 
  reducer: {
    genres: genreReducer,
    episode: episodeReducer,
    years: yearReducer,
    seasons: seasonReducer,
    formats: formatReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
})

export default store