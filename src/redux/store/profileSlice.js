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
    setUserProfilePicture(state, action) {
      state.userProfile.picture = action.payload.userProfile.picture;
      state.myProfile.picture = action.payload.myProfile.picture;
    },
  },
});

export const { setMyProfileData, setUserProfileData, setUserProfilePicture } = profileSlice.actions;
export default profileSlice.reducer;