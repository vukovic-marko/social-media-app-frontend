import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useAuth } from '../auth/AuthProvider';

function CreatePostForm() {

  const [inputs, setInputs] = useState({});
  const {user} = useAuth();

  const handleSubmit = e => {
    e.preventDefault();

    axios.post('user/post',
    inputs,
    {headers:{"Authorization" : `Bearer ${user}`}}
    )
    .then(resp => {
      console.log(resp.data)
      setInputs({})
    })
    .catch(err => {
      alert("Post content must not be empty.")
    })
  }

  const handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  return (
    <Container className="mt-3">
      <Form onSubmit={handleSubmit} className="m-auto w-50">
        

        <Form.Group className="mb-3" controlId="formBasicContent">
          <Form.Label>Add new post</Form.Label>
          <Form.Control 
            as="textarea" 
            placeholder="Post content" 
            name="content"
            value={inputs.content || ""}
            onChange={handleChange}
            rows={5}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default CreatePostForm