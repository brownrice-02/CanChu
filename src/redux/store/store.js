// store/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import profileReducer from './profileSlice';
import postsReducer from './postsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    posts: postsReducer,
  },
  devTools: process.env.NODE_ENV !== 'production', // 生產環境中不會啟用
});

// export const store_auth = store;
export default store;