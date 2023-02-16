import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import { FaUser } from "react-icons/fa";
import Validator from "../utilities/Validator";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import useThunk from "../hooks/useThunkHook";
import useForm from "../hooks/useFormHook";


const Login = () => {
  // Initalize navigate
  const navigate = useNavigate();

  // Use form hook for form handling
  const {formState, useFormHandler} = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  // Get user from redux store
  const { user } = useSelector((state) => state.auth);

  // Use Thunk hook for createAsyncThunk instructor profile create function
  const [doLoginProfile, LoginProfileLoading, LoginSuccess, LoginError] =
    useThunk(login);

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(formState);

    if (!formState.formisValid) {
      toast.error("Form error. Please fill in the form again");
      return;
    }

    // If all pass then we submit login form to backend
    const loginUser = {
      email: formState.inputs.email.value,
      password: formState.inputs.password.value,
    };

    doLoginProfile(loginUser);
  };

  useEffect(() => {
    if (LoginSuccess) {
      navigate("/");
    }
  }, [LoginSuccess, user, navigate]);

   // Display loading spinner based on loading state
   if (LoginProfileLoading) {
    return <h1>...isLoading</h1>;
  }

  return (
    <div>
      <div className="text-center">
        <h1>
          <FaUser className="inline mr-3" /> Login
        </h1>
        <p>Please login to your account</p>
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
          formHandler={useFormHandler}
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
          formHandler={useFormHandler}
        ></Input>
        <Button primary rounded>
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
