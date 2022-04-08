import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { actRestoreFile } from "../../redux/actions/Admin";

const Row = () => {
  const dispatch = useDispatch();
  const listDel = useSelector(
    (state) => state.adminReducer.listDeleted.documents
  );
  const handleDelete = (id) => {
    dispatch(actRestoreFile(id));
  };

  return (
    <>
      {listDel &&
        listDel.map((doc) => {
          return (
            <tr key={doc._id}>
              <td className="border-cell-table">{doc.title}</td>
              <td className="border-cell-table hidden-cell-table">
                {new Date(doc.createdAt).toLocaleDateString("vi-VI")}
              </td>
              <td className="border-cell-table whitespace-nowrap">
                <button
                  className="mx-1 hover:text-red-500 transition-colors"
                  onClick={() => {
                    handleDelete(doc._id);
                  }}
                >
                  <i className="fa-solid fa-recycle"></i>
                </button>
              </td>
            </tr>
          );
        })}
    </>
  );
};

export default function SoftDeleteTable() {
  return (
    <>
      <table className="table-custom">
        <thead className="bg-gray-200 dark:text-blue-primary">
          <tr>
            <th className="border-cell-table">Document Name</th>
            <th className="border-cell-table hidden-cell-table">Delete Date</th>
            <th className="border-cell-table">Actions</th>
          </tr>
        </thead>
        <tbody>
          <Row />
        </tbody>
      </table>
      <div className="mt-4">
        <Link className="btn" to={"/admin/1"}>
          Come back!
        </Link>
      </div>
    </>
  );
}
