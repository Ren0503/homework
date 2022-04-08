import * as actTypes from "../../constants";

const initialState = {
  isLoadingListDocs: false,
  isLoadingListUser: false,
  isLoadingDetailDocs: false,
  listDoc: [],
  detailDocs: null,
  listUserUnCheck: [],
  error: null,
  listDeleted: [],
  isLoadingListDel: false,
};

const adminReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actTypes.GET_LIST_DOCUMENT_REQUEST:
      return { ...state, isLoadingListDocs: true };
    case actTypes.GET_LIST_DOCUMENT_SUCCESS:
      return { ...state, isLoadingListDocs: false, listDoc: payload };
    case actTypes.GET_LIST_USER_UNCHECK_REQUEST:
      return { ...state, isLoadingListUser: true };
    case actTypes.GET_LIST_USER_UNCHECK_SUCCESS:
      return { ...state, isLoadingListUser: false, listUserUnCheck: payload };
    case actTypes.GET_LIST_USER_UNCHECK_FAILED:
      return { ...state, isLoadingListUser: false, err: payload };
    case actTypes.GET_DOCUMENT_BY_ID_REQUEST:
      return { ...state, isLoadingDetailDocs: true };
    case actTypes.GET_DOCUMENT_BY_ID_SUCCESS:
      return { ...state, isLoadingDetailDocs: false, detailDocs: payload };
    case actTypes.UPLOAD_DOCUMENT_REQUEST:
      return { ...state, isLoadingListDocs: true };
    case actTypes.UPLOAD_DOCUMENT_SUCCESS:
      return { ...state, isLoadingListDocs: false, listDoc: payload };
    case actTypes.UPLOAD_DOCUMENT_FAILED:
      return { ...state, isLoadingListDocs: false, err: payload };
    case actTypes.ASSIGN_USER_REQUEST:
      return { ...state, isLoadingListDocs: true };
    case actTypes.ASSIGN_USER_SUCCESS:
      return { ...state, isLoadingListDocs: false, listDoc: payload };
    case actTypes.ASSIGN_USER_FAILED:
      return { ...state, isLoadingListDocs: false, err: payload };
    case actTypes.GET_LIST_DELETED_REQUEST:
      return { ...state, isLoadingListDel: true };
    case actTypes.GET_LIST_DELETED_SUCCESS:
      return { ...state, isLoadingListDel: false, listDeleted: payload };
    case actTypes.CLEAR_DATA_ADMIN:
      return {
        ...state,
        isLoadingListDocs: false,
        isLoadingListUser: false,
        isLoadingDetailDocs: false,
        listDoc: [],
        detailDocs: null,
        listUserUnCheck: [],
        error: null,
        listDeleted:[],
      };
    default:
      return { ...state };
  }
};

export default adminReducer;
