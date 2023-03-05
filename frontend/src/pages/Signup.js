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
import LearnvanaLogo from "../images/LearnvanaLogo.png";
import { FcGoogle } from "react-icons/fc";
import { AiFillFacebook } from "react-icons/ai";
import Plant from "../images/plant.png";
import { IoIosArrowDropleftCircle } from "react-icons/io";

const Signup = () => {
  // Initalize navigate
  const navigate = useNavigate();

  // Use form hook for form handling
  const { formState, useFormHandler } = useForm(
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
        navigate("/instructors/signup");
      }

      if (user.role === "student") {
        navigate("/students/signup");
      }

      if (user.role === "guardian") {
        navigate("/guardians/signup");
      }
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
    <div className="min-h-screen flex justify-center bg-proj-white1-300 lg:flex">
      <div className="hidden lg:flex-1 lg:block">
        <div className="h-screen flex items-center">
          <img src={Plant} alt="plant" className="max-h-full" />
        </div>
      </div>

      <div className="lg:flex-1 lg:relative">
        <button className="absolute left-3 top-5 lg:left-0" onClick={() => navigate("/")}>
          <IoIosArrowDropleftCircle className="text-[3rem] text-proj-grey1-300/75 hover:text-proj-grey1-300/50" />
        </button>
        <div className="flex justify-center h-screen items-center">
          <div className="flex flex-col items-center">
            <div className="w-fit mx-auto flex items-center gap-5 mb-8">
              <img src={LearnvanaLogo} alt="" />
              <h1 className="text-[50px] font-kaisei font-normal">Learnvana</h1>
            </div>
            <div className="font-kaisei flex items-center mb-8 text-proj-grey1-300">
              <FaUser className="text-2xl mr-4" />
              <h2>Sign Up</h2>
            </div>

            <form onSubmit={submitHandler} className="w-4/5 mx-auto">
              <div className="mb-5">
                <Input
                  id="email"
                  type="email"
                  // label="Email"
                  placeholder="Enter email"
                  // errorMessage="Please enter a valid email"
                  validators={[
                    Validator.VALIDATOR_EMAIL(),
                    Validator.VALIDATOR_REQUIRE(),
                  ]}
                  formHandler={useFormHandler}
                  className="w-full outline-none bg-transparent text-xl py-1 px-3 rounded-lg"
                ></Input>
              </div>
              <div className="mb-5">
                <Input
                  id="password"
                  type="password"
                  // label="Password"
                  placeholder="Please enter password"
                  // errorMessage="Please enter a valid password"
                  validators={[
                    Validator.VALIDATOR_REQUIRE(),
                    Validator.VALIDATOR_MINLENGTH(6),
                  ]}
                  formHandler={useFormHandler}
                  className="w-full outline-none bg-transparent text-xl py-1 px-3 rounded-lg"
                ></Input>
              </div>
              <div className="mb-5">
                <Input
                  id="password2"
                  type="password"
                  // label="Confirm Password"
                  placeholder="Confirm password"
                  validators={[]}
                  formHandler={useFormHandler}
                  className="w-full outline-none bg-transparent text-xl py-1 px-3 rounded-lg"
                ></Input>
              </div>
              <div className="mb-5">
                <Select
                  id="role"
                  // label="Role"
                  display="Select a role"
                  options={["Student", "Guardian", "Instructor"]}
                  validators={[
                    Validator.VALIDATOR_CONTAIN([
                      "Student",
                      "Guardian",
                      "Instructor",
                    ]),
                  ]}
                  formHandler={useFormHandler}
                  className="text-center outline-none bg-transparent text-xl py-1 px-2 rounded-lg"
                />
              </div>
              <div className="text-center">
                <Button className="font-kaisei rounded-md  bg-proj-blue2-300 text-proj-white1-300 border-transparent text-[1.4rem] px-6 shadow-lg shadow-black-500/50  hover:text-proj-black1-300 hover:border-solid hover:border-proj-black1-300 hover:bg-transparent transition-all">
                  Sign up
                </Button>
              </div>
            </form>

            <div className="pb-5 border-b-2 w-4/6 mt-5"></div>
            <div className="mt-8">
              <Button className="mb-6 flex w-full items-center gap-5  font-kaisei rounded-md  bg-proj-white1-300 text-proj-grey1-300 text-[1.4rem] px-6 shadow-lg shadow-black-500/50 border-transparent hover:text-proj-black1-300 hover:border-solid hover:border-proj-black1-300 hover:bg-transparent transition-all">
                <FcGoogle className="text-2xl" />
                <h4>Sign in with google</h4>
              </Button>
              <Button className="flex w-full items-center gap-5  font-kaisei rounded-md  bg-[#1977F2] text-proj-white1-300 border-none text-[1.4rem] px-6 shadow-lg shadow-black-500/50 hover:opacity-70 transition-all">
                <AiFillFacebook className="text-2xl text-proj-white1-300" />
                <h4>Sign in with facebook</h4>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
