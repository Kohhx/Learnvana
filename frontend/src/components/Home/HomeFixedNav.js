import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import DropDown from "../Shared/Dropdown";
import Button from "../Button";

const HomeFixedNav = () => {
  const navigate = useNavigate();
  const authDispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleClick = () => {
    authDispatch(logout());
    authDispatch(reset());
    navigate("/");
  };

  let dropdownConfig = [];
  dropdownConfig = [
    { name: "Update user", link: `/users/update` },
    {
      name: "Logout",
      button: <button onClick={handleClick}>Logout</button>,
    },
  ];

  let avatarImgSRC =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTugu0kegXOT1Gh1sgDVHvYjkGW29w19Hl9gQ&usqp=CAU";
  if (user?.role === "instructor" && user.profiles?.avatar?.url) {
    avatarImgSRC = user.profiles?.avatar.url;
  }

  const fixedNavBar = !user ? (
    <>
      {/* <Button
        onClick={() => navigate("/users/signup")}
        className="font-kaisei rounded-md  bg-proj-blue2-300 text-proj-white1-300 border-none text-[22px] w-[180px] h-[52px] hover:text-proj-black1-300 hover:border-solid hover:border-proj-black1-300 hover:bg-transparent transition-all"
      >
        Sign Up
      </Button> */}
      <Button
        onClick={() => navigate("/users/login")}
        className="font-kaisei rounded-md border-proj-black1-300 text-proj-black1-300 text-[22px] w-[180px] h-[52px] hover:border-none hover:bg-proj-grey1-100 transition-all"
      >
        Log In
      </Button>
    </>
  ) : (
    <>
      <DropDown
        configs={dropdownConfig}
        className="absolute right-0 top-[65px] w-[250px] rounded-md border-1 border-proj-black1-300 bg-proj-grey1-300 text-proj-white1-300 p-4"
      >
        <div className="rounded-full w-[60px] h-[60px] p-[2px] border-2  border-transparent hover:border-proj-blue2-300 transition-all">
          <img
            className="rounded-full"
            src={avatarImgSRC}
            alt="avatar profile"
          />
        </div>
      </DropDown>
    </>
  );

  return fixedNavBar ;
};

export default HomeFixedNav;
