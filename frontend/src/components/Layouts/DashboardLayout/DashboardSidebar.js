import React from "react";
import { Link, NavLink } from "react-router-dom";
import LearnvanaLogo from "../../../images/LearnvanaLogo.png";

const DashboardSidebar = ({ sideBarConfig }) => {
  const sideBarLinks = sideBarConfig.map((config) => {
    if (!config.end) {
      return (
        <div>
          {!config.button ? (
            <NavLink
              to={config.link}
              className="flex gap-5 items-center text-3xl hover:scale-105 transition-all mb-7"
            >
              {config.icon && config.icon}
              <h4 className="text-proj-grey3-300">{config.name}</h4>
            </NavLink>
          ) : (
            <button
              className="flex gap-5 items-center text-3xl hover:scale-105 transition-all mb-7"
              onClick={config.handleClick}
            >
              {config.icon && config.icon}
              <h4 className="text-proj-grey3-300">{config.name}</h4>
            </button>
          )}
        </div>
      );
    } else {
      return (
        <div className="grow flex">
          <NavLink
            to={config.link}
            className="flex gap-5 items-center text-3xl hover:scale-105 transition-all mb-7 self-end"
          >
            {config.icon && config.icon}
            <h4 className="text-proj-grey3-300">{config.name}</h4>
          </NavLink>
        </div>
      );
    }
  });

  return (
    <>
      <div className="w-full h-full mx-auto flex flex-col px-3">
        <Link to="/">
          <div className="mx-auto flex items-center gap-4 mb-12">
            <img className="max-w-[3rem]" src={LearnvanaLogo} alt="" />
            <h1 className="text-[1.8rem] font-kaisei font-normal">Learnvana</h1>
          </div>
        </Link>
        {sideBarLinks}
      </div>
    </>
  );
};

export default DashboardSidebar;
