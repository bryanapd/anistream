import { createSlice } from "@reduxjs/toolkit";


export const listsSlice = createSlice({
  name: 'lists',
  initialState: {
    // all: [
    //   watching,
    //   rewatching,
    //   completed,
    //   paused,
    //   dropped,
    //   planning
    // ],
    watching: [],
    rewatching: [],
    completed: [],
    paused: [],
    dropped: [],
    planning: []
  },
  reducers: {
    setWatching: (state, action) => {
      state.watching.push(action.payload)
    }
  }
})

export const { setWatching } = listsSlice.actions

export default listsSlice.reducer