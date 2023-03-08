import React, { useState, useEffect, useRef } from "react";
import Button from "../components/Button";
import LearnvanaLogo from "../images/LearnvanaLogo.png";
import { RxHamburgerMenu } from "react-icons/rx";
import { HashLink } from "react-router-hash-link";
import { useNavigate, NavLink } from "react-router-dom";
import HomeFixedNav from "../components/Home/HomeFixedNav";
import { useInView } from "react-intersection-observer";
import { CiSearch } from "react-icons/ci";
import HomeNav from "../components/Home/HomeNav";
import { BiCategoryAlt } from "react-icons/bi";
import { RiSlideshowLine } from "react-icons/ri";
import { GrContactInfo } from "react-icons/gr";
import { RxDotFilled } from "react-icons/rx";
import { DiRuby } from "react-icons/di";
import BooksImg from "../images/books.png";
import Train from "../images/train.png";

import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const { ref: floatNavBarRef, inView: floatNavBarInView } = useInView();

  return (
    <div>
      <HomeNav />
      <div className="min-h-[60vh] bg-proj-white3-300 flex items-center justify-center">
        <div className="font-kaisei font-light text-proj-grey2-300 text-center">
          <h2 className="mb-14 text-proj-black2-300 font-kaisei fade-down opacity-0 -translate-y-1.5">
            The one portal to accomplish all
            <span className="text-proj-blue2-300"> your learning</span>
          </h2>
          <div className="flex items-center gap-5">
            <h3 className="opacity-0 -translate-x-1.5 fade-right1">
              We help you <span className="text-proj-blue2-300">learn</span>
            </h3>
            <RxDotFilled className="text-4xl opacity-0 -translate-x-1.5 fade-right2" />
            <h3 className="opacity-0 -translate-x-1.5 fade-right2">
              track your <span className="text-proj-blue2-300">progress</span>
            </h3>
            <RxDotFilled className="text-4xl opacity-0 -translate-x-1.5 fade-right3" />
            <h3 className="opacity-0 -translate-x-1.5 fade-right3">
              <span className="text-proj-blue2-300">ease your payment</span>
            </h3>
          </div>

          <div className="mx-auto relative h-40">
            <img className="absolute bottom-0 opacity-0 max-w-[18rem] left-[30%] train-appear" src={Train} alt="train" />
            <div className="absolute train-track bottom-0"></div>
          </div>
        </div>
      </div>
      <div className="min-h-screen w-full bg-proj-white4-300 flex">
        <div className="w-2/5 overflow-hidden relative hidden lg:block">
          <img
            src={BooksImg}
            alt="book"
            className="absolute -left-[60px] top-[80px] max-w-full"
          />
        </div>

        <div className="lg:w-3/5 p-7">
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
