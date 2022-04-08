import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { actClearData, fetchListDocsUser } from "../../redux/actions/User";
import UserTable from "../../components/UserTable";
import CardMode from "../../components/CardMode";
import Pagination from "../../components/Pagination";
import ChangeToCardBtn from "../../components/ChangeToCardBtn";
import Loading from "../../components/Loading";
import Toggle from "../../components/ThemeToggle";

function User() {
  const [cardMode, setCardMode] = useState(false);
  const dispatch = useDispatch();
  const { page } = useParams();
  const totalPages = useSelector((state) => state.userReducer.listDocs.pages);
  const loading = useSelector((state) => state.userReducer.isLoading);

  useEffect(() => {
    if(sessionStorage.getItem("userAccount")) {
      dispatch(fetchListDocsUser(page));
    }
  }, [dispatch, page]);

  const handleLogout = () => {
    sessionStorage.removeItem("userAccount");
    localStorage.removeItem("color-theme");
    dispatch(actClearData());
  };

  if (sessionStorage.getItem("userAccount")) {
    const imgUser = JSON.parse(sessionStorage.getItem("userAccount")).avatar;
    const userName = JSON.parse(sessionStorage.getItem("userAccount")).name;
    return (
      <>
        {loading ? (
          <Loading />
        ) : (
          <div className="container mx-auto">
            <div className="avatar">
              <Avatar username={userName} img={imgUser} />
              <span className="px-3">||</span>
              <div className="cursor-pointer" onClick={handleLogout}>
                Logout
              </div>
              <Toggle/>
            </div>
            <div className="table-list">
              <div>
                <ChangeToCardBtn
                  cardMode={cardMode}
                  setCardMode={() => setCardMode(!cardMode)}
                />
                {!cardMode ? (
                  <>
                    <UserTable />
                    <nav className="flex justify-center mb-2">
                      <Pagination page={page} pages={totalPages} />
                    </nav>
                  </>
                ) : (
                  <>
                    <CardMode />
                    <nav className="flex justify-center mb-2">
                      <Pagination page={page} pages={totalPages} />
                    </nav>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
  return <Navigate to="/" />;
}

export default User;
