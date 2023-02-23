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
  pendingStudents: [],
  classStudents: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};


/**
 * =============================================================================
 * INSTRUCTOR
 * =============================================================================
 */

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


// Update instructor profile
export const updateInstructorProfile = createAsyncThunk(
  "instructor/updateInstructorProfile",
  async (newInstructorProfile, thunkAPI) => {
    try {
      console.log("1");
      const token = thunkAPI.getState().auth.user.token;
      const instructorData = await instructorService.updateInstructorProfile(
        newInstructorProfile,
        token
      );
      thunkAPI.dispatch(updateProfile(instructorData));
      return instructorData;
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


/**
 * =============================================================================
 * CLASSES
 * =============================================================================
 */

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
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);


// Update instructor class
export const updateInstructorClass = createAsyncThunk(
  "instructor/updateInstructorClass",
  async (newInstructorClass, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await instructorService.updateInstructorClass(
        newInstructorClass,
        token
      );
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
      toast.error(message);
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
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);


// Delete a Instructor class
export const deleteInstructorClass = createAsyncThunk(
  "instructor/deleteClass",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await instructorService.deleteInstructorClass(data, token);
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


/**
 * =============================================================================
 * LESSONS
 * =============================================================================
 */

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
      toast.error(message);
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
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);


// Get One Instructor lesson
export const getClassLesson = createAsyncThunk(
  "instructor/getLesson",
  async (ids, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await instructorService.getClassLesson(ids, token);
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


/**
 * =============================================================================
 * STUDENTS, PENDING, ACCEPTANCE, REJECT, DELETE
 * =============================================================================
 */

// Get all students from class
export const getStudentsFromClass = createAsyncThunk(
  "instructor/getAllStudentFromClass",
  async (classId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await instructorService.getStudentsFromClass(classId, token);
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


// Delete a student from  class
export const deleteStudentFromClass = createAsyncThunk(
  "instructor/deleteStudentFromClass",
  async (ids, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await instructorService.deleteStudentFromClass(ids, token);
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


// Get instructor class pending students
export const getInstructorClassPendingStudents = createAsyncThunk(
  "instructor/getClassPendingStudents",
  async (classId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await instructorService.getInstructorClassPendingStudents(
        classId,
        token
      );
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


// Get instructor approve student into class
export const approveStudentToClass = createAsyncThunk(
  "instructor/approveStudentToClass",
  async (ids, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await instructorService.approveStudentToClass(ids, token);
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


// Get instructor approve student into class
export const rejectStudentToClass = createAsyncThunk(
  "instructor/rejectStudentFromClass",
  async (ids, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await instructorService.rejectStudentToClass(ids, token);
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


/**
 * =============================================================================
 * INSTRUCTOR SLICE
 * =============================================================================
 */

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

      //INSTRUCTOR

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

      // Update instructor profile
      .addCase(updateInstructorProfile.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateInstructorProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const user = JSON.parse(localStorage.getItem("user"));
        user.profiles = action.payload;
        localStorage.setItem("user", JSON.stringify(user));
      })
      .addCase(updateInstructorProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })


      // CLASSES

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

      // Update instructor class
      .addCase(updateInstructorClass.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateInstructorClass.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(updateInstructorClass.rejected, (state, action) => {
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

      // Delete a instructor class
      .addCase(deleteInstructorClass.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteInstructorClass.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.instructorClasses = state.instructorClasses.filter(
          (oneClass) => oneClass._id !== action.payload.classId
        );
      })
      .addCase(deleteInstructorClass.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })


      // LESSONS

      // Create lesson
      .addCase(newLesson.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(newLesson.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.classLessons = [...state.classLessons, action.payload];
        // dont mutate(.push), use destructure^ (make new array and add in)
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
      })


      // STUDENTS, PENDING, ACCEPTANCE, REJECT, DELETE

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

      // Delete a student from class
      .addCase(deleteStudentFromClass.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteStudentFromClass.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.classStudents = state.classStudents.filter(
          (student) => student._id !== action.payload.studentId
        );
      })
      .addCase(deleteStudentFromClass.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Get instructor class pending students
      .addCase(getInstructorClassPendingStudents.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getInstructorClassPendingStudents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.pendingStudents = action.payload;
      })
      .addCase(getInstructorClassPendingStudents.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Approve students to class
      .addCase(approveStudentToClass.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(approveStudentToClass.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.pendingStudents = state.pendingStudents.filter(
          (student) => student._id !== action.payload.studentId
        );
      })
      .addCase(approveStudentToClass.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Reject students to class
      .addCase(rejectStudentToClass.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(rejectStudentToClass.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.pendingStudents = state.pendingStudents.filter(
          (student) => student._id !== action.payload.studentId
        );
      })
      .addCase(rejectStudentToClass.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });

  },
});

export const { reset } = instructorSlice.actions;
export default instructorSlice.reducer;
