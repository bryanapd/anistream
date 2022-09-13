import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { value: 'TV', label: 'TV'},
  { value: 'MOVIE', label: 'MOVIE'},
  { value: 'TV_SHORT', label: 'TV_SHORT'},
  { value: 'SPECIAL', label: 'SPECIAL'},
  { value: 'OVA', label: 'OVA'},
  { value: 'ONA', label: 'ONA'},
  { value: 'MUSIC', label: 'MUSIC'}
]

const formatSlice = createSlice({
  name: 'format',
  initialState,
  reducers: {}
})

export default formatSlice.reducer