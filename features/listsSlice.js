import { createSlice } from "@reduxjs/toolkit";


export const listsSlice = createSlice({
  name: 'lists',
  initialState: {
    favorites: [],
    watching: [],
    rewatching: [],
    completed: [],
    paused: [],
    dropped: [],
    planning: []
  },
  reducers: {
    setFavorite: (state, action) => {
      state.favorites.push(action.payload)
    },
    setWatching: (state, action) => {
      state.watching.push(action.payload)
    },
    setRewatching: (state, action) => {
      state.rewatching.push(action.payload)
    },
    setCompleted: (state, action) => {
      state.completed.push(action.payload)
    },
    setPaused: (state, action) => {
      state.paused.push(action.payload)
    },
    setDropped: (state, action) => {
      state.dropped.push(action.payload)
    },
    setPlanning: (state, action) => {
      state.planning.push(action.payload)
    },
  }
})

export const { setFavorite, setWatching, setRewatching, setCompleted, setPaused, setDropped, setPlanning } = listsSlice.actions

export default listsSlice.reducer