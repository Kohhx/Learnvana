import React, { useCallback, useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import Select from "../components/Select";
import { FaUser } from "react-icons/fa";
import Validator from "../utilities/Validator";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { signUp } from "../features/auth/authSlice";
import useThunk from "../hooks/useThunkHook";
import useForm from "../hooks/useFormHook";

const Signup = () => {
  // Initalize navigate
  const navigate = useNavigate();

  // Use form hook for form handling
  const [formState, formHandler] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
      password2: {
        value: "",
        isValid: true,
      },
      role: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  // Use Thunk hook for createAsyncThunk signup functions
  const [doSignup, signUpLoading, signUpSuccess, signUpError] =
    useThunk(signUp);

  // Get user from redux store
  const { user } = useSelector((state) => state.auth);

  // If user Sign up success, navigate to next page
  useEffect(() => {
    if (signUpSuccess) {
      // if instructor, navigate to instructor fill in form
      if (user.role === "instructor") {
        navigate("/users/signup/instructor");
      }
      
        if (user.role === "student") {
        navigate("/users/signup/student");
    }
  }, [signUpSuccess, navigate, user]);

  // Handle functions
  const submitHandler = (event) => {
    event.preventDefault();
    // console.log(formState);
    if (formState.inputs.password.value !== formState.inputs.password2.value) {
      toast.error("Password does not match");
      return;
    }

    if (!formState.formisValid) {
      toast.error("Form error. Please fill in the form again");
      return;
    }

    // If all pass then we submit login form to backend
    const newUser = {
      email: formState.inputs.email.value,
      password: formState.inputs.password.value,
      role: formState.inputs.role.value.toLowerCase(),
    };
    doSignup(newUser);
  };


  // Display loading spinner based on loading state
  if (signUpLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <div className="text-center">
        <h1>
          <FaUser className="inline mr-3" /> Register
        </h1>
        <p>Please create an account</p>
      </div>
      <form onSubmit={submitHandler}>
        <Input
          id="email"
          type="email"
          label="Email"
          placeholder="Enter email"
          // errorMessage="Please enter a valid email"
          validators={[
            Validator.VALIDATOR_EMAIL(),
            Validator.VALIDATOR_REQUIRE(),
          ]}
          formHandler={formHandler}
        ></Input>
        <Input
          id="password"
          type="password"
          label="Password"
          placeholder="Please enter password"
          // errorMessage="Please enter a valid password"
          validators={[
            Validator.VALIDATOR_REQUIRE(),
            Validator.VALIDATOR_MINLENGTH(6),
          ]}
          formHandler={formHandler}
        ></Input>
        <Input
          id="password2"
          type="password"
          label="Confirm Password"
          placeholder="Please enter password again"
          validators={[]}
          formHandler={formHandler}
        ></Input>
        <Select
          id="role"
          label="Role"
          options={["Student", "Guardian", "Instructor"]}
          validators={[
            Validator.VALIDATOR_CONTAIN(["Student", "Guardian", "Instructor"]),
          ]}
          formHandler={formHandler}
        />
        <Button primary rounded>
          Sign up
        </Button>
      </form>
    </div>
  );
};

export default Signup;
