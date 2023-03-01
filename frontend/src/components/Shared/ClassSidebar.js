import React from "react";
import { Link } from "react-router-dom";

const ClassSidebar = ({ sideBarConfig }) => {
  const sideBarLinksContent = sideBarConfig.map((config, index) => {
    return (
      <li className="mb-2" key={index}>
        <Link to={config.link}>{config.name}</Link>
      </li>
    );
  });

  return (
    <aside className="min-h-screen w-[13%] bg-orange-400 p-3">
      <ul className="flex flex-col">{sideBarLinksContent}</ul>
    </aside>
  );
};

export default ClassSidebar;
