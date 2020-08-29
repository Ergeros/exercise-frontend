import { LOGIN_SUCCESS, LOGIN_FAILED } from "./type";

const initState = {
  token: "",
  user: null,
  loginError: null,
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        loginError: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
