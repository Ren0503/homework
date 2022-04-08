import * as actTypes from "../../constants";

const initialState = {
  isLogin: false,
  user: null,
  err: null,
  normalUser: null,
};

const signinReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actTypes.SIGN_IN_REQUEST:
      return { ...state, isLogin: true };

    case actTypes.SIGN_GOOGLE_REQUEST:
      return { ...state, isLogin: true };
    case actTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        isLogin: false,
        normalUser:null,
        user: payload,
      };
    case actTypes.SIGN_GOOGLE_SUCCESS:
      return {
        ...state,
        isLogin: false,
        user:null ,
        normalUser: payload,
      };
    case actTypes.SIGN_IN_FAILED:
      return { ...state, err: payload, isLogin: false };
    case actTypes.SIGN_GOOGLE_FAILED:
      return { ...state, err: payload, isLogin: false };
    default:
      return { ...state };
  }
};

export default signinReducer;
