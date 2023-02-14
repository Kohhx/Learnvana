import React, { useState } from "react";
import { Link } from "react-router-dom";

const DropDown = ({ children, configs }) => {
  const [isOpen, setIsOpen] = useState();

  const dropdownContent = (
    <div className="absolute right-0 top-10 w-[250px] rounded-md bg-orange-300 p-4">
      <ul className="flex flex-col">
        {configs.map((config) => {
          let liContent;
          if (config.link) {
            liContent = <Link to={config.link}>{config.name}</Link>;
          } else {
            liContent = <div>{config.button}</div>;
          }
          return <div onClick={() => setIsOpen(false)} className="mb-2">{liContent}</div>;
        })}
      </ul>
    </div>
  );

  return (
    <div className="relative">
      <div onClick={() => setIsOpen(!isOpen)}>{children}</div>
      {isOpen && dropdownContent}
    </div>
  );
};

export default DropDown;
