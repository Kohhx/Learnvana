import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instructorService from "../instructor/instructorService";
import { updateProfile } from "../auth/authSlice";
import { toast } from "react-toastify";

// Create the initial state for auth
const initialState = {
  instructor: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// create instructor profile for instructor user
export const UserInstructorProfile = createAsyncThunk(
  "auth/signup/instructor",
  async (instructorProfile, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const instructorData = await instructorService.UserInstructorProfile(
        instructorProfile,
        token
      );
      thunkAPI.dispatch(updateProfile(instructorData));
      return instructorProfile;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create instructorSlice
export const instructorSlice = createSlice({
  name: "instructor",
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
      .addCase(UserInstructorProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const user = JSON.parse(localStorage.getItem("user"));
        user.profiles = action.payload;
        localStorage.setItem("user", JSON.stringify(user));
        // state.instructor = action.payload;
      })
      .addCase(UserInstructorProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = instructorSlice.actions;
export default instructorSlice.reducer;
