import React from "react";
import { BiCategoryAlt } from "react-icons/bi";

const HomeScrollingIcons = () => {
  return (
    <div className="mt-12 w-4/6 lg:w-5/6  mx-auto overflow-hidden">
      <div className="flex horizontal-scrolling">
        <div className="w-1/2 flex justify-around">
          <div className="rounded-2xl  p-3 flex items-center justify-center bg-proj-white3-300">
            <BiCategoryAlt className="text-[3.5vw]" />
            1
          </div>
          <div className="rounded-2xl  p-3 flex items-center justify-center bg-proj-white3-300">
            <BiCategoryAlt className="text-[3.5vw]" />
            2
          </div>
          <div className="rounded-2xl  p-3 flex items-center justify-center bg-proj-white3-300">
                 <BiCategoryAlt className="text-[3.5vw]" />
            3
          </div>
          <div className="rounded-2xl  p-3 flex items-center justify-center bg-proj-white3-300">
                 <BiCategoryAlt className="text-[3.5vw]" />
            4
          </div>
          <div className="rounded-2xl  p-3 flex items-center justify-center bg-proj-white3-300">
                 <BiCategoryAlt className="text-[3.5vw]" />
            5
          </div>
        </div>

        <div className="w-1/2 flex justify-around">
          <div className="rounded-2xl  p-3 flex items-center justify-center bg-proj-white3-300">
          <BiCategoryAlt className="text-[3.5vw]" />
           1
          </div>
          <div className="rounded-2xl  p-3 flex items-center justify-center bg-proj-white3-300">
          <BiCategoryAlt className="text-[3.5vw]" />
            2
          </div>
          <div className="rounded-2xl  p-3 flex items-center justify-center bg-proj-white3-300">
                 <BiCategoryAlt className="text-[3.5vw]" />
            3
          </div>
          <div className="rounded-2xl  p-3 flex items-center justify-center bg-proj-white3-300">
                 <BiCategoryAlt className="text-[3.5vw]" />
            4
          </div>
          <div className="rounded-2xl  p-3 flex items-center justify-center bg-proj-white3-300">
                 <BiCategoryAlt className="text-[3.5vw]" />
            5
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScrollingIcons;
