import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

const DropDown = ({ children, configs }) => {
  const dropdownDivEl = useRef();
  const [isOpen, setIsOpen] = useState();
  console.log(isOpen);

  useEffect(() => {
    const handler = (event) => {
      if (
        dropdownDivEl.current &&
        !dropdownDivEl.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handler, true);

    return () => {
      document.removeEventListener("click", handler, true);
    };
  }, []);

  console.log("Render");

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
          return (
            <div onClick={() => setIsOpen(false)} className="mb-2 w-fit">
              {liContent}
            </div>
          );
        })}
      </ul>
    </div>
  );

  return (
    <div className="relative" ref={dropdownDivEl}>
      <div onClick={() => setIsOpen((prev) => !prev)}>{children}</div>

      <CSSTransition
        in={isOpen}
        timeout={400}
        classNames="grow" // Classes for css transition in index.css
        unmountOnExit
      >
        {dropdownContent}
      </CSSTransition>
    </div>
  );
};

export default DropDown;
