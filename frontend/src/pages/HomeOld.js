import React, { useState, useEffect, useRef } from "react";
import Button from "../components/Button";
import LearnvanaLogo from "../images/LearnvanaLogo.png";
import { RxHamburgerMenu } from "react-icons/rx";
import { HashLink } from "react-router-hash-link";
import { useNavigate, NavLink } from "react-router-dom";
import HomeFixedNav from "../components/Home/HomeFixedNav";
import { useInView } from "react-intersection-observer";
import { CiSearch } from "react-icons/ci";
import HomeFloatNav from "../components/Home/HomeFloatNav";
import { BiCategoryAlt } from "react-icons/bi";
import { RiSlideshowLine } from "react-icons/ri";
import { GrContactInfo } from "react-icons/gr";
import { DiRuby } from "react-icons/di";
import BooksImg from "../images/books.png";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const { ref: floatNavBarRef, inView: floatNavBarInView } = useInView();

  return (
    <div>
      {floatNavBarInView && <HomeFloatNav />}

      <div className="min-h-screen w-full proj-bg-white-300 flex">
        <div className="w-2/5 overflow-hidden relative hidden lg:block">
          <img src={BooksImg} alt="book" className="absolute -left-[60px] top-[80px] max-w-full" />
        </div>

        <div className="lg:w-3/5 p-7">
          <div className="flex gap-4 justify-end">
            <div className="flex items-center gap-7">
              <HomeFixedNav />
            </div>
          </div>
          <div className="mt-11">
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
              <Button
                onClick={() => navigate("/users/signup")}
                className="shadow-lg shadow-black-500/50 font-kaisei mb-6 rounded-md  bg-proj-blue2-300 text-proj-white1-300 border-none text-[30px] w-[228px] h-[64px] hover:text-proj-black1-300 hover:border-solid hover:border-proj-black1-300 hover:bg-transparent transition-all"
              >
                Join
              </Button>
              <Button className="shadow-lg shadow-black-500/50 font-kaisei rounded-md border-proj-black1-300 text-proj-black1-300 text-[30px] w-[228px] h-[64px] hover:border-none hover:bg-proj-grey1-100 transition-all">
                Market Place
              </Button>
              <div className="flex gap-12 mt-12">
                <HashLink smooth to="#section1">
                  <div className="rounded-full border-2 p-3 flex items-center justify-center bg-proj-white3-300 section1 hover:scale-110 ">
                    <BiCategoryAlt className="text-5xl hover:scale-110 transition-all" />
                  </div>
                </HashLink>

                <HashLink smooth to="#section2">
                  <div className="rounded-full border-2 p-3 flex items-center justify-center bg-proj-white3-300 section2">
                    <RiSlideshowLine className="text-5xl hover:scale-110 transition-all" />
                  </div>
                </HashLink>

                <HashLink smooth to="#section3">
                  <div className="rounded-full border-2 p-3 flex items-center justify-center bg-proj-white3-300 section3">
                    <GrContactInfo className="text-5xl hover:scale-110 transition-all" />
                  </div>
                </HashLink>

                <HashLink smooth to="#section4">
                  <div className="rounded-full border-2 p-3 flex items-center justify-center bg-proj-white3-300 section4">
                    <DiRuby className="text-5xl hover:scale-110 transition-all" />
                  </div>
                </HashLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="section1" className="h-screen bg-sky-300"></div>
      <div ref={floatNavBarRef}>
        <div id="section2" className="h-screen bg-proj-black1-300"></div>
        <div id="section3" className="h-screen bg-proj-white1-300"></div>
        <div id="section4" className="h-screen bg-orange-200"></div>
      </div>
    </div>
  );
};

export default Home;
