import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  currentUser: null,
  loading: false,
  error: null
}
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload
      state.loading = false;
      state.error = null;
    },
    signInFalure: (state, action) => {
      state.loading = false;
      action.error = action.payload;
    }
  }
})
export const { signInStart, signInSuccess, signInFalure } = userSlice.actions;
export default userSlice.reducer;