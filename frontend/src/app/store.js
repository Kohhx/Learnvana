import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../features/auth/authSlice"
import classReducer from "../features/class/classSlice"
import instructorReducer from "../features/instructor/instructorSlice"
import studentReducer from "../features/student/studentSlice"
import guardianReducer from "../features/guardian/guardianSlice"
import testReducer from "../features/test/TestSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    class: classReducer,
    instructor: instructorReducer,
    student: studentReducer,
    guardian: guardianReducer,
    test: testReducer,
  },
});
