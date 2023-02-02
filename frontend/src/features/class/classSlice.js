import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import classService from "../class/classService";

// Create the initial state for auth
const initialState = {
  classes: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// new class
export const newClass = createAsyncThunk(
  "class/create",
  async (classData, thunkAPI) => {
    try {
      return await classService.newClass(classData);
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


// Create classSlice
export const classSlice = createSlice({
  name: "class",
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
      .addCase(newClass.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(newClass.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.classes = action.payload;
      })
      .addCase(newClass.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.classes = null;
        state.message = action.payload;
      })

  },
});

export const { reset } = classSlice.actions;
export default classSlice.reducer;
