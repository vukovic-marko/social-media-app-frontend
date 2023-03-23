import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { NavLink, useNavigate } from 'react-router-dom';


function ProtectedNavbar(props) {

  const [query, setQuery] = useState(null);
  const navigate = useNavigate();

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Social Network</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/profile">
              Profile
            </Nav.Link>
            <Form onSubmit={e => {e.preventDefault(); navigate(`/search/${query}`)}}>
              <Form.Group className="d-flex">
                <Form.Control
                  type="text"
                  name="query"
                  placeholder="Search..."
                  className="me-2"
                  aria-label="Search"
                  onChange={e => {setQuery(e.target.value)}}
                  value={query || ""}
                />
                <Button variant="outline-success" type="submit">Search</Button>
              </Form.Group>
            </Form>
          </Nav>
          <Nav className="ml-auto">
            <Button onClick={e => props.handleLogout(e)}>Logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default ProtectedNavbar