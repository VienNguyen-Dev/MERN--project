import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true
    },
    signInSuccess: (state, action) => {
      action.currentUser = action.payload;
      state.loading = false;
      state.error = null
    },
    signInFalure: (state, action) => {

      state.error = action.payload;
      state.loading = false;
    }
  }
});

export const { signInStart, signInSuccess, signInFalure } = userSlice.actions;

export default userSlice.reducer