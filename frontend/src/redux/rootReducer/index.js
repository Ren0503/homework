import { combineReducers } from "redux";
import adminReducer from "../reducers/Admin";
import signinReducer from "../reducers/Signin";
import userReducer from "../reducers/User";

const rootReducer = combineReducers({
    signinReducer,
    adminReducer,
    userReducer,
})

export default rootReducer;