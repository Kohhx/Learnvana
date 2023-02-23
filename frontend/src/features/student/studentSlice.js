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
  classLessons: [],
  classLesson: {},
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
      const studentData = await studentService.UserStudentProfile(
        studentProfile,
        token
      );
      thunkAPI.dispatch(updateProfile(studentData));
      return studentData;
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

// Get Student classes
export const getStudentClasses = createAsyncThunk(
  "student/getClasses",
  async (studentId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await studentService.getStudentClasses(studentId, token);
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

// Get Student lessons
export const getClassLessons = createAsyncThunk(
  "student/getLessons",
  async (classId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await studentService.getClassLessons(classId, token);
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

// Get One student lesson
export const getClassLesson = createAsyncThunk(
  "student/getLesson",
  async (ids, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await studentService.getClassLesson(ids, token);
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
    addStudent: (state, action) => {
      console.log(action);
      state.student = action.payload;
      state.studentClasses = action.payload.classes;
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

      // Get Student Lesssons
      .addCase(getClassLessons.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getClassLessons.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.classLessons = action.payload;
      })
      .addCase(getClassLessons.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Get one instructor lesson
      .addCase(getClassLesson.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getClassLesson.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.classLesson = action.payload;
      })
      .addCase(getClassLesson.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, addStudent } = studentSlice.actions;
export default studentSlice.reducer;
