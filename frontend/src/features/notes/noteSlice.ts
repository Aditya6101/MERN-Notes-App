import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import noteService from './noteService';

type initialStateType = {
  notes: Note[];
  isSuccess: boolean;
  isError: boolean;
  isLoading: boolean;
  message: string;
};

const initialState: initialStateType = {
  notes: [] as Note[],
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: '',
};

// Get user's notes
export const getNotes = createAsyncThunk(
  'notes/getNotes',
  async (_, thunkAPI) => {
    try {
      // @ts-ignore
      const token = (thunkAPI.getState().auth.user.token as string) || '';
      return await noteService.getNotes(token);
    } catch (err: any) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create a note
export const createNote = createAsyncThunk(
  'notes/createNote',
  async (formData: NewNoteType, thunkAPI) => {
    try {
      // @ts-ignore
      const token = (thunkAPI.getState().auth.user.token as string) || '';
      return await noteService.createNote(formData, token);
    } catch (err: any) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete a note
export const deleteNote = createAsyncThunk(
  'notes/deleteNote',
  async (id: string, thunkAPI) => {
    try {
      // @ts-ignore
      const token = (thunkAPI.getState().auth.user.token as string) || '';
      return await noteService.deleteNote(id, token);
    } catch (err: any) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.notes = action.payload as Note[];
      })
      .addCase(getNotes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(createNote.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.notes.push(action.payload as Note);
      })
      .addCase(createNote.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(deleteNote.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.notes = state.notes.filter(
          (note) => note._id !== (action.payload.id as string)
        );
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { reset } = noteSlice.actions;
export default noteSlice.reducer;
