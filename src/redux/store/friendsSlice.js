// store/friendsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  friendList: [],
};

const friendsSlice = createSlice({
  name: 'friendList',
  initialState,
  reducers: {
    setFriendList(state, action) {
      state.friendList = action.payload.friendList;
    },
  },
});

export const { setFriendList } = friendsSlice.actions;
export default friendsSlice.reducer;