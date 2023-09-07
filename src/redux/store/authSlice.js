// store/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  access_token: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData(state, action) {
      state.access_token = action.payload.access_token;
      state.user = action.payload.user;
    },
  },
});

export const { setAuthData } = authSlice.actions;
export default authSlice.reducer;