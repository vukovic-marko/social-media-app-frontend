import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useAuth } from '../auth/AuthProvider';

function ChangeEmailForm() {

  const [inputs, setInputs] = useState({}); 
  const {user} = useAuth();

  const handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = e => {
    e.preventDefault();

    axios.put('user/email',
    inputs,
    {headers:{"Authorization" : `Bearer ${user}`}}
    )
    .then(resp => {
      setInputs({})
      window.location.reload();
    })
    .catch(err => {
      alert("Fields must not be empty.")
    })
  }

  return (
    <Form onSubmit={handleSubmit}>
        <Form.Label>Change Email</Form.Label>
        <Form.Group className="d-flex">
          <Form.Control
            type="email"
            placeholder="Email"
            className="me-2"
            aria-label="Email"
            name="email"
            onChange={handleChange}
            value={inputs.email || ""}
          />
          <Button variant="outline-success" type="submit">Change</Button>
        </Form.Group>
      </Form>
  )
}

export default ChangeEmailForm