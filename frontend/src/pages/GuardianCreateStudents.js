import React, { useEffect } from "react";
import Validator from "../utilities/Validator";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Input from "../components/Input";
import Button from "../components/Button";
import useThunk from "../hooks/useThunkHook";
import useForm from "../hooks/useFormHook";

const GuardianCreateStudents = () => {
   // Initalize navigate
   const navigate = useNavigate();

   // Use form hook for form handling
   const [formState, formHandler] = useForm(
     {
       first_name: {
         value: "",
         isValid: false,
       },
       last_name: {
         value: "",
         isValid: false,
       },
       age: {
         value: "",
         isValid: true,
       },
       gender: {
         value: "",
         isValid: false,
       },
       contact: {
         value: "",
         isValid: false,
       },
     },
     false
   );

  return (
    <div>GuardianCreateStudents</div>
  )
}

export default GuardianCreateStudents
