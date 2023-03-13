import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../auth/authService";
import { toast } from "react-toastify";

// Get User from local storage
const user = JSON.parse(localStorage.getItem("user"));

// Create the initial state for auth
const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  instructorProfileSuccess: false,
  studentProfileSuccess: false,
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
        toast.error(message)
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
        toast.error(message)
      return thunkAPI.rejectWithValue(message);
    }
  }
);


// Logout user
export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

// Update user
// Update instructor profile
export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async (newUserProfile, thunkAPI) => {
    try {
      console.log("1");
      const token = thunkAPI.getState().auth.user.token;
      const userData = await authService.updateUserProfile(
        newUserProfile,
        token
      );
      thunkAPI.dispatch(updateProfile(userData));
      return userData;
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
      state.instructorProfileSuccess = false;
      state.studentProfileSuccess = false;
    },
    resetStates: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
    },
    updateProfile: (state, action) => {
      state.user.profiles = action.payload;
    }
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
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = {...state.user,...action.payload};

      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        state.message = action.payload;
      })
  },
});

export const { reset, resetStates, updateProfile } = authSlice.actions;
export default authSlice.reducer;
