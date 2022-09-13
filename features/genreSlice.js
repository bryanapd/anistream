import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  // "Action" "Adventure" "Cars" "Comedy" "Drama" "Fantasy" "Horror" "Mahou Shoujo" "Mecha" "Music" "Mystery" 
  // "Psychological" "Romance" "Sci-Fi" "Slice of Life" "Sports" "Supernatural" "Thriller"
  { value: 0, label: 'Action', },
  { value: 1, label: 'Adventure' },
  { value: 2, label: 'Cars' },
  { value: 3, label: 'Comedy' },
  { value: 4, label: 'Drama' },
  { value: 5, label: 'Fantasy' },
  { value: 6, label: 'Horrow' },
  { value: 7, label: 'Mahou Shojou' },
  { value: 8, label: 'Mecha' },
  { value: 9, label: 'Music' },
  { value: 10, label: 'Mystery' },
  { value: 11, label: 'Psychological' },
  { value: 12, label: 'Romace' },
  { value: 13, label: 'Sci-Fi' },
  { value: 14, label: 'Slice of Life' },
  { value: 15, label: 'Sports' },
  { value: 16, label: 'Supernatural' },
  { value: 17, label: 'Thriller' },
]

const genreSlice = createSlice({
  name: 'genres',
  initialState,
  reducers: {}
})


export default genreSlice.reducer