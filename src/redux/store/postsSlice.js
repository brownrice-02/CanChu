// store/postsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: [],
  next_cursor: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPostsData(state, action) {
      state.posts = action.payload.posts;
      state.next_cursor = action.payload.next_cursor;
    },
  },
});

export const { setPostsData } = postsSlice.actions;
export default postsSlice.reducer;