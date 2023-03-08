import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useNavigate, NavLink } from "react-router-dom";
import Button from "../Button";
import LearnvanaLogo from "../../images/LearnvanaLogo.png";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../../features/auth/authSlice";
import DropDown from "../Shared/Dropdown";

const HomeNav = () => {
  const navigate = useNavigate();
  const authDispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleClick = () => {
    authDispatch(logout());
    authDispatch(reset());
    navigate("/");
  };

  // const [searchValue, setSearchValue] = useState("");

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

  const activeStyle = ({ isActive }) =>
    isActive ? { color: "red" } : undefined;

  const floatNavBar = (
    <div className="sticky top-0 bg-proj-white3-300 h-20 bg-opacity flex items-center justify-between px-7 z-20">
      <div className="rounded-full grow basis-0">
        <div className="rounded-full w-[50px] h-[50px] grow">
          <img className="" src={LearnvanaLogo} alt="Learnvana Logo" />
        </div>
      </div>

      <ul className="flex gap-12 font-kaisei text-[22px]">
        <li>
          <NavLink to="/" style={activeStyle}>
            <span className="hover:text-gray-300"> Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/404" style={activeStyle}>
            <span className="hover:text-gray-300"> Market Place</span>
          </NavLink>
        </li>
        {user && (
          <li>
            <NavLink to="/404" style={activeStyle}>
              <span className="hover:text-gray-300">Dashboard</span>
            </NavLink>
          </li>
        )}
      </ul>

      {user ? (
        <div className="text-right grow basis-0">
          <div className="flex gap-5 w-fit ml-auto">
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
          </div>
        </div>
      ) : (
        <div className="text-right grow basis-0">
          <div className="flex gap-5 w-fit ml-auto">
            <Button
              onClick={() => navigate("/users/signup")}
              className="font-kaisei rounded-md  bg-proj-blue2-300 text-proj-white1-300 border-none text-[22px] w-[150px] h-[52px] hover:text-proj-black1-300 hover:border-solid hover:border-proj-black1-300 hover:bg-transparent transition-all"
            >
              Sign Up
            </Button>
            <Button
              onClick={() => navigate("/users/login")}
              className="font-kaisei rounded-md border-proj-black1-300 text-proj-black1-300 text-[22px] w-[150px] h-[52px] hover:border-none hover:bg-proj-grey1-100 transition-all"
            >
              Log In
            </Button>
          </div>
        </div>
      )}
    </div>
  );

  return floatNavBar;
};

export default HomeNav;
