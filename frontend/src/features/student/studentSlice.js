import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import studentService from "../student/studentService";
import { updateProfile } from "../auth/authSlice";
import { toast } from "react-toastify";

// Create the initial state for auth
const initialState = {
  student: null,
  students: [],
  studentClasses: [],
  classStudents: [],
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

// Get Student classes
export const getStudentClasses = createAsyncThunk(
  "student/getClasses",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await studentService.getStudentClasses(token);
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

// Get all students from class
export const getStudentsFromClass = createAsyncThunk(
  "student/getAllStudentFromClass",
  async (classId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await studentService.getStudentsFromClass(classId, token);
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

// Create studentSlice
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
      })

       // Get Instructor Classes
      .addCase(getStudentClasses.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getStudentClasses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.studentClasses = action.payload;
      })
      .addCase(getStudentClasses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Get all students from class
      .addCase(getStudentsFromClass.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getStudentsFromClass.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.classStudents = action.payload;
      })
      .addCase(getStudentsFromClass.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
  },
});

export const { reset } = studentSlice.actions;
export default studentSlice.reducer;
