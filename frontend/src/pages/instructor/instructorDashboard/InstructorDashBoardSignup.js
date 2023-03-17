import React, { useState, useEffect, useRef } from "react";
import useThunk from "../../../hooks/useThunkHook";
import useForm from "../../../hooks/useFormHook";
import { useSelector } from "react-redux";
import { UserInstructorProfile } from "../../../features/instructor/instructorSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import InputV2 from "../../../components/InputV2";
import SelectV2 from "../../../components/SelectV2";
import Button from "../../../components/Button";
import Validator from "../../../utilities/Validator";
import { FiUpload } from "react-icons/fi";
import { FaUserEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

const InstructorDashBoardSignup = () => {
  // Get User state
  const { user } = useSelector((state) => state.auth);

  const uploadAvatarEl = useRef();

  const previewUrlInitialState = user.profiles?.avatar?.url
    ? user.profiles.avatar.url
    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTugu0kegXOT1Gh1sgDVHvYjkGW29w19Hl9gQ&usqp=CAU";

    console.log(previewUrlInitialState)

  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(previewUrlInitialState);

  // Initalize navigate
  const navigate = useNavigate();

  // Use Thunk hook for createAsyncThunk instructor profile create function
  const [
    doCreateInstructorProfile,
    createInstructorProfileLoading,
    createInstructorProfileSuccess,
    createInstructorProfileError,
  ] = useThunk(UserInstructorProfile);

  // Use form hook for form handling
  const {
    formState,
    changeHandler,
    focusHandler,
    fillSelectedHandler,
    useFormHandler,
  } = useForm(
    {
      avatar: { value: null, messages: [], isValid: true, isFocus: false },
      first_name: {
        value: "",
        messages: [],
        isValid: false,
        isFocus: false,
      },
      last_name: {
        value: "",
        messages: [],
        isValid: false,
        isFocus: false,
      },
      age: {
        value: "",
        messages: [],
        isValid: false,
        isFocus: false,
      },
      gender: {
        value: "",
        messages: [],
        isValid: false,
        isFocus: false,
      },
      email: {
        value: "",
        messages: [],
        isValid: true,
        isFocus: false,
      },
      contact: {
        value: "",
        messages: [],
        isValid: true,
        isFocus: false,
      },
      experience: {
        value: "",
        messages: [],
        isValid: false,
        isFocus: false,
      },
    },
    false
  );

  console.log(formState);

  useEffect(() => {
    const oldUserProfile = {
      email: user.email,
    };
    fillSelectedHandler(oldUserProfile);
    // setPreviewUrl(previewUrlInitialState);
  }, []);

  useEffect(() => {
    if (createInstructorProfileSuccess && !createInstructorProfileLoading) {
      toast.success("Profile created");
      navigate("/instructors/dashboard")
    }
  }, [createInstructorProfileSuccess, createInstructorProfileLoading]);

  useEffect(() => {
    if (!formState.inputs.avatar.value) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(formState.inputs.avatar.value);
  }, [formState.inputs.avatar.value]);

  const updateUserSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState);

    if (!formState.formisValid) {
      toast.error("Form error. Please fill in the form again");
      return;
    }

    const newInstructorProfile = {
      first_name: formState.inputs.first_name.value,
      last_name: formState.inputs.last_name.value,
      age: formState.inputs.age.value,
      gender: formState.inputs.gender.value,
      email: formState.inputs.email.value,
      experience: formState.inputs.experience.value,
      avatar: formState.inputs.avatar.value,
      contact: formState.inputs.contact.value,
    };
    doCreateInstructorProfile(newInstructorProfile);
  };

  return (
    <div className="grid gap-5 h-full bg-proj-white3-200 items-center justify-center border-2 ">
      <div className="min-w-[45rem] mx-auto p-6">
        <div className="text-center mb-5">
          <div className="flex items-center justify-center gap-4 mb-8">
            <FaUserEdit className="text-4xl" />
            <h1 className="text-4xl">Create Instructor Profile</h1>
          </div>
        </div>

        <div className="w-fit mx-auto mb-5 flex gap-5 items-center">
          {previewUrl && (
            <img
              className="rounded-full border-4 border-proj-blue4-300 w-[6rem] h-[6rem] object-cover"
              src={previewUrl}
              alt="preview"
            />
          )}
          <div className="flex items-center gap-5">
            <div
              className="flex gap-4 items-center border-2 rounded-lg px-5 py-2 mx-auto cursor-pointer hover:bg-proj-grey1-300/80 hover:border-transparent hover:text-white transition-all"
              onClick={() => uploadAvatarEl.current.click()}
            >
              <FiUpload className="text-2xl" />
              <h3 className="text-sm font-normal">Add profile picture</h3>
            </div>
            <Button className="flex gap-4 items-center bg-red-600 text-lg rounded-lg px-5 py-2 mx-auto cursor-pointer hover:bg-red-600/70 hover:border-transparent transition-all">
              <AiFillDelete className="text-2xl text-white" />
              <h3 className="text-sm text-white font-normal">
                Delete profile picture
              </h3>
            </Button>
          </div>
        </div>

        <form onSubmit={updateUserSubmitHandler}>
          <InputV2
            className="hidden"
            id="avatar"
            type="file"
            placeholder="Select user avatar"
            validators={[]}
            formHandler={useFormHandler}
            onChange={(e) => changeHandler(e, "avatar", [])}
            ref={uploadAvatarEl}
          ></InputV2>

          <div className="flex gap-5 justify-between">
            <InputV2
              id="first_name"
              type="text"
              label="First Name"
              placeholder="Enter first name"
              onFocus={() => focusHandler("first_name")}
              onChange={(e) =>
                changeHandler(e, "first_name", [Validator.VALIDATOR_REQUIRE()])
              }
              value={formState.inputs.first_name.value}
              isFocus={formState.inputs.first_name.isFocus}
              isValid={formState.inputs.first_name.isValid}
              errorMessages={formState.inputs.first_name.messages}
              className="block grow w-full outline-none bg-transparent text-lg py-1 px-3 rounded-lg border-2 mb-3 focus:border-2 focus:border-proj-blue4-200"
            ></InputV2>

            <InputV2
              id="last_name"
              type="text"
              label="Last Name"
              placeholder="Enter last name"
              onFocus={() => focusHandler("last_name")}
              onChange={(e) =>
                changeHandler(e, "last_name", [Validator.VALIDATOR_REQUIRE()])
              }
              value={formState.inputs.last_name.value}
              isFocus={formState.inputs.last_name.isFocus}
              isValid={formState.inputs.last_name.isValid}
              errorMessages={formState.inputs.last_name.messages}
              className="block grow w-full outline-none bg-transparent text-lg py-1 px-3 rounded-lg border-2 mb-3 focus:border-2 focus:border-proj-blue4-200"
            ></InputV2>
          </div>

          <div className="flex gap-5 justify-between">
            <InputV2
              id="age"
              type="number"
              label="Age"
              placeholder="Enter age"
              onFocus={() => focusHandler("age")}
              onChange={(e) =>
                changeHandler(e, "age", [Validator.VALIDATOR_REQUIRE()])
              }
              value={formState.inputs.age.value}
              isFocus={formState.inputs.age.isFocus}
              isValid={formState.inputs.age.isValid}
              errorMessages={formState.inputs.age.messages}
              className="block grow w-full outline-none bg-transparent text-lg py-1 px-3 rounded-lg border-2 mb-3 focus:border-2 focus:border-proj-blue4-200"
            ></InputV2>

            <SelectV2
              id="gender"
              label="Gender"
              options={[
                {
                  display: "male",
                  value: "male",
                },
                {
                  display: "female",
                  value: "female",
                },
              ]}
              onFocus={() => focusHandler("gender")}
              onChange={(e) =>
                changeHandler(e, "gender", [Validator.VALIDATOR_REQUIRE()])
              }
              value={formState.inputs.gender.value}
              isFocus={formState.inputs.gender.isFocus}
              isValid={formState.inputs.gender.isValid}
              errorMessages={formState.inputs.gender.messages}
              className="block grow w-full outline-none bg-transparent text-lg py-1 px-3 rounded-lg border-2 mb-3 focus:border-2 focus:border-proj-blue4-200"
            />
          </div>
          <div className="flex gap-5 justify-between">
            <InputV2
              id="email"
              type="text"
              label="Email"
              placeholder="Enter email"
              onFocus={() => focusHandler("email")}
              onChange={(e) =>
                changeHandler(e, "email", [Validator.VALIDATOR_REQUIRE(), Validator.VALIDATOR_EMAIL])
              }
              value={formState.inputs.email.value}
              isFocus={formState.inputs.email.isFocus}
              isValid={formState.inputs.email.isValid}
              errorMessages={formState.inputs.email.messages}
              className="block grow w-full outline-none bg-transparent text-lg py-1 px-3 rounded-lg border-2 mb-3 focus:border-2 focus:border-proj-blue4-200"
            ></InputV2>

            <InputV2
              id="contact"
              type="text"
              label="Contact"
              placeholder="Enter contact"
              onFocus={() => focusHandler("contact")}
              onChange={(e) =>
                changeHandler(e, "contact", [])
              }
              value={formState.inputs.contact.value}
              isFocus={formState.inputs.contact.isFocus}
              isValid={formState.inputs.contact.isValid}
              errorMessages={formState.inputs.contact.messages}
              className="block grow w-full outline-none bg-transparent text-lg py-1 px-3 rounded-lg border-2 mb-3 focus:border-2 focus:border-proj-blue4-200"
            ></InputV2>
          </div>

          <InputV2
            id="experience"
            textarea
            input="textarea"
            label="Experience"
            placeholder="Enter new password"
            onFocus={() => focusHandler("experience")}
            onChange={(e) =>
              changeHandler(e, "experience", [Validator.VALIDATOR_REQUIRE()])
            }
            value={formState.inputs.experience.value}
            isFocus={formState.inputs.experience.isFocus}
            isValid={formState.inputs.experience.isValid}
            errorMessages={formState.inputs.experience.messages}
            className="w-full outline-none bg-transparent py-1 px-3 rounded-lg border-2 mb-5 text-lg focus:border-2 focus:border-proj-blue4-200"
          ></InputV2>

          <div className="flex justify-center">
            <Button className="font-kaisei rounded-md  bg-proj-blue2-300 text-proj-white1-300 border-transparent text-[1.4rem] px-6  hover:text-proj-black1-300 hover:border-solid hover:border-proj-black1-300 hover:bg-transparent transition-all">
              Create
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InstructorDashBoardSignup;
