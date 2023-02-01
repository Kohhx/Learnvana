import React, { useCallback, useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import Validator from "../utilities/Validator";
import Input from "../components/Input";


// // Reducer function
// const formReducer = (state, action) => {
//   switch (action.type) {
//     case "INPUT_CHANGE":
//       let formIsValid = true;
//       for (const inputId in state.inputs) {
//         if (inputId === action.id) {
//           formIsValid = formIsValid && action.payload.isValid;
//         } else {
//           formIsValid = formIsValid && state.inputs[inputId].isValid;
//         }
//       }
//       return {
//         ...state,
//         inputs: {
//           ...state.inputs,
//           [action.id]: {
//             value: action.payload.value,
//             isValid: action.payload.isValid,
//           },
//         },
//         formisValid: formIsValid,
//       };

//     default:
//       return state;
//   }
// };

const New = () => {

//   const formInitialState = {
//     inputs: {
//       classname: {
//         value: "",
//         isValid: false,
//       },
//       description: {
//         value: "",
//         isValid: false,
//       },
//       studentsnum: {
//         value: "",
//         isValid: true,
//       },
//       startdate: {
//         value: "",
//         isValid: false,
//       },
//       duration: {
//         value: "",
//         isValid: false,
//       },
//     },
//     formisValid: false,
//   };

//   const [formState, dispatch] = useReducer(formReducer, formInitialState);
//   const authDispatch = useDispatch();
//   const navigate = useNavigate();
//   const { user, isLoading, isError, isSuccess, message } = useSelector( (state) => state.auth);
//   // const aaa = useSelector( (state) => state.auth);
// // console.log(aaa)

//   // Handle all changes from all input and get back value and validity
//   // Must use call back or go into infinite loop
//   const formHandler = useCallback((input) => {
//     dispatch({ type: "INPUT_CHANGE", payload: input.payload, id: input.id });
//   }, []);


//   // this is for displaying error if form submission is incorrect
//   const submitHandler = (event) => {
//     event.preventDefault();
//     console.log(formState);

//     if (!formState.formisValid) {
//       toast.error("Form error. Please fill in the form again");
//       return;
//     }

//     // If all pass then we submit login form to backend
//     const newUser = {
//       email: formState.inputs.email.value,
//       password: formState.inputs.password.value,
//       role: formState.inputs.role.value.toLowerCase(),
//     }
//     authDispatch(signUp(newUser))
//   };

  return (
    <div>
      <p>sadsa</p>
      <form>



      </form>
    </div>
  )
}

export default New
