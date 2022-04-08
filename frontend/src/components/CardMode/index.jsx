import React, { useState } from "react";
import { useSelector } from "react-redux";
import CardItem from "../CardItem";
import AssignUserModal from "../AssignUserModal";
import EditModal from "../EditModal";
import ViewDocModal from "../ViewDocModal";

export default function CardMode(props) {
  const listAdminDocs = useSelector(
    (state) => state.adminReducer.listDoc.documents
  );
  const listUserDocs = useSelector(
    (state) => state.userReducer.listDocs.documents
  );
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isView, setIsView] = useState(false);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-[90vw] md:w-[80vw] lg:w-[60vw] pb-6 mt-2">
        {sessionStorage.getItem("adminAccount")
          ? listAdminDocs &&
            listAdminDocs.map((docs) => {
              return (
                <CardItem
                  docs={docs}
                  key={docs._id}
                  isAdmin={true}
                  setIsEdit={() => setIsEdit(!isEdit)}
                  setIsOpen={() => setIsOpen(!isOpen)}
                  setIsView={() => setIsView(!isView)}
                />
              );
            })
          : sessionStorage.getItem("userAccount") &&
            listUserDocs &&
            listUserDocs.map((docs) => {
              return (
                <CardItem
                  docs={docs}
                  key={docs._id}
                  isAdmin={false}
                  setIsView={() => setIsView(!isView)}
                />
              );
            })}
        <AssignUserModal isOpen={isOpen} setIsOpen={setIsOpen} />
        <EditModal isEdit={isEdit} setIsEdit={setIsEdit} />
        <ViewDocModal isView={isView} setIsView={setIsView} />
      </div>
    </>
  );
}
