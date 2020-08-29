import React from "react";
import { Router, Route } from "react-router-dom";

import "./App.scss";

import store from "redux/store";
import NavigationBar from "components/NavigationBar";
import LoginForm from "components/LoginForm";
import ArticleList from "components/ArticleList";
import NewArticle from "components/NewArticle";
import ArticleDetail from "components/ArticleDetail";
import EditArticle from "components/EditArticle";
import history from "./customHistory";
import { Provider } from "react-redux";
import PrivateRoute from "components/PrivateRoute";
import UserArticleList from "components/UserArticleList";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router history={history}>
          <NavigationBar />

          <Route path="/" exact component={ArticleList} />
          <Route path="/login" component={LoginForm} />
          <PrivateRoute path="/articles" exact component={UserArticleList} />
          <Route path="/articles/new" exact component={NewArticle} />
          <Route path="/articles/a/:id" exact component={ArticleDetail} />
          <Route path="/articles/e/:id" exact component={EditArticle} />
        </Router>
      </Provider>
    </div>
  );
}

export default App;
