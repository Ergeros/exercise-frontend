import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { connect } from "react-redux";

import { updateNewArticle } from "../redux/article/actions";

function EditArticle(props) {
  const [newArticle, setNewArticle] = useState({
    title: "",
    perex: "",
    content: "",
    imagePath: "",
  });
  const [fileToUpload, setFileToUpload] = useState(null);
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState(null);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewArticle((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_API_URI}/posts/${props.match.params.id}`
      )
      .then((res) => res.data)
      .then((data) => setNewArticle(data))
      .catch((err) => setError(err.response.data));
  }, []);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else if (form.checkValidity() === true) {
      event.preventDefault();
      event.stopPropagation();
      props.updateNewArticle(newArticle);
    } else {
    }
    setValidated(true);
  };

  return (
    <Container>
      {error && (
        <Alert variant="danger">
          Some error occured. We are sorry. Please try it later or contact our
          support
        </Alert>
      )}
      <Form onSubmit={handleSubmit} noValidate validated={validated}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <h1 className="form-header">Edit article</h1>
          <Button variant="primary" type="submit">
            Publish Article
          </Button>
        </div>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Article Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            placeholder="Awesome Title"
            value={newArticle.title}
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
          <Alert variant="success">Post has been saved successfuly</Alert>
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
  updateNewArticle: (article) => dispatch(updateNewArticle(article)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditArticle);
