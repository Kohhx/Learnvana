import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import testService from "./TestService";
import { toast } from "react-toastify";

// Create the initial state for auth
const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  instructorProfileSuccess: false,
  studentProfileSuccess: false,
};

// Sign up user
export const uploadPhoto = createAsyncThunk(
  "test/uploadPhoto",
  async (file, thunkAPI) => {
    try {
      return await testService.uploadPhoto(file);
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

// Create authSlice
export const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadPhoto.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadPhoto.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(uploadPhoto.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        state.message = action.payload;
      })

  },
});

export const {  } = testSlice.actions;
export default testSlice.reducer;
