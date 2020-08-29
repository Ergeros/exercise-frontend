import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Image from "react-bootstrap/Image";

const showIfUserIsLogIn = () => {
  return (
    <Navbar.Collapse>
      <Navbar.Text>
        <Nav.Link as={Link} to="/articles">
          My Articles
        </Nav.Link>
      </Navbar.Text>
      <Navbar.Text>
        <Nav.Link as={Link} to="/articles/new">
          Create Article
        </Nav.Link>
      </Navbar.Text>

      <Image src="avatar.jpeg" roundedCircle width="33" height="33" />
    </Navbar.Collapse>
  );
};

function NavigationBar({ user }) {
  return (
    <Navbar bg="light" variant="light">
      <Navbar.Brand as={Link} to="/">
        <img
          src="/logo.png"
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="Super logo"
        />
      </Navbar.Brand>
      <Nav>
        <Navbar.Text>
          <Nav.Link as={Link} to="/">
            Recent Articles
          </Nav.Link>
        </Navbar.Text>
        <Navbar.Text>
          <Nav.Link href="#features">About</Nav.Link>
        </Navbar.Text>

        {!user && (
          <Navbar.Text>
            <Nav.Link as={Link} to="/login">
              Log in
            </Nav.Link>
          </Navbar.Text>
        )}

        {user && showIfUserIsLogIn()}
      </Nav>
    </Navbar>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};

export default connect(mapStateToProps, null)(NavigationBar);
