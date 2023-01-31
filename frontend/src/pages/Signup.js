import React from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { FaUser } from "react-icons/fa";


const Signup = () => {
  return (
    <div>
      <div className="text-center">
        <h1 >
          <FaUser className="inline mr-3"/> Register
        </h1>
        <p>Please create an account</p>
      </div>
      <form>
        <Input type="text" label="Email" placeholder="Enter email" errorMessage="Please enter a valid email"></Input>
        <Button primary rounded classNames="text-2xl">
          Sign up
        </Button>
      </form>
    </div>
  );
};

export default Signup;
