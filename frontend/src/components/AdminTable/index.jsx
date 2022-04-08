import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteDocs,
  fetchListUserUncheck,
  getDocumentsById,
} from "../../redux/actions/Admin";
import AssignUserModal from "../../components/AssignUserModal";
import EditModal from "../../components/EditModal";
import ViewDocModal from "../../components/ViewDocModal";

const Row = (props) => {
  const dispatch = useDispatch();
  const { doc, setIsEdit, setIsOpen, setIsView } = props;

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
    dispatch(getDocumentsById(id));
  };

  const handleUpdate = (id) => {
    setIsEdit();
    dispatch(getDocumentsById(id));
  };

  return (
    <>
      <tr key={doc._id}>
        <td className="border-cell-table">{doc.title}</td>
        <td className="border-cell-table hidden-cell-table">
          {`${new Date(doc.createdAt).toLocaleDateString("vi-VI")}`}
        </td>
        <td className="border-cell-table ">
          <button
            className="hover-icon-table"
            onClick={() => {
              handleAssign(doc._id);
            }}
          >
            <i className="fa-solid fa-users "></i>
          </button>
        </td>
        <td className="border-cell-table whitespace-nowrap">
          <button
            className="mx-1 hover-icon-table"
            onClick={() => {
              handleUpdate(doc._id);
            }}
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
          <button
            className="mx-1 hover-icon-table"
            onClick={() => {
              handleViewDocs(doc._id);
            }}
          >
            <i className="fa-solid fa-eye " />
          </button>
          <button
            className="mx-1 hover:text-red-500 transition-colors"
            onClick={() => {
              handleDelete(doc._id);
            }}
          >
            <i className="fa-solid fa-trash" />
          </button>
        </td>
      </tr>
    </>
  );
};

export default function AdminTable() {
  const listDocument = useSelector(
    (state) => state.adminReducer.listDoc.documents
  );
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isView, setIsView] = useState(false);

  return (
    <>
      <table className="table-custom">
        <thead className="bg-gray-200 dark:text-blue-primary">
          <tr>
            <th className="border-cell-table">Document Name</th>
            <th className="border-cell-table hidden-cell-table">
              Last Update Date
            </th>
            <th className="border-cell-table">Assign</th>
            <th className="border-cell-table">Actions</th>
          </tr>
        </thead>
        <tbody>
          {listDocument &&
            listDocument.map((doc) => {
              return (
                <Row
                  key={doc._id}
                  doc={doc}
                  setIsEdit={()=>setIsEdit(!isEdit)}
                  setIsOpen={()=>setIsOpen(!isOpen)}
                  setIsView={()=>setIsView(!isView)}
                />
              );
            })}
        </tbody>
      </table>
      <AssignUserModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <EditModal isEdit={isEdit} setIsEdit={setIsEdit} />
      <ViewDocModal isView={isView} setIsView={setIsView} />
    </>
  );
}
