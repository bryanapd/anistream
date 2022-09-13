import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { value: 'WINTER', label: 'WINTER' },
  { value: 'SPRING', label: 'SPRING' },
  { value: 'SUMMER', label: 'SUMMER' },
  { value: 'FALL', label: 'FALL' },
]

const seasonSlice = createSlice({
  name: 'season',
  initialState,
  reducers: {}
})

export default seasonSlice.reducer