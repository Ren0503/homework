import axios from "axios";
import Swal from "sweetalert2";
import * as actTypes from "../../constants";

let userToken = "";
if (sessionStorage.getItem("userAccount")) {
  userToken = JSON.parse(sessionStorage.getItem("userAccount")).token;
}

export const fetchListDocsUser = (pageNumber) => {

  return (dispatch) => {
    dispatch(fetchListDocsUserRequest());
   if(userToken) {
    axios({
      url: `${process.env.REACT_APP_API_KEY}/${process.env.REACT_APP_API_URL_USERNORMAL}?pageNumber=${pageNumber}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
      .then((res) => dispatch(fetchListDocsUserSuccess(res.data)))
      .catch((err) => dispatch(fetchListDocsUserFailed(err)));
   }
  };
};

export const getDocumentsById = (id) => {
  return (dispatch) => {
    dispatch(getDocsByIdRequest());
    axios({
      url: `${process.env.REACT_APP_API_KEY}/${process.env.REACT_APP_API_URL}/${id}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
      .then((res) => dispatch(getDocsByIdSuccess(res.data)))
      .catch((err) => console.log(err));
  };
};

export const actConfirm = (id) => {
  return dispatch => {
    axios({
      url: `${process.env.REACT_APP_API_KEY}/${process.env.REACT_APP_API_URL_USERNORMAL}/${id}/confirm`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }).then(() => {
      Swal.fire({
        icon: "success",
        title: "Confirm success",
      }).then((result) => {
        if (result.isConfirmed) {
           window.location.reload();
        }
      });
    });
  }
}

export const actClearData = () => {
  return dispatch => {
    dispatch(clearData());
  }
}

const fetchListDocsUserRequest = () => {
  return {
    type: actTypes.GET_LIST_DOCUMENT_USER_REQUEST,
  };
};

const fetchListDocsUserSuccess = (listDocs) => {
  return {
    type: actTypes.GET_LIST_DOCUMENT_USER_SUCCESS,
    payload: listDocs,
  };
};

const fetchListDocsUserFailed = (err) => {
  return {
    type: actTypes.GET_LIST_DOCUMENT_USER_FAILED,
    payload: err,
  };
};

const getDocsByIdRequest = () => {
  return {
    type: actTypes.GET_DOCUMENT_BY_ID_REQUEST,
  };
};

const getDocsByIdSuccess = (docs) => {
  return {
    type: actTypes.GET_DOCUMENT_BY_ID_SUCCESS,
    payload: docs,
  };
};

const clearData = () => {
  return {
    type: actTypes.CLEAR_DATA_USER
  }
}
