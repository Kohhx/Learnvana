import React, { useState, useCallback } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import Select from "../components/Select";
import { FaUser } from "react-icons/fa";
import Validator from "../utilities/Validator";

const Signup = () => {
  const formInitialState = {
    email: {
      value: "",
      isValid: false,
    },
    password: {
      value: "",
      isValid: false,
    },
  };

  const [inputData, setInputData] = useState(formInitialState);

  // Handle all changes from all input and get back value and validity
  // Must use call back or go into infinite loop
  const inputFormHandler = useCallback((input) => {
    setInputData({ ...inputData, [input.id]: { ...input.payload } });
  }, []);

  //  console.log(inputData)
  return (
    <div>
      <div className="text-center">
        <h1>
          <FaUser className="inline mr-3" /> Register
        </h1>
        <p>Please create an account</p>
      </div>
      <form>
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
          inputFormHandler={inputFormHandler}
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
          inputFormHandler={inputFormHandler}
        ></Input>
        <Select
          id="role"
          label="Role"
          options={["Student", "Guardian", "Instructor"]}
          validators={[
            Validator.VALIDATOR_CONTAIN(["Student", "Guardian", "Instructor"]),
          ]}
        />
        <Button primary rounded>
          Sign up
        </Button>
      </form>
    </div>
  );
};

export default Signup;
