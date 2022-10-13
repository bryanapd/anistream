import { configureStore, getDefaultMiddleware, EnhancedStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";

import apiSlice from "./api/apiSlice";
import episodeReducer from './slices/episodeSlice'
import filterReducer from './slices/filterSlice'
import listsReducer from './slices/listsSlice'


const persistConfig = {
  key: 'root',
  // whitelist: ['counter'], // only counter will be persisted, add other reducers if needed
  storage
}
const persistedListReducer = persistReducer(persistConfig, listsReducer)

export const store = configureStore({
  reducer: {
    episode: episodeReducer,
    filters: filterReducer,
    lists: persistedListReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: getDefaultMiddleware =>  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(apiSlice.middleware)
  // devTools: process.env.NEXT_PUBLIC_NODE_ENV !== "production"
})
const setupStore = (context) => store
const makeStore = (context) => setupStore(context)

export const persistor = persistStore(store)

export const wrapper = createWrapper(makeStore, { debug: true })