import React from "react";
import { BiCategoryAlt } from "react-icons/bi";

const HomeScrollingIcons = () => {
  return (
    <div className="mt-12 w-5/6 border-2 mx-auto overflow-hidden">
      <div className="flex border-2 left-0 horizontal-scrolling">
        <div className="w-1/2 flex justify-around">
          <div className="rounded-2xl border-2 p-3 flex items-center justify-center bg-proj-white3-300">
            <BiCategoryAlt className="text-5xl" />
            1
          </div>
          <div className="rounded-2xl border-2 p-3 flex items-center justify-center bg-proj-white3-300">
            <BiCategoryAlt className="text-5xl" />
            2
          </div>
          <div className="rounded-2xl border-2 p-3 flex items-center justify-center bg-proj-white3-300">
            <BiCategoryAlt className="text-5xl" />
            3
          </div>
          <div className="rounded-2xl border-2 p-3 flex items-center justify-center bg-proj-white3-300">
            <BiCategoryAlt className="text-5xl" />
            4
          </div>
          <div className="rounded-2xl border-2 p-3 flex items-center justify-center bg-proj-white3-300">
            <BiCategoryAlt className="text-5xl" />
            5
          </div>
        </div>

        <div className="w-1/2 flex justify-around">
          <div className="rounded-2xl border-2 p-3 flex items-center justify-center bg-proj-white3-300">
            <BiCategoryAlt className="text-5xl" />
           1
          </div>
          <div className="rounded-2xl border-2 p-3 flex items-center justify-center bg-proj-white3-300">
            <BiCategoryAlt className="text-5xl" />
            2
          </div>
          <div className="rounded-2xl border-2 p-3 flex items-center justify-center bg-proj-white3-300">
            <BiCategoryAlt className="text-5xl" />
            3
          </div>
          <div className="rounded-2xl border-2 p-3 flex items-center justify-center bg-proj-white3-300">
            <BiCategoryAlt className="text-5xl" />
            4
          </div>
          <div className="rounded-2xl border-2 p-3 flex items-center justify-center bg-proj-white3-300">
            <BiCategoryAlt className="text-5xl" />
            5
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScrollingIcons;
