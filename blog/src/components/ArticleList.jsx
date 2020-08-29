import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

const ARTICLE_URL = "http://localhost:8000/posts";

function ArticleList() {
  const [recentArticles, setRecentArticles] = useState([]);

  useEffect(() => {
    axios
      .get(ARTICLE_URL)
      .then((res) => res.data)
      .then((data) => setRecentArticles(data));
  }, []);
  return (
    <Container>
      <div>
        <h2>Recent articles</h2>
      </div>
      <div className="article-list">
        {recentArticles.map((article, index) => (
          <div className="article-item" key={index}>
            <img
              src={`http://localhost:8000/uploads/${article.imagePath}`}
              alt="Girl in a jacket"
              width="272"
              height="244"
            />
            <div className="article-desc">
              <h4>{article.title}</h4>
              <div className="show-row">
                <p>author name</p>
                <p>{article.createdAt}</p>
              </div>
              <div>
                <p>{article.perex}</p>
              </div>
              <div className="show-row">
                <NavLink
                  exact
                  activeClassName="active"
                  to={`/articles/${article.id}`}
                >
                  Read whole article
                </NavLink>
                <p>comments number</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}

export default connect(null, null)(ArticleList);
