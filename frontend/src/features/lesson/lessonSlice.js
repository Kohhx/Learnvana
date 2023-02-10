// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import lessonService from "../lesson/lessonService";
// import { toast } from "react-toastify";

// // Create the initial state for lesson
// const initialState = {
//   lessons: [],
//   oneLesson: {},
//   isError: false,
//   isSuccess: false,
//   lessonCreateSuccess: false,
//   isLoading: false,
//   message: "",
// };

// // Create new lesson
// export const newLesson = createAsyncThunk(
//   "lesson/create",
//   async (lessonData, thunkAPI) => {
//     try {
//       const token = thunkAPI.getState().auth.user.token;
//       return await lessonService.newLesson(lessonData, token);
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//         toast.error(message)
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

// // Get Instructor lessons
// export const getInstructorLessons = createAsyncThunk(
//   "lesson/getAllInstructor",
//   async (classId, thunkAPI) => {
//     try {
//       const token = thunkAPI.getState().auth.user.token;
//       return await lessonService.getInstructorLessons(classId, token);
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//         toast.error(message)
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

// // Get One Instructor lesson
// export const getInstructorLesson = createAsyncThunk(
//   "lesson/getOneInstructor",
//   async (lessonId, thunkAPI) => {
//     try {
//       const token = thunkAPI.getState().auth.user.token;
//       return await lessonService.getInstructorClass(lessonId, token);
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//         toast.error(message)
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

// // Create lessonSlice
// export const lessonSlice = createSlice({
//   name: "lesson",
//   initialState,
//   reducers: {
//     reset: (state) => initialState,
//     resetStates: (state) => {
//       state.isLoading = false;
//       state.isError = false;
//       state.isSuccess = false;
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//     // Create lesson
//       .addCase(newLesson.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(newLesson.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.lessonCreateSuccess = true;
//       })
//       .addCase(newLesson.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.message = action.payload;
//       })

//       // Get Instructor Lesssons
//       .addCase(getInstructorLessons.pending, (state, action) => {
//         state.isLoading = true;
//       })
//       .addCase(getInstructorLessons.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isSuccess = true;
//         state.lessons = action.payload;
//       })
//       .addCase(getInstructorLessons.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.message = action.payload;
//       })

//       // Get one instructor lesson
//       .addCase(getInstructorLesson.pending, (state, action) => {
//         state.isLoading = true;
//       })
//       .addCase(getInstructorLesson.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isSuccess = true;
//         state.oneLesson = action.payload;
//       })
//       .addCase(getInstructorLesson.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.message = action.payload;
//       });
//   },
// });

// export const { reset } = lessonSlice.actions;
// export default lessonSlice.reducer;
