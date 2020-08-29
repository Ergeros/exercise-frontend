import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import { Pencil, Trash2 } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";

import { deleteArticle, fetchMyArticles } from "../redux/article/actions";

function UserArticleList(props) {
  useEffect(() => {
    props.fetchMyArticles();
  }, []);

  const handleDelete = (articleId) => {
    props.deleteArticle(articleId);
  };
  return (
    <div>
      <div className="show-row">
        <h1>My Articles</h1>
        <Button>
          <Link to="/articles/new" style={{ color: "white" }}>
            Create new article
          </Link>
        </Button>
      </div>
      {props.error && <Alert variant="danger">{props.error.message}</Alert>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Article title</th>
            <th>Perex</th>
            <th>Author</th>
            <th># of comments</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.articles.map((article) => (
            <tr key={article.id}>
              <td></td>
              <td>{article.title}</td>
              <td>{article.perex}</td>
              <td>{article.author}</td>
              <td>{article.author}</td>
              <td>
                <Link to={`/articles/e/${article.id}`}>
                  <Pencil />
                </Link>
                <Button
                  onClick={() => handleDelete(article.id)}
                  variant="light"
                >
                  <Trash2 />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    articles: state.articles.articles,
    error: state.articles.error,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchMyArticles: () => dispatch(fetchMyArticles()),
  deleteArticle: (articleId) => dispatch(deleteArticle(articleId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserArticleList);
