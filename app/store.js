import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { HYDRATE } from "next-redux-wrapper";
import { apiSlice } from "../features/apiSlice";
import episodeReducer from '../features/episodeSlice'
import filterReducer from '../features/filterSlice'
import listsReducer from '../features/listsSlice'

const persistConfig = {
  key: 'root',
  storage
}
const persistedListReducer = persistReducer(persistConfig, listsReducer)

const store = configureStore({ 
  reducer: {
    episode: episodeReducer,
    filters: filterReducer,
    lists: persistedListReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
})

export const persistor = persistStore(store)
export default store