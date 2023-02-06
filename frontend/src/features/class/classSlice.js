import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import classService from "../class/classService";

// Create the initial state for auth
const initialState = {
  classes: [],
  oneClass: {},
  isError: false,
  isSuccess: false,
  classCreateSuccess: false,
  isLoading: false,
  message: "",
};

// Create new class
export const newClass = createAsyncThunk(
  "class/create",
  async (classData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await classService.newClass(classData, token);
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

// Get Instructor classes
export const getInstructorClasses = createAsyncThunk(
  "class/getAllInstructor",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await classService.getInstructorClasses(token);
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

// Get One Instructor class
export const getInstructorClass = createAsyncThunk(
  "class/getOneInstructor",
  async (classId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await classService.getInstructorClass(classId, token);
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
    reset: (state) => initialState,
    resetStates: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
    }
  },
  extraReducers: (builder) => {
    builder
    // Create Class
      .addCase(newClass.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(newClass.fulfilled, (state, action) => {
        state.isLoading = false;
        state.classCreateSuccess = true;
      })
      .addCase(newClass.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Get Instructor Classes
      .addCase(getInstructorClasses.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getInstructorClasses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.classes = action.payload;
      })
      .addCase(getInstructorClasses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Get one instructor class
      .addCase(getInstructorClass.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getInstructorClass.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.oneClass = action.payload;
      })
      .addCase(getInstructorClass.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = classSlice.actions;
export default classSlice.reducer;
