import {
  FETCH_MY_ARTICLES,
  FETCH_ERROR,
  CREATE_NEW_ARTICLE_FAILED,
  UPDATE_ARTICLE_FAILED,
  DELETE_ARTICLE_FAILED,
  DELETE_ARTICLE_SUCCES,
} from "./type";

const initState = {
  articles: [],
  error: null,
  article: null,
};

const articleReducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_MY_ARTICLES:
      return {
        ...state,
        articles: action.payload,
      };

    case DELETE_ARTICLE_SUCCES:
      return {
        ...state,
        articles: state.articles.filter((item) => item.id !== action.payload),
      };
    case FETCH_ERROR:
    case CREATE_NEW_ARTICLE_FAILED:
    case DELETE_ARTICLE_FAILED:
    case UPDATE_ARTICLE_FAILED:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default articleReducer;
