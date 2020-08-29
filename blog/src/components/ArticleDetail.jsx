import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Alert from "react-bootstrap/Alert";
import List from "components/List";
import Item from "components/List/Item";
import axios from "axios";
const ARTICLE_URL = "http://localhost:8000/posts";

function ArticleDetail({ match: { params } }) {
  const [article, setArticle] = useState({});
  const [comments, setComments] = useState([]);
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
            src={`http://localhost:8000/uploads/${article.imagePath}`}
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
          ></textarea>
        </Item>
        {comments.map((comment) => (
          <Item>
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
export default ArticleDetail;
