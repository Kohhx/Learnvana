import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../features/auth/authSlice"
import classReducer from "../features/class/classSlice"
import instructorReducer from "../features/instructor/instructorSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    class: classReducer,
    instructor: instructorReducer,
  },
});
