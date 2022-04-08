import React from "react";

function ModalHeader(props) {
  const { title, callback } = props;
  return (
    <>
      <div className="flex flex-shrink-0 items-center justify-between pt-6 p-4 mb-8 border-gray-200 rounded-t-md">
        <h5
          className="text-xl font-medium leading-normal text-gray-800"
          id="exampleModalLongLabel"
        >
          {title}
        </h5>
        <button
          type="button"
          className="btn-close-modal "
          onClick={callback}
        >
          <i className="fa-solid fa-x" />
        </button>
      </div>
    </>
  );
}

export default ModalHeader;
