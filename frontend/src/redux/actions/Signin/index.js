import axios from "axios";
import Swal from "sweetalert2";
import * as actTypes from "../../constants";

const actionSignin = (user, navigate) => {
  const URL = "api/admin/login";
  return (dispatch) => {
    dispatch(getUserRequest());
    axios({
      url: `${process.env.REACT_APP_API_KEY}/${URL}`,
      method: "POST",
      data: user,
    })
      .then((res) => {
        dispatch(getUserSuccess(res.data));
        sessionStorage.setItem("adminAccount", JSON.stringify(res.data));
        Swal.fire({
          icon: "success",
          title: "Login success",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/admin/1", { replace: true });
          }
        });
      })
      .catch((error) => {
        dispatch(getUserFailed(error));
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Login failed",
          text: error.response.data.message,
        });
      });
  };
};

export const actionGoogleSign = (user, navigate) => {
  const URL = "api/user/login";
  return (dispatch) => {
    dispatch(getNormalUserRequest());
    axios({
      url: `${process.env.REACT_APP_API_KEY}/${URL}`,
      method: "POST",
      data: user,
    })
      .then((res) => {
        dispatch(getNormalUserSuccess(res.data));
        sessionStorage.setItem("userAccount", JSON.stringify(res.data));
        Swal.fire({
          icon: "success",
          title: "Login success",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/user/1", { replace: true });
          }
        });
      })
      .catch((err) => {
        dispatch(getNormalUserFailed(err));
        console.log(err);
      });
  };
};

const getNormalUserSuccess = (normalUser) => {
  return {
    type: actTypes.SIGN_GOOGLE_SUCCESS,
    payload: normalUser,
  };
};

const getNormalUserRequest = () => {
  return {
    type: actTypes.SIGN_GOOGLE_REQUEST,
  };
};

const getNormalUserFailed = (err) => {
  return {
    type: actTypes.SIGN_GOOGLE_FAILED,
    payload: err,
  };
};

const getUserRequest = () => {
  return {
    type: actTypes.SIGN_IN_REQUEST,
  };
};

const getUserSuccess = (user) => {
  return {
    type: actTypes.SIGN_IN_SUCCESS,
    payload: user,
  };
};

const getUserFailed = (err) => {
  return {
    type: actTypes.SIGN_IN_FAILED,
    payload: err,
  };
};

export default actionSignin;
