import React from 'react';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <Container className="mt-3">
      <h1>Not Found</h1>
      <Link to="/">Go Home</Link>
    </Container>
  )
}

export default NotFound