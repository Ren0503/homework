import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import AdminTable from "../../components/AdminTable";
import Avatar from "../../components/Avatar";
import CardMode from "../../components/CardMode";
import ChangeToCardBtn from "../../components/ChangeToCardBtn";
import Loading from "../../components/Loading";
import Pagination from "../../components/Pagination";
import Toggle from "../../components/ThemeToggle";
import UploadButton from "../../components/UploadButton";
import {
  actClearData,
  fetchListDoc,
  uploadDocument,
} from "../../redux/actions/Admin";

function Admin() {
  const [isFilePicker, setFilePicker] = useState(null);
  const [cardMode, setCardMode] = useState(false);
  const { page } = useParams();

  const dispatch = useDispatch();

  const totalPages = useSelector((state) => state.adminReducer.listDoc.pages);
  const loading = useSelector((state) => state.adminReducer.isLoadingListDocs);

  const handleLogout = () => {
    sessionStorage.removeItem("adminAccount");
    localStorage.removeItem("color-theme");
    dispatch(actClearData());
  };

  useEffect(() => {
    dispatch(fetchListDoc(page));
  }, [dispatch, page]);

  if (sessionStorage.getItem("adminAccount")) {
    return (
      <>
        {!loading ? (
          <div className="container mx-auto">
            <div className="avatar">
              <Avatar
                username={"Admin"}
                img={"https://randomuser.me/api/portraits/women/70.jpg"}
              />
              <span className="px-3">||</span>
              <div className="cursor-pointer" onClick={handleLogout}>
                Logout
              </div>
              <Toggle/>
            </div>
            <div className="table-list">
              <ChangeToCardBtn
                cardMode={cardMode}
                setCardMode={() => {
                  setCardMode(!cardMode);
                }}
              />

              {!cardMode ? (
                <>
                  <AdminTable />
                  <nav className="flex justify-center mb-2">
                    <Pagination page={page} pages={totalPages} />
                  </nav>
                  <div className=" w-[90vw] md:w-[80vw] lg:w-[60vw]">
                    <UploadButton
                      setFilePicker={setFilePicker}
                      isFilePicker={isFilePicker}
                      showBtn={true}
                      callback={() => {
                        const formData = new FormData();
                        formData.append("file", isFilePicker);
                        dispatch(uploadDocument(formData));
                      }}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className=" w-[90vw] md:w-[80vw] lg:w-[60vw] my-4">
                    <UploadButton
                      setFilePicker={setFilePicker}
                      isFilePicker={isFilePicker}
                      showBtn={true}
                      callback={() => {
                        const formData = new FormData();
                        formData.append("file", isFilePicker);
                        dispatch(uploadDocument(formData));
                      }}
                    />
                  </div>
                  <CardMode />
                  <nav className="flex justify-center mb-2">
                    <Pagination page={page} pages={totalPages} />
                  </nav>
                </>
              )}
            </div>
          </div>
        ) : (
          <Loading />
        )}
      </>
    );
  }
  return <Navigate to="/" />;
}

export default Admin;
