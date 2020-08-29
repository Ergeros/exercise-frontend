import axios from "axios";
import history from "../../customHistory";
import {
  FETCH_MY_ARTICLES,
  FETCH_ERROR,
  CREATE_NEW_ARTICLE_SUCCESS,
  CREATE_NEW_ARTICLE_FAILED,
  UPDATE_ARTICLE_SUCCESS,
  UPDATE_ARTICLE_FAILED,
  DELETE_ARTICLE_SUCCES,
  DELETE_ARTICLE_FAILED,
} from "./type";
import authHeader from "../../helpers/authHeader";

const defaultURL = process.env.REACT_APP_BASE_API_URI;

const options = {
  headers: authHeader(),
};

export const fetchMyArticles = () => (dispatch) => {
  axios
    .get(defaultURL + "/posts/u/posts", options)
    .then((res) => {
      dispatch({
        type: FETCH_MY_ARTICLES,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: FETCH_ERROR,
        payload: err.response.data,
      });
    });
};

export const createNewArticle = (article, fileToUpload) => (dispatch) => {
  var formData = new FormData();
  formData.append("image", fileToUpload);
  axios({
    method: "post",
    url: "http://localhost:8000/uploads/",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => res.data)
    .then((file) => {
      article.imagePath = file.filename;
      dispatch(saveArticle(article));
    })
    .catch((err) => console.log(err.response));
};

export const updateNewArticle = (article) => (dispatch) => {
  axios
    .post(`${defaultURL}/posts`, article, options)
    .then((res) => res.data)
    .then((data) => {
      dispatch({
        type: UPDATE_ARTICLE_SUCCESS,
        payload: data,
      });
    })
    .catch((err) => {
      dispatch({
        type: UPDATE_ARTICLE_FAILED,
        payload: err.response.data,
      });
    });
};

export const deleteArticle = (articleId) => (dispatch) => {
  axios
    .delete(`${defaultURL}/posts/${articleId}`, options)
    .then((res) => res.data)
    .then((data) =>
      dispatch({ type: DELETE_ARTICLE_SUCCES, payload: articleId })
    )
    .catch((err) =>
      dispatch({ type: DELETE_ARTICLE_FAILED, payload: err.response.data })
    );
};

const saveArticle = (article) => (dispatch) => {
  axios
    .post(`${defaultURL}/posts`, article, options)
    .then((res) => res.data)
    .then((data) => {
      dispatch({
        type: CREATE_NEW_ARTICLE_SUCCESS,
        payload: data,
      });
      history.push("/articles");
    })
    .catch((err) => {
      dispatch({
        type: CREATE_NEW_ARTICLE_FAILED,
        payload: err.response.data,
      });
    });
};
