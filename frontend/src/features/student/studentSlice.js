import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import studentService from "../student/studentService";
import { updateProfile } from "../auth/authSlice";
import { toast } from "react-toastify";

// Create the initial state for auth
const initialState = {
  student: null,
  students: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// create student profile for student user
export const UserStudentProfile = createAsyncThunk(
  "auth/signup/student",
  async (studentProfile, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const studentData = await studentService.UserStudentProfile(studentProfile, token);
      thunkAPI.dispatch(updateProfile(studentData));
      return studentData
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
        toast.error(message)
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create instructorSlice
export const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    reset: (state) => initialState,
    resetStates: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Instructor Profile
      .addCase(UserStudentProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // state.student = action.payload;
        const user = JSON.parse(localStorage.getItem("user"));
        user.profiles = action.payload;
        localStorage.setItem("user", JSON.stringify(user));
      })
      .addCase(UserStudentProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = studentSlice.actions;
export default studentSlice.reducer;
