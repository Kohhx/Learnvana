import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import guardianService from "../guardian/guardianService";
import { updateProfile } from "../auth/authSlice";
import { toast } from "react-toastify";

// Create the initial state for auth
const initialState = {
  guardianStudents: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// INSTRUCTORS

// create instructor profile for instructor user
export const createGuardianStudents = createAsyncThunk(
  "guardian/createGuardianStudents",
  async (newGuardianStudents, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const guardianStudentsData = await guardianService.createGuardianStudents(
        newGuardianStudents,
        token
      );
      thunkAPI.dispatch(updateProfile(guardianStudentsData));
      return guardianStudentsData;
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

// create instructor profile for instructor user
export const getGuardianStudents = createAsyncThunk(
  "guardian/getGuardianStudents",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const guardianStudentsData = await guardianService.getGuardianStudents(
        token
      );
      return guardianStudentsData;
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

// Create guardian slice
export const guardianSlice = createSlice({
  name: "guardian",
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
      // Create Students Profiles for guardian
      .addCase(createGuardianStudents.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createGuardianStudents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const user = JSON.parse(localStorage.getItem("user"));
        user.profiles = action.payload;
        localStorage.setItem("user", JSON.stringify(user));
        state.guardianStudents = action.payload;
      })
      .addCase(createGuardianStudents.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Get all students for guardians
      .addCase(getGuardianStudents.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getGuardianStudents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.guardianStudents = action.payload;
      })
      .addCase(getGuardianStudents.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = guardianSlice.actions;
export default guardianSlice.reducer;
