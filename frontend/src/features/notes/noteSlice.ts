import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import noteService from './noteService';

const initialState = {
  notes: [] as any[], // todo fix this any[]
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: '',
};

export const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {},
});

export const { reset } = noteSlice.actions;
export default noteSlice.reducer;
