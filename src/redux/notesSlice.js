import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = { items: [], search: '' };
const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: {
      reducer(state, action) { state.items.unshift(action.payload); },
      prepare(text, color) { return { payload: { id: nanoid(), text, color } }; },
    },
    setSearch(state, action) { state.search = action.payload; },
    deleteNote(state, action) { state.items = state.items.filter(note => note.id !== action.payload); },
  },
});
export const { addNote, setSearch, deleteNote } = notesSlice.actions;
export default notesSlice.reducer;
