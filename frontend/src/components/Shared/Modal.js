import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const Modal = ({ children, isOpen, closeModal }) => {

  // This is prevent content behind of overlay from moving when modal is displayed
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  const modalContent = (
    <div className="fixed h-screen w-screen flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={closeModal}
      ></div>
      <div className="absolute bg-white rounded-lg p-10">{children}</div>
    </div>
  );

  const modelDisplay =
    isOpen &&
    ReactDOM.createPortal(modalContent, document.getElementById("modal"));

  return modelDisplay;
};

export default Modal;
