import React from "react";
import classNames from "classnames";

const CardV1 = ({ children, className }) => {

  const classes = classNames(
    "p-3 border border-proj-grey2-200 bg-proj-white3-200 rounded-[15px]",
    className,  // Other custom classname that comes in as props
  );

  return <div className={classes}>{children}</div>;
};

export default CardV1;
