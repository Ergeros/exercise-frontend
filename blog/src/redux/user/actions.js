import { LOGIN_SUCCESS, LOGIN_FAILED } from "./type";
import axios from "axios";

import history from "../../customHistory";
export const loginUser = (user) => (dispatch) => {
  axios
    .post(process.env.REACT_APP_BASE_API_URI + "/auth/login", user)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      history.push("/");
    })
    .catch((err) => {
      console.log(err);
      return dispatch({
        type: LOGIN_FAILED,
        payload: err.response.data,
      });
    });
};
