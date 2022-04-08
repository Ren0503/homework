import React, { useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { assignUser } from "../../redux/actions/Admin";
import ModalHeader from "../ModalHeader";

function AssignUserModal(props) {
  const [listUserId, setListUserId] = useState([]);
  const { isOpen, setIsOpen } = props;
  const isLoading = useSelector(
    (state) => state.adminReducer.isLoadingListUser
  );
  const listUserUncheck = useSelector(
    (state) => state.adminReducer.listUserUnCheck
  );
  const id = useSelector((state) => state.adminReducer.detailDocs?._id);
  // console.log(id);
  const dispatch = useDispatch();
  // console.log(listUserUncheck.length);

  const handleChange = (id, e) => {
    const { checked } = e.target;
    if (checked) {
      setListUserId([...listUserId, id]);
    } else {
      setListUserId(listUserId.filter((item) => item !== id));
    }
  };
  return (
    <>
      <Modal
        isOpen={isOpen}
        contentLabel="Assign User Modal"
        appElement={document.getElementById("root")}
        className=" styled-modal"
        onRequestClose={() => setIsOpen(false)}
        shouldCloseOnOverlayClick={true}
        overlayClassName="over-play-modal "
      >
        <ModalHeader title={"Assign User"} callback={() => setIsOpen(false)} />
        <div className="px-4">
          {isLoading ? (
            <div className="animate-spin border-solid border-[5px] border-t-[5px] border-[#f3f3f3] border-t-blue-primary w-[40px] h-[40px] rounded-[50%] mx-auto"></div>
          ) : listUserUncheck.length > 0 ? (
            <table className="w-full table-auto text-center">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border-cell-table">User</th>
                  <th className="w-1/4 border-cell-table">Confirm</th>
                </tr>
              </thead>
              <tbody>
                {listUserUncheck?.map((users) => {
                  return (
                    <tr key={users._id}>
                      <td className="border-cell-table">{users.name}</td>
                      <td className="border-cell-table">
                        <input
                          type="checkbox"
                          className=""
                          onChange={(e) => {
                            handleChange(users._id, e);
                          }}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-4xl text-blue-400">
              All user were assigned ~<br />
              Nothing to do here ~
            </p>
          )}
          <button
            onClick={() => {
              const formData = new FormData();
              formData.append("userIds", listUserId);
              dispatch(assignUser(id, listUserId));
              setIsOpen(false);
            }}
            {...(listUserUncheck.length > 0
              ? { disabled: false }
              : { disabled: true })}
            className="btn-custom-primary btn w-full mt-4 disabled:opacity-0 disabled:cursor-not-allowed"
          >
            Confirm
          </button>
        </div>
      </Modal>
    </>
  );
}

export default AssignUserModal;
