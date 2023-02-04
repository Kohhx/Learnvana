import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../auth/authService";

// Get User from local storage
const user = JSON.parse(localStorage.getItem("user"));


// Create the initial state for auth
const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  instructorProfileSuccess: user.instructorprofile,
};

// Sign up user
export const signUp = createAsyncThunk(
  "auth/signup",
  async (user, thunkAPI) => {
    try {
      return await authService.signUp(user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);


// create instructor profile for instructor user
export const UserInstructorProfile = createAsyncThunk(
  "auth/signup/instructor",
  async (instructorProfile, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await authService.UserInstructorProfile(instructorProfile, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Login user
export const login = createAsyncThunk(
  "auth/login",
  async (user, thunkAPI) => {
    try {
      return await authService.login(user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);


// Logout user
export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

// Create authSlice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        state.message = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        state.message = action.payload;
      })
      // --------------------
      .addCase(UserInstructorProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.instructorProfileSuccess = action.payload;
        state.user = action.payload;
      })
      .addCase(UserInstructorProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.instructorProfileSuccess = false;
        state.message = action.payload;
      })
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
