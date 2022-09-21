import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: 'filters',
  initialState: {
    search: null,
    genre: null,
    genres: [],
    year: null,
    season: null,
    format: null
  },
  reducers: {
    setSearchValue: (state, action) => {
      state.search = action.payload
    },
    removeSearchQuery: (state) => {
      state.search = ''
    },
    setYear: (state, action) => {
      state.year = action.payload
    },
    setSeason: (state, action) => {
      state.season = action.payload
    },
    setFormat: (state, action) => {
      state.format = action.payload
    },
    setGenre: (state, action) => {
      state.genre = action.payload
    },
    setSelectedGenre: (state, action) => {
      state.genres.push(action.payload)
    },
    removeSelectedGenre: (state, action) => { // The filter operation creates a new array without changing the existing instance. Therefore you need to assign it to state.
      return { 
        ...state, 
        genres: state.genres.filter(genre => genre !== action.payload)
      }
    }
  }
})

export const { setSearchValue, setYear, setSeason, setFormat, setGenre, setSelectedGenre, removeSelectedGenre, removeSearchQuery } = filterSlice.actions

export default filterSlice.reducer