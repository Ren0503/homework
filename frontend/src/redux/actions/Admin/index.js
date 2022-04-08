import axios from "axios";
import Swal from "sweetalert2";
import * as actType from "../../constants";

let adminToken = "";
if (sessionStorage.getItem("adminAccount")) {
  adminToken = JSON.parse(sessionStorage.getItem("adminAccount")).token;
}
export const fetchListDoc = (pageNumber) => {
  return (dispatch) => {
    dispatch(fetchListDocRequest());
    if (adminToken) {
      axios({
        url: `${process.env.REACT_APP_API_KEY}/${process.env.REACT_APP_API_URL}?pageNumber=${pageNumber}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      })
        .then((res) => dispatch(fetchListDocSuccess(res.data)))
        .catch((err) => console.log(err));
    }
  };
};

export const actClearData = () => {
  return (dispatch) => {
    dispatch(clearData());
  };
};

export const fetchListUserUncheck = (id) => {
  return (dispatch) => {
    dispatch(fetchListUserUncheckRequest());
    axios({
      url: `${process.env.REACT_APP_API_KEY}/${process.env.REACT_APP_API_URL_ADMIN}/${id}/users`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    })
      .then((res) => dispatch(fetchListUserUncheckSuccess(res.data)))
      .catch((err) => dispatch(fetchListUserUncheckFailed(err)));
  };
};

export const updateFile = (id, newFiles) => {
  let adminToken = "";
  if (sessionStorage.getItem("adminAccount")) {
    adminToken = JSON.parse(sessionStorage.getItem("adminAccount")).token;
  }
  axios({
    url: `${process.env.REACT_APP_API_KEY}/${process.env.REACT_APP_API_URL}/${id}`,
    method: "PUT",
    data: newFiles,
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  }).then(() => {
    Swal.fire("Update success!", "", "success").then((res) => {
      if (res.isConfirmed) {
        window.location.reload();
      }
    });
  });
};

export const deleteDocs = (id) => {
  Swal.fire({
    title: "DELETE !!?",
    text: "Are you sure about that ?",
    icon: "warning",
    confirmButtonText: "Delete",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "gray",
  }).then((result) => {
    if (result.isConfirmed) {
      let adminToken = "";
      if (sessionStorage.getItem("adminAccount")) {
        adminToken = JSON.parse(sessionStorage.getItem("adminAccount")).token;
      }
      axios({
        url: `${process.env.REACT_APP_API_KEY}/${process.env.REACT_APP_API_URL}/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      })
        .then(() => {
          Swal.fire("Delete completed!", "", "success").then((res) => {
            if (res.isConfirmed) {
              window.location.reload();
            }
          });
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: `${error.response.data}`,
          });
        });
    }
  });
};

export const getDocumentsById = (id) => {
  return (dispatch) => {
    dispatch(getDocsByIdRequest());
    axios({
      url: `${process.env.REACT_APP_API_KEY}/${process.env.REACT_APP_API_URL}/${id}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    })
      .then((res) => dispatch(getDocsByIdSuccess(res.data)))
      .catch((err) => console.log(err));
  };
};

export const uploadDocument = (data) => {
  return (dispatch) => {
    dispatch(uploadDocumentRequest());
    axios({
      url: `${process.env.REACT_APP_API_KEY}/${process.env.REACT_APP_API_URL}`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
      data,
    })
      .then((res) => {
        dispatch(uploadDocumentSuccess(res.data));
        Swal.fire("Upload success!", "", "success").then((res) => {
          if (res.isConfirmed) {
            window.location.reload();
          }
        });
      })
      .catch((err) => dispatch(uploadDocumentFailed(err)));
  };
};

export const assignUser = (id, userIds) => {
  return (dispatch) => {
    dispatch(assignUserRequest());
    axios({
      url: `${process.env.REACT_APP_API_KEY}/${process.env.REACT_APP_API_URL_ADMIN}/${id}/assign`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
      data: {
        userIds: userIds,
      },
    })
      .then((res) => {
        dispatch(assignUserSuccess(res.data));
        Swal.fire("Assign success!", "", "success").then((res) => {
          if (res.isConfirmed) {
            window.location.reload();
          }
        });
      })
      .catch((err) => dispatch(assignUserFailed(err)));
  };
};

export const fetchListDeleted = () => {
  return (dispatch) => {
    dispatch(fetchListDeletedRequest());

    axios({
      url: `${process.env.REACT_APP_API_KEY}/${process.env.REACT_APP_API_URL}/deleted`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    }).then((res) => dispatch(fetchListDeletedSuccess(res.data)));
  };
};

export const actRestoreFile = id => {
  return dispatch => {
    axios({
      url: `${process.env.REACT_APP_API_KEY}/${process.env.REACT_APP_API_URL}/${id}`,
      method:'PATCH',
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    })
    .then( Swal.fire("Restore success!", "", "success").then((res) => {
      if (res.isConfirmed) {
        window.location.reload();
      }
    }));
  }
}

const fetchListDocRequest = () => {
  return {
    type: actType.GET_LIST_DOCUMENT_REQUEST,
  };
};

const fetchListDocSuccess = (listDoc) => {
  return {
    type: actType.GET_LIST_DOCUMENT_SUCCESS,
    payload: listDoc,
  };
};

const fetchListUserUncheckRequest = () => {
  return {
    type: actType.GET_LIST_USER_UNCHECK_REQUEST,
  };
};

const fetchListUserUncheckSuccess = (users) => {
  return {
    type: actType.GET_LIST_USER_UNCHECK_SUCCESS,
    payload: users,
  };
};

const fetchListUserUncheckFailed = (err) => {
  return {
    type: actType.GET_LIST_USER_UNCHECK_FAILED,
    payload: err,
  };
};

const getDocsByIdRequest = () => {
  return {
    type: actType.GET_DOCUMENT_BY_ID_REQUEST,
  };
};

const getDocsByIdSuccess = (docs) => {
  return {
    type: actType.GET_DOCUMENT_BY_ID_SUCCESS,
    payload: docs,
  };
};

const uploadDocumentRequest = () => {
  return {
    type: actType.UPLOAD_DOCUMENT_REQUEST,
  };
};

const uploadDocumentSuccess = (docs) => {
  return {
    type: actType.UPLOAD_DOCUMENT_SUCCESS,
    payload: docs,
  };
};

const uploadDocumentFailed = () => {
  return {
    type: actType.UPLOAD_DOCUMENT_FAILED,
  };
};

const assignUserRequest = (user) => {
  return {
    type: actType.ASSIGN_USER_REQUEST,
    payload: user,
  };
};

const assignUserSuccess = (user) => {
  return {
    type: actType.ASSIGN_USER_SUCCESS,
    payload: user,
  };
};

const assignUserFailed = (err) => {
  return {
    type: actType.ASSIGN_USER_FAILED,
    payload: err,
  };
};

const clearData = () => {
  return {
    type: actType.CLEAR_DATA_ADMIN,
  };
};

const fetchListDeletedRequest = () => {
  return {
    type: actType.GET_LIST_DELETED_REQUEST,
  };
};

const fetchListDeletedSuccess = (list) => {
  return {
    type: actType.GET_LIST_DELETED_SUCCESS,
    payload: list,
  };
};

