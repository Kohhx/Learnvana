import React, { useState, useEffect, useRef } from "react";
import useThunk from "../../../hooks/useThunkHook";
import useForm from "../../../hooks/useFormHook";
import { useSelector } from "react-redux";
import { updateUserProfile } from "../../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import InputV2 from "../../../components/InputV2";
import Button from "../../../components/Button";
import Validator from "../../../utilities/Validator";
import { FiUpload } from "react-icons/fi";
import { FaUserEdit } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";

const InstructorDashboardSetting = () => {
  // Get User state
  const { user } = useSelector((state) => state.auth);

  const uploadAvatarEl = useRef();

  const previewUrlInitialState = user?.avatar?.url
    ? user.avatar.url
    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTugu0kegXOT1Gh1sgDVHvYjkGW29w19Hl9gQ&usqp=CAU";

  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(previewUrlInitialState);

  // Initalize navigate
  const navigate = useNavigate();

  const [
    doUpdateUserProfile,
    updateUserProfileLoading,
    updateUserProfileSuccess,
    updateUserProfileError,
  ] = useThunk(updateUserProfile);

  // Use form hook for form handling
  const {
    formState,
    changeHandler,
    focusHandler,
    fillHandler,
    useFormHandler,
  } = useForm(
    {
      avatar: { value: null, messages: [], isValid: false, isFocus: false },
      email: {
        value: "",
        messages: [],
        isValid: false,
        isFocus: false,
      },
      oldPassword: {
        value: "",
        messages: [],
        isValid: false,
        isFocus: false,
      },
      newPassword: {
        value: "",
        messages: [],
        isValid: false,
        isFocus: false,
      },
    },
    false
  );

  useEffect(() => {
    const oldUserProfile = {
      email: user.email,
    };
    // console.log("Old", oldInstructorProfile);
    fillHandler(oldUserProfile);
    setPreviewUrl(previewUrlInitialState);
  }, []);

  useEffect(() => {
    if (updateUserProfileSuccess && !updateUserProfileLoading) {
      toast.success("Profile updated");
    }
  }, [updateUserProfileSuccess, updateUserProfileLoading]);

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

    // If all pass then we submit login form to backend
    const newUserProfile = {
      email: formState.inputs.email.value,
      oldPassword: formState.inputs.oldPassword.value,
      newPassword: formState.inputs.newPassword.value,
      avatar: formState.inputs.avatar.value,
    };
    console.log(newUserProfile);

    doUpdateUserProfile(newUserProfile);
  };

  return (
    <div className="grid gap-5 h-full bg-proj-white3-200 items-center justify-center border-2 ">
      <div className="min-w-[30rem] mx-auto p-6">
        <div className="text-center mb-5">
          <div className="flex items-center justify-center gap-4 mb-7">
            <FaUserEdit className="text-4xl" />
            <h1 className="text-4xl">Update User Profile</h1>
          </div>

          <p>Fill in profile details</p>
        </div>
        <div className="w-fit mx-auto mb-3">
          {previewUrl && (
            <img
              className="rounded-full border-4 border-proj-blue4-300 w-[13rem] h-[13rem]"
              src={previewUrl}
              alt="preview"
            />
          )}
        </div>

        <div
          className="w-fit flex gap-4 items-center border-2 rounded-lg px-5 py-2 mx-auto cursor-pointer mb-5 hover:bg-proj-grey1-300/80 hover:border-transparent hover:text-white transition-all"
          onClick={() => uploadAvatarEl.current.click()}
        >
          <FiUpload className="text-3xl" />
          <h3 className="text-lg">Add profile picture</h3>
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
          <InputV2
            id="email"
            type="text"
            // label="First_name"
            placeholder="Enter new email"
            onFocus={() => focusHandler("email")}
            onChange={(e) =>
              changeHandler(e, "email", [Validator.VALIDATOR_REQUIRE()])
            }
            value={formState.inputs.email.value}
            isFocus={formState.inputs.email.isFocus}
            isValid={formState.inputs.email.isValid}
            errorMessages={formState.inputs.email.messages}
            className="w-full outline-none bg-transparent text-xl py-1 px-3 rounded-lg border-2 mb-3"
          ></InputV2>
          <InputV2
            id="oldPassword"
            type="password"
            // label="Last_name"
            placeholder="Enter old password"
            onFocus={() => focusHandler("oldPassword")}
            onChange={(e) =>
              changeHandler(e, "oldPassword", [Validator.VALIDATOR_REQUIRE()])
            }
            value={formState.inputs.oldPassword.value}
            isFocus={formState.inputs.oldPassword.isFocus}
            isValid={formState.inputs.oldPassword.isValid}
            errorMessages={formState.inputs.oldPassword.messages}
            className="w-full outline-none bg-transparent text-xl py-1 px-3 rounded-lg border-2 mb-3"
          ></InputV2>
          <InputV2
            id="newPassword"
            type="password"
            // label="Last_name"
            placeholder="Enter new password"
            onFocus={() => focusHandler("newPassword")}
            onChange={(e) =>
              changeHandler(e, "newPassword", [Validator.VALIDATOR_REQUIRE()])
            }
            value={formState.inputs.newPassword.value}
            isFocus={formState.inputs.newPassword.isFocus}
            isValid={formState.inputs.newPassword.isValid}
            errorMessages={formState.inputs.newPassword.messages}
            className="w-full outline-none bg-transparent text-xl py-1 px-3 rounded-lg border-2 mb-3"
          ></InputV2>
          <div className="flex justify-center">
            <Button className="font-kaisei rounded-md  bg-proj-blue2-300 text-proj-white1-300 border-transparent text-[1.4rem] px-6  hover:text-proj-black1-300 hover:border-solid hover:border-proj-black1-300 hover:bg-transparent transition-all">
              Update
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InstructorDashboardSetting;
