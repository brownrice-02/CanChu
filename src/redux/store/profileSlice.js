// store/profileSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfileData(state, action) {
      state.profile = action.payload.profile;
    },
  },
});

export const { setProfileData } = profileSlice.actions;
export default profileSlice.reducer;