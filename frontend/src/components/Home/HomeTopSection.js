import React from "react";
import { RxDotFilled } from "react-icons/rx";
import Train from "../../images/train.png";

const HomeTopSection = () => {
  return (
    <div className="min-h-[60vh] bg-proj-white3-300 flex items-center justify-center w-5/6 mx-auto mt-10 lg:mt-0">
      <div className="font-kaisei font-light text-proj-grey2-300 text-center">
        <h2 className="mb-14 text-proj-black2-300 font-kaisei fade-down opacity-0 -translate-y-1.5">
          The one portal to accomplish all
          <span className="text-proj-blue2-300"> your learning</span>
        </h2>
        <div className="flex flex-col lg:flex-row items-center gap-5">
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

        <div className="mx-auto relative h-24 mb-10 lg:h-40">
          <img
            className="absolute bottom-0 opacity-0 max-w-[40%] left-[30%] train-appear"
            src={Train}
            alt="train"
          />
          <div className="absolute train-track bottom-0"></div>
        </div>
      </div>
    </div>
  );
};

export default HomeTopSection;
