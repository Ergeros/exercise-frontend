import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Alert from "react-bootstrap/Alert";
import List from "components/List";
import Item from "components/List/Item";
import Button from "react-bootstrap/Button";
import authHeader from "../helpers/authHeader";
import axios from "axios";
import { connect } from "react-redux";

const ARTICLE_URL = `${process.env.REACT_APP_BASE_API_URI}/posts`;

function ArticleDetail({ match: { params }, user }) {
  const [article, setArticle] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const [error, setError] = useState(null);
  useEffect(() => {
    axios
      .get(`${ARTICLE_URL}/${params.id}`)
      .then((res) => res.data)
      .then((data) => setArticle(data))
      .catch((err) => err.response)
      .catch((response) => setError(response.data));
    axios
      .get(`${ARTICLE_URL}/${params.id}/comments`)
      .then((res) => res.data)
      .then((data) => setComments(data))
      .catch((err) => err.response)
      .catch((response) => setError(response.data));
  }, []);

  const handleCommentSubmit = () => {
    let author = "";
    if (user) {
      author = `${user.firstName} ${user.lastName}`;
    }
    axios
      .post(
        `${ARTICLE_URL}/${params.id}/comments`,
        { content: newComment, author },
        { headers: authHeader() }
      )
      .then((res) => res.data)
      .then((data) => {
        setComments((prevState) => [...prevState, data]);
        setNewComment("");
      })
      .catch((err) => setError(err.response.data));
  };
  return (
    <Container>
      {error && <Alert variant="danger">{error.message}</Alert>}
      <article
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <h1>{article.title}</h1>
        <div className="show-row">
          <div>author name</div>
          <div>{article.createdAt}</div>
        </div>
        {article.imagePath && (
          <img
            src={`${process.env.REACT_APP_BASE_API_URI}/uploads/${article.imagePath}`}
            alt="Probably super cute kitty"
          />
        )}
        <p>{article.content}</p>
      </article>
      <div style={{ display: "flex" }}>
        <h4>Comments()</h4>
      </div>
      <List>
        <Item>
          <Image src="/logo.png" className="user-avatar" roundedCircle />
          <textarea
            className="add-comment"
            placeholder="Join the discussion"
            value={newComment}
            onChange={(e) => {
              const { value } = e.target;
              setNewComment(value);
            }}
          ></textarea>
        </Item>
        <Button variant="primary" type="submit" onClick={handleCommentSubmit}>
          Comment
        </Button>
        {comments.map((comment, index) => (
          <Item key={index}>
            <Image src="/logo.png" className="user-avatar" roundedCircle />
            <div style={{ flexDirection: "column" }}>
              <div className="show-row">
                <div>{comment.author}</div>
                <div>{comment.createdAt}</div>
              </div>
              <div>
                <div>{comment.content}</div>
              </div>
            </div>
          </Item>
        ))}
      </List>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};

export default connect(mapStateToProps, null)(ArticleDetail);
