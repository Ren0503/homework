import React from "react";
import { Link } from "react-router-dom";

export default function ChangeToCardBtn(props) {
  const { cardMode, setCardMode } = props;

  const handleChangeCardMode = () => {
    setCardMode();
  };

  return (
    <>
      <div className=" flex justify-end mx-auto w-[90vw] md:w-[80vw] lg:w-[60vw] ">
        <button
          type="button"
          aria-current="page"
          className={
            !cardMode
              ? "bg-blue-600 btn-mode mr-4"
              : "bg-blue-primary btn-mode mr-4"
          }
          onClick={handleChangeCardMode}
        >
          <i className="fa-solid fa-table-list "></i>
        </button>
        <button
          type="button"
          onClick={handleChangeCardMode}
          className={
            !cardMode ? "bg-blue-primary btn-mode" : "bg-blue-600 btn-mode"
          }
        >
          <i className="fa-solid fa-grip "></i>
        </button>
        {sessionStorage.getItem("adminAccount")&&<Link to={"/deleted"} className="bg-blue-primary btn-mode ml-4">
        <i className="fa-solid fa-folder-minus"></i>        
        </Link>}
      </div>
    </>
  );
}
