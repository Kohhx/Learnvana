import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instructorService from "../instructor/instructorService";
import { updateProfile } from "../auth/authSlice";
import { toast } from "react-toastify";

// Create the initial state for auth
const initialState = {
  instructor: null,
  instructorClasses: [],
  instructorClass: {},
  classLessons: [],
  classLesson: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// INSTRUCTORS

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


// CLASSES

// Create new class
export const newClass = createAsyncThunk(
  "instructor/createClass",
  async (classData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await instructorService.newClass(classData, token);
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

// Get Instructor classes
export const getInstructorClasses = createAsyncThunk(
  "instructor/getClasses",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await instructorService.getInstructorClasses(token);
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

// Get One Instructor class
export const getInstructorClass = createAsyncThunk(
  "instructor/getClass",
  async (classId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await instructorService.getInstructorClass(classId, token);
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


//LESSONS

// Create new lesson
export const newLesson = createAsyncThunk(
  "instructor/createLesson",
  async (lessonData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await instructorService.newLesson(lessonData, token);
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

// Get Instructor lessons
export const getClassLessons = createAsyncThunk(
  "instructor/getLessons",
  async (classId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await instructorService.getClassLessons(classId, token);
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

// Get One Instructor lesson
export const getClassLesson = createAsyncThunk(
  "instructor/getLesson",
  async (lessonId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await instructorService.getClassLesson(lessonId, token);
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
      })

      // Create Class
      .addCase(newClass.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(newClass.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
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
        state.instructorClasses = action.payload;
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
        state.instructorClass = action.payload;
      })
      .addCase(getInstructorClass.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Create lesson
      .addCase(newLesson.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(newLesson.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(newLesson.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Get Instructor Lesssons
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

export const { reset } = instructorSlice.actions;
export default instructorSlice.reducer;
