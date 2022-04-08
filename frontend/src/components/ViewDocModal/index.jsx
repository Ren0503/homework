import React from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { actConfirm } from "../../redux/actions/User";
import ModalHeader from "../ModalHeader";

function ViewDocModal(props) {
  const { isView, setIsView } = props;
  const dispatch = useDispatch();


  const urlFiles = useSelector((state) => state.adminReducer.detailDocs?.url);
  const id = useSelector((state) => state.adminReducer.detailDocs?._id);
  const isUser = JSON.parse(sessionStorage.getItem("userAccount"));
  const handledConfirm = (e, id) => {
    e.preventDefault();
    dispatch(actConfirm(id));
  };

  return (
    <>
      <Modal
        isOpen={isView}
        contentLabel="Assign User Modal"
        appElement={document.getElementById("root")}
        className="styled-modal"
        onRequestClose={() => setIsView(false)}
        shouldCloseOnOverlayClick={true}
        overlayClassName="over-play-modal"
      >
        <ModalHeader
          title={"View Document"}
          callback={() => setIsView(false)}
        />
        <div
          id="divIframe"
          className="px-2 h-[70%] w-full md:w-[90%] mx-auto overflow-scroll"
        >
          <iframe
            width="80%"
            src={`${process.env.REACT_APP_API_KEY}/${urlFiles}`}
            title="Documents"
            loading="eager"
            className="w-full h-full border-4 border-gray-200 rounded-lg overflow-auto"
          ></iframe>
        </div>
        {isUser !== null && (
          <div className="text-center mt-4">
            <button
              onClick={(e) => {
                setIsView(false);
                handledConfirm(e, id);
              }}
              className="btn submit-btn disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Confirm
            </button>            
          </div>
        )}
      </Modal>
    </>
  );
}

export default ViewDocModal;
