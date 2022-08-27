import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { apiSlice } from "../features/apiSlice";
import episodeReducer from '../features/episodeSlice'

const store = configureStore({ 
  reducer: {
    episode: episodeReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
})

export default store