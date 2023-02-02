import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../features/auth/authSlice"
import classReducer from "../features/class/classSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    class: classReducer,
  },
});
