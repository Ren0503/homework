import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Avatar from "../../components/Avatar";
import Loading from "../../components/Loading";
import SoftDeleteTable from "../../components/SoftDeleteTable";
import { actClearData, fetchListDeleted } from "../../redux/actions/Admin";

export default function SoftDelete() {
    const [isValid,setIsValid] = useState(false);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.adminReducer.isLoadingListDel);
  const handleLogout = () => {
    sessionStorage.removeItem("adminAccount");
    dispatch(actClearData());
    setIsValid(!isValid);
  };

  useEffect(() => {
    dispatch(fetchListDeleted());
  }, [dispatch]);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : sessionStorage.getItem("adminAccount") ? (
        <div className="container mx-auto  h-[100vh]">
          <div className="avatar">
            <Avatar
              username={"Admin"}
              img={"https://randomuser.me/api/portraits/women/70.jpg"}
            />
            <span className="px-3">||</span>
            <div className="cursor-pointer" onClick={handleLogout}>
              Logout
            </div>
          </div>
          <div className="table-list">
            <SoftDeleteTable />
          </div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
}
