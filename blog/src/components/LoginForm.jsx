import React, { useState } from "react";
import { connect } from "react-redux";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { loginUser } from "redux/user/actions";

function LoginForm(props) {
  const [user, setUser] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Container>
      <Form className="custom-form">
        <h1 className="form-header">Log In</h1>
        {props.error && <Alert variant="danger">{props.error.message}</Alert>}
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name="email"
            type="email"
            placeholder="me@example.com"
            value={user.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="**********"
            value={user.password}
            onChange={handleChange}
          />
        </Form.Group>
        <div className="position-right">
          <Button
            variant="primary"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              props.loginUser(user);
            }}
          >
            Log In
          </Button>
        </div>
      </Form>
    </Container>
  );
}
const mapStateToProps = (state) => {
  return {
    error: state.user.loginError,
  };
};

const mapDispatchToProps = (dispatch) => ({
  loginUser: (user) => dispatch(loginUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
