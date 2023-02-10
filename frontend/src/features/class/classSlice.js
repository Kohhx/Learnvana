import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import classService from "../class/classService";
import { toast } from "react-toastify";

// Create the initial state for auth
const initialState = {
  classes: [],
  oneClass: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Get Student request to join class
export const sendRequestToJoinClass = createAsyncThunk(
  "class/studentRequestToJoinClass",
  async (classStudentData, thunkAPI) => {
    try {
      console.log("Front request to join")
      const token = thunkAPI.getState().auth.user.token;
      return await classService.sendRequestToJoinClass(classStudentData, token);
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

// Create classSlice
export const classSlice = createSlice({
  name: "class",
  initialState,
  reducers: {
    reset: (state) => initialState,
    resetStates: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
    }
  },
  extraReducers: (builder) => {
    builder
        // Get request to join class
        .addCase(sendRequestToJoinClass.pending, (state, action) => {
          state.isLoading = true;
        })
        .addCase(sendRequestToJoinClass.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
        })
        .addCase(sendRequestToJoinClass.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
        });
  },
});

export const { reset } = classSlice.actions;
export default classSlice.reducer;
