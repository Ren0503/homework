import React from "react";
import { useDispatch } from "react-redux";
import {
  deleteDocs,
  fetchListUserUncheck,
  getDocumentsById,
} from "../../redux/actions/Admin";
import * as actionUser from "../../redux/actions/User";

export default function CardItem(props) {
  const { _id, title, createdAt, assigned, status } = props.docs;
  const { isAdmin, setIsEdit, setIsOpen, setIsView } = props;
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    deleteDocs(id);
  };

  const handleAssign = (id) => {
    setIsOpen();
    dispatch(fetchListUserUncheck(id));
    dispatch(getDocumentsById(id));
  };

  const handleViewDocs = (id) => {
    setIsView();
    isAdmin
      ? dispatch(getDocumentsById(id))
      : dispatch(actionUser.getDocumentsById(id));
  };

  const handleUpdate = (id) => {
    setIsEdit();
    dispatch(getDocumentsById(id));
  };
  return (
    <>
      <div className="flex justify-center">
        <div className="block rounded-lg shadow-lg hover:shadow-2xl bg-white max-w-sm w-full">
          <div className="py-2 ms:py-3 bg-blue-primary rounded-sm" />
          <div className="p-3">
            <h5 className="text-gray-900 text-xl font-medium mb-2 w-[120px] sm:w-[150px] lg:w-[100px] line-clamp-2 truncate text-ellipsis overflow-hidden">
              {title}
            </h5>
            <p className="text-gray-700 text-base mb-4">
              {isAdmin
                ? new Date(createdAt).toLocaleDateString("vi-VI")
                : new Date(assigned).toLocaleDateString("vi-VI")}
            </p>
            <div className="flex justify-between dark:text-black">
              <div>
                {isAdmin ? (
                  <button
                    className="hover-icon-table"
                    onClick={() => {
                      handleAssign(_id);
                    }}
                  >
                    <i className="fa-solid fa-users "></i>
                  </button>
                ) : (
                  <p>{status}</p>
                )}
              </div>
              <div>
                {isAdmin && (
                  <button
                    className="mx-1 hover-icon-table"
                    onClick={() => {
                      handleUpdate(_id);
                    }}
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                )}
                <button
                  className="mx-1 hover-icon-table"
                  onClick={() => {
                    handleViewDocs(_id);
                  }}
                >
                  <i className="fa-solid fa-eye " />
                </button>
                {isAdmin && (
                  <button
                    className="mx-1 hover:text-red-500 transition-colors"
                    onClick={() => {
                      handleDelete(_id);
                    }}
                  >
                    <i className="fa-solid fa-trash" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
