import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const Modal = ({ children, isOpen, closeModal}) => {
  // const [isOpenModal, setIsOpenModal] = useState(false)
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
  }, []);

  const modalContent = (
    <div className="fixed h-screen w-screen flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-50" onClick={closeModal}></div>
      <div className="absolute bg-white rounded-lg p-10">{children}</div>
    </div>
  );

  const modelDisplay = isOpen && ReactDOM.createPortal(modalContent, document.getElementById("modal"))

  return modelDisplay
};

export default Modal;
