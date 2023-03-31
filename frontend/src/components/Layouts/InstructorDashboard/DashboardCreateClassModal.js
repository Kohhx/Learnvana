import React, { useState, useEffect, useRef } from "react";
import Modal from "../../Shared/Modal";
import useThunk from "../../../hooks/useThunkHook";
import useForm from "../../../hooks/useFormHook";
import { useSelector } from "react-redux";
import { updateUserProfile } from "../../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import InputV2 from "../../InputV2";
import SelectV2 from "../../SelectV2";
import Button from "../../Button";
import Validator from "../../../utilities/Validator";
import { FiUpload } from "react-icons/fi";
import { AiFillCloseCircle } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { newClass } from "../../../features/instructor/instructorSlice";

const DashboardUpdateUserModal = ({ isModalOpen, closeModal }) => {
  // Get User state
  const { user } = useSelector((state) => state.auth);


  // Initalize navigate
  const navigate = useNavigate();

  // Use Thunk hook for createAsyncThunk instructor profile create function
  const [
    doCreateClassProfile,
    CreateClassLoading,
    CreateClassSuccess,
    CreateClassError,
  ] = useThunk(newClass);

  // Use form hook for form handling
  const {
    formState,
    changeHandler,
    focusHandler,
    fillHandler,
    useFormHandler,
  } = useForm(
    {
      avatar: { value: null, messages: [], isValid: true, isFocus: false },
      instructor_name: {
        value: user.profiles.first_name,
        messages: [],
        isValid: true,
        isFocus: false,
      },
      title: {
        value: "",
        messages: [],
        isValid: false,
        isFocus: false,
      },
      status: {
        value: "",
        messages: [],
        isValid: false,
        isFocus: false,
      },
      images: {
        value: "",
        messages: [],
        isValid: false,
        isFocus: false,
      },
      address: {
        value: "",
        messages: [],
        isValid: false,
        isFocus: false,
      }
    },
    false
  );

  useEffect(() => {
    if (CreateClassSuccess) {
      toast.success("class created");
      closeModal();
    }
  }, [CreateClassSuccess]);

  const updateUserSubmitHandler = (event) => {
    event.preventDefault();

    if (!formState.formisValid) {
      toast.error("Form error. Please fill in the form again");
      return;
    }

    // If all pass then we submit login form to backend
    const newClassData = {
      instructor_name: formState.inputs.instructor_name.value,
      title: formState.inputs.title.value,
      status: formState.inputs.status.value,
      images: formState.inputs.images.value,
      address: formState.inputs.address.value,
    };
    doCreateClassProfile(newClassData);
  };

  return (
    <Modal isOpen={isModalOpen} closeModal={closeModal}>
      <div
        className="absolute top-3 right-3 cursor-pointer opacity-70 hover:opacity-100 transition-all"
        onClick={() => closeModal()}
      >
        <AiFillCloseCircle className="text-3xl" />
      </div>

      <div className="max-w-[45rem] mx-auto overscroll-y-auto">
        <div className="text-center mb-5">
          <div className="flex items-center justify-center gap-4 mb-8">
            <h1 className="text-4xl">Create Class</h1>
          </div>
        </div>

        <form onSubmit={updateUserSubmitHandler}>
          <div className="overflow-y-auto max-h-[55vh] pr-3">
            <div className="flex gap-5 justify-between">
              <InputV2
                id="instructor_name"
                type="text"
                label="Instructor"
                placeholder="Enter instructor name"
                onFocus={() => focusHandler("title")}
                onChange={(e) =>
                  changeHandler(e, "instructor_name", [
                    Validator.VALIDATOR_REQUIRE(),
                  ])
                }
                value={formState.inputs.instructor_name.value}
                isFocus={formState.inputs.instructor_name.isFocus}
                isValid={formState.inputs.instructor_name.isValid}
                errorMessages={formState.inputs.instructor_name.messages}
                className="block grow w-full outline-none bg-transparent text-lg py-1 px-3 rounded-lg border-2  focus:border-2 focus:border-proj-blue4-200"
              ></InputV2>
            </div>
            <div className="flex gap-5 justify-between">
              <InputV2
                id="title"
                type="text"
                label="Title"
                placeholder="Enter title"
                onFocus={() => focusHandler("title")}
                onChange={(e) =>
                  changeHandler(e, "title", [
                    Validator.VALIDATOR_REQUIRE(),
                  ])
                }
                value={formState.inputs.title.value}
                isFocus={formState.inputs.title.isFocus}
                isValid={formState.inputs.title.isValid}
                errorMessages={formState.inputs.title.messages}
                className="block grow w-full outline-none bg-transparent text-lg py-1 px-3 rounded-lg border-2  focus:border-2 focus:border-proj-blue4-200"
              ></InputV2>
            </div>

            <div className="flex gap-5 justify-between">
              <InputV2
                id="address"
                type="text"
                label="Address"
                placeholder="Enter address"
                onFocus={() => focusHandler("address")}
                onChange={(e) => changeHandler(e, "address", [Validator.VALIDATOR_REQUIRE()])
                }
                value={formState.inputs.address.value}
                isFocus={formState.inputs.address.isFocus}
                isValid={formState.inputs.address.isValid}
                errorMessages={formState.inputs.address.messages}
                className="block grow w-full outline-none bg-transparent text-lg py-1 px-3 rounded-lg border-2 focus:border-2 focus:border-proj-blue4-200"
              ></InputV2>
            </div>
            <div className="flex gap-5 justify-between">
              <SelectV2
                id="status"
                label="Status"
                options={[
                  {
                    display: "Not started",
                    value: "Not started",
                  },
                  {
                    display: "In progress",
                    value: "In progress",
                  },
                  {
                    display: "Closed",
                    value: "Closed",
                  },
                ]}
                onFocus={() => focusHandler("status")}
                onChange={(e) =>
                  changeHandler(e, "status", [Validator.VALIDATOR_REQUIRE()])
                }
                value={formState.inputs.status.value}
                isFocus={formState.inputs.status.isFocus}
                isValid={formState.inputs.status.isValid}
                errorMessages={formState.inputs.status.messages}
                className="block grow w-full outline-none bg-transparent text-lg py-1 px-3 rounded-lg border-2 focus:border-2 focus:border-proj-blue4-200"
              />

              <InputV2
                id="images"
                type="text"
                label="Images"
                placeholder="Add images"
                onFocus={() => focusHandler("images")}
                onChange={(e) =>
                  changeHandler(e, "images", [Validator.VALIDATOR_REQUIRE()])
                }
                value={formState.inputs.images.value}
                isFocus={formState.inputs.images.isFocus}
                isValid={formState.inputs.images.isValid}
                errorMessages={formState.inputs.images.messages}
                className="block grow w-full outline-none bg-transparent text-lg py-1 px-3 rounded-lg border-2 focus:border-2 focus:border-proj-blue4-200"
              ></InputV2>
            </div>
          </div>
          <div className="flex justify-center">
            <Button className="font-kaisei rounded-md  bg-proj-blue2-300 text-proj-white1-300 border-transparent text-[1.4rem] px-6  hover:text-proj-black1-300 hover:border-solid hover:border-proj-black1-300 hover:bg-transparent transition-all">
              Create
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default DashboardUpdateUserModal;
