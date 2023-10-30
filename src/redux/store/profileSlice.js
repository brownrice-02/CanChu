// store/profileSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  myProfile: null,
  userProfile: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setMyProfileData(state, action) {
      state.myProfile = action.payload.myProfile;
    },
    setUserProfileData(state, action) {
      state.userProfile = action.payload.userProfile;
    },
  },
});

export const { setMyProfileData, setUserProfileData } = profileSlice.actions;
export default profileSlice.reducer;