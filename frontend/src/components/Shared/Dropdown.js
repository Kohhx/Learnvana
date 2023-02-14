import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const DropDown = ({ children, configs }) => {
  const dropdownDivEl = useRef();
  // const dropdownUlEl = useRef();
  const [isOpen, setIsOpen] = useState();

  useEffect(() => {
    const handler = (event) => {
      if (!dropdownDivEl.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handler, true);

    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);

  const dropdownContent = (
    <div
      className="absolute right-0 top-10 w-[250px] rounded-md bg-orange-300 p-4"
      ref={dropdownDivEl}
    >
      <ul className="flex flex-col">
        {configs.map((config) => {
          let liContent;
          if (config.link) {
            liContent = <Link to={config.link}>{config.name}</Link>;
          } else {
            liContent = <div>{config.button}</div>;
          }
          return (
            <div  onClick={() => setIsOpen(false)} className="mb-2 w-fit">
              {liContent}
            </div>
          );
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
