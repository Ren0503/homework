import * as actTypes from "../../constants";

const initialState = {
  isLoading: false,
  listDocs: [],
  err: null,
  detailDocs:null,
  isLoadingDetailDocs:false
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actTypes.GET_LIST_DOCUMENT_USER_REQUEST:
      return { ...state, isLoading: true };

    case actTypes.GET_LIST_DOCUMENT_USER_SUCCESS:
      return { ...state, isLoading: false, listDocs: payload };
    case actTypes.GET_LIST_DOCUMENT_USER_FAILED:
      return { ...state, isLoading: false, err: payload };
      case actTypes.GET_DOCUMENT_BY_ID_REQUEST:
        return {...state, isLoadingDetailDocs:true}
    case actTypes.GET_DOCUMENT_BY_ID_SUCCESS:
      return { ...state, isLoadingDetailDocs: false, detailDocs: payload };
      case actTypes.CLEAR_DATA_USER:
      return {
        ...state,
        isLoading: false,
        listDocs: [],
        err: null,
        detailDocs:null,
        isLoadingDetailDocs:false
      };
    default:
      return { ...state };
  }
};

export default userReducer;
