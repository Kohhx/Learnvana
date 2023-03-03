import React, { useState, useEffect, useRef } from "react";
import Button from "../components/Button";
import LearnvanaLogo from "../images/LearnvanaLogo.png";
import { RxHamburgerMenu } from "react-icons/rx";
import { HashLink } from "react-router-hash-link";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import DropDown from "../components/Shared/Dropdown";

const Home = () => {
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
      <Button
        onClick={() => navigate("/users/signup")}
        className="font-kaisei rounded-md  bg-proj-blue2-300 text-proj-white1-300 border-none text-[22px] w-[180px] h-[52px] hover:text-proj-black1-300 hover:border-solid hover:border-proj-black1-300 hover:bg-transparent transition-all"
      >
        Sign Up
      </Button>
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
          <img className="rounded-full" src={avatarImgSRC} alt="avatar profile" />
        </div>
      </DropDown>
    </>
  );

  return (
    <div>
      <div className="h-screen proj-bg-white-300 flex proj-bg-">
        <div className="w-1/2"></div>

        <div className="w-1/2 p-7">
          <div className="flex gap-4 justify-end">
            <div className="flex items-center gap-7">{fixedNavBar}</div>
          </div>
          <div className="mt-5">
            <div className="w-fit mx-auto flex items-center gap-5">
              <img src={LearnvanaLogo} alt="" />
              <h1 className="text-[66px] font-kaisei font-normal">Learnvana</h1>
            </div>
            <div className="w-5/6 mx-auto text-justify flex flex-col items-center">
              <p className="my-10 text-[18px]">
                t is a long established fact that a reader will be distracted by
                the readable content of a page when looking at its layout. The
                point of using Lorem Ipsum is that it has a more-or-less normal
                distribution of letters, as opposed to using 'Content here,
                content here', t is a long established fact that a reader will
                be distracted by the readable content of..
              </p>
              <Button className="font-kaisei mb-6 rounded-md  bg-proj-blue2-300 text-proj-white1-300 border-none text-[30px] w-[228px] h-[64px] hover:text-proj-black1-300 hover:border-solid hover:border-proj-black1-300 hover:bg-transparent transition-all">
                Join
              </Button>
              <Button className="font-kaisei rounded-md border-proj-black1-300 text-proj-black1-300 text-[30px] w-[228px] h-[64px] hover:border-none hover:bg-proj-grey1-100 transition-all">
                Market Place
              </Button>
              <div className="flex gap-12 mt-12">
                <HashLink smooth to="#section1">
                  <div className="rounded-full border-2 p-3 flex items-center justify-center bg-proj-white3-300">
                    <RxHamburgerMenu className="text-5xl" />
                  </div>
                </HashLink>

                <HashLink smooth to="#section2">
                  <div className="rounded-full border-2 p-3 flex items-center justify-center bg-proj-white3-300">
                    <RxHamburgerMenu className="text-5xl" />
                  </div>
                </HashLink>

                <HashLink smooth to="#section3">
                  <div className="rounded-full border-2 p-3 flex items-center justify-center bg-proj-white3-300">
                    <RxHamburgerMenu className="text-5xl" />
                  </div>
                </HashLink>

                <HashLink smooth to="#section4">
                  <div className="rounded-full border-2 p-3 flex items-center justify-center bg-proj-white3-300">
                    <RxHamburgerMenu className="text-5xl" />
                  </div>
                </HashLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="section1" className="h-screen bg-proj-grey1-300"></div>
      <div id="section2" className="h-screen bg-proj-black1-300"></div>
      <div id="section3" className="h-screen bg-proj-white1-300"></div>
      <div id="section4" className="h-screen bg-orange-200"></div>
    </div>
  );
};

export default Home;
