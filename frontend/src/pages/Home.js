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
import { DiRuby } from "react-icons/di";
import BooksImg from "../images/books.png";
import HomeTopSection from "../components/Home/HomeTopSection";
import HomeScrollingIcons from "../components/Home/HomeScrollingIcons";

import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const { ref: bookExpand, inView: bookExpandInView } = useInView();

  return (
    <div>
      <HomeNav />
      <HomeTopSection />

      <div className="min-h-screen w-full bg-proj-white4-300 flex">
        <div className="w-2/5 overflow-hidden relative hidden lg:block">
          {bookExpandInView && (
            <img
              src={BooksImg}
              alt="book"
              className="absolute -left-[15px] top-[0px] max-w-full expand"
            />
          )}
        </div>

        <div className="w-full lg:w-3/5 p-7 flex items-center justify-center mx-auto">
          <div>
            <div className="w-fit mx-auto flex items-center gap-7">
              <img className="max-w-[5rem]" src={LearnvanaLogo} alt="" />
              <h1 className="text-[50px] font-kaisei font-normal">Learnvana</h1>
            </div>
            <HomeScrollingIcons />
            <div className="w-4/6 mx-auto text-justify flex flex-col items-center">
              <p className="my-12 text-[18px]">
                Learnvana offers many classes available for you to attend and
                enable you to keep in touch with your current schedules and
                progress that you have made. Payments can also be credited
                automatically so you can skip away all th
              </p>
              <div ref={bookExpand}></div>
              {bookExpandInView && (
                <div className="relative">
                  <Button className="button-animate font-kaisei rounded-md border-proj-black1-300 text-proj-black1-300 text-[30px] px-9  py-5 hover:border-none hover:bg-proj-grey1-100 transition-all">
                    Explore Marketplace
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div id="section1" className="h-screen bg-sky-300"></div>
      <div id="section2" className="h-screen bg-proj-black1-300"></div>
      <div id="section3" className="h-screen bg-proj-white1-300"></div>
      <div id="section4" className="h-screen bg-orange-200"></div>
    </div>
  );
};

export default Home;
