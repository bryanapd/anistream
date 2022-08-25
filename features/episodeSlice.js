import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  episode: 1
}

export const episodeSlice = createSlice({
  name: 'episode',
  initialState,
  reducers: {
    setEpisode(state, action){
      state.episode = action.payload
    }
  }
})

export const { setEpisode } = episodeSlice.actions

export default episodeSlice.reducer