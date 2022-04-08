import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import ViewDocModal from "../../components/ViewDocModal";
import { getDocumentsById } from "../../redux/actions/User";

const Row = ({ doc, setIsView }) => {
  const dispatch = useDispatch();

  const handleViewDocs = (id) => {
    setIsView();
    dispatch(getDocumentsById(id));
  };

  return (
    <>
      <tr key={doc._id}>
        <td className="border-cell-table">{doc.title}</td>
        <td className="border-cell-table hidden-cell-table">
          {new Date(doc.assigned).toLocaleDateString("vi-VI")}
        </td>
        <td className="border-cell-table">
          <button
            className="hover-icon-table"
            type="button"
            onClick={() => handleViewDocs(doc._id)}
          >
            <i className="fa-solid fa-eye" />
          </button>
        </td>
        <td className="border-cell-table">{doc.status}</td>
      </tr>
    </>
  );
};

export default function UserTable() {
  const listDocument = useSelector(
    (state) => state.userReducer.listDocs.documents
  );
  const [isView, setIsView] = useState(false);

  return (
    <>
      <table className="table-custom">
        <thead className="bg-gray-200 dark:text-blue-primary">
          <tr>
            <th className="border-cell-table">Document Name</th>
            <th className="border-cell-table hidden-cell-table">
              Assigned Date
            </th>
            <th className="border-cell-table">View</th>
            <th className="border-cell-table">Process</th>
          </tr>
        </thead>
        <tbody>
          {listDocument &&
            listDocument.map((doc) => {
              return (
                <Row
                  key={doc._id}
                  doc={doc}
                  setIsView={() => setIsView(!isView)}
                />
              );
            })}
        </tbody>
      </table>
      <ViewDocModal isView={isView} setIsView={setIsView} />
    </>
  );
}
