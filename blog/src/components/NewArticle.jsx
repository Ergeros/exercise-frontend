import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { connect } from "react-redux";

import { createNewArticle } from "../redux/article/actions";

function NewArticle(props) {
  const [newArticle, setNewArticle] = useState({
    title: "",
    perex: "",
    content: "",
    imagePath: "",
  });
  const [fileToUpload, setFileToUpload] = useState(null);
  const [validated, setValidated] = useState(false);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewArticle((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else if (form.checkValidity() === true) {
      event.preventDefault();
      event.stopPropagation();
      props.createNewArticle(newArticle, fileToUpload);
    } else {
    }
    setValidated(true);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit} noValidate validated={validated}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <h1 className="form-header">Create new article</h1>
          <Button variant="primary" type="submit">
            Publish Article
          </Button>
        </div>
        <Form.Group controlId="formTitle">
          <Form.Label>Article Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            placeholder="Awesome Title"
            onChange={handleChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            Which is worse: Hell or article without title?
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formImage">
          <Form.Label>Featured Image</Form.Label>
          <Form.Control
            type="file"
            custom
            onChange={(e) => setFileToUpload(e.target.files[0])}
            required
          />
          <Form.Control.Feedback type="invalid">
            My imagination will get me a passport to hell one day or article
            without image. Take care, your lovely evil.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formPerex">
          <Form.Label>Perex</Form.Label>
          <Form.Control
            as="textarea"
            name="perex"
            placeholder="Write your awesome perex. Yay!"
            value={newArticle.perex}
            onChange={handleChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            The best way to write your article is to create a perex.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formContent">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            name="content"
            placeholder="Supports markdown. Yay!"
            value={newArticle.content}
            onChange={handleChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            Sir, you have serious problem.
          </Form.Control.Feedback>
        </Form.Group>
        {props.error && (
          <Alert variant="success">Well Well Well {props.error.message}</Alert>
        )}
      </Form>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    error: state.articles.error,
  };
};

const mapDispatchToProps = (dispatch) => ({
  createNewArticle: (article, fileToUpload) =>
    dispatch(createNewArticle(article, fileToUpload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewArticle);
