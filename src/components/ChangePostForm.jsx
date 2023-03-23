import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useAuth } from '../auth/AuthProvider';

function ChangePostForm(props) {

  const [inputs, setInputs] = useState({content: props.post.content});
  const {user} = useAuth();

  const handleSubmit = e => {
    e.preventDefault();

    axios.put(`user/post/${props.post.postId}`,
    inputs,
    {headers:{"Authorization" : `Bearer ${user}`}}
    )
    .then(resp => {
      console.log(resp.data)
      setInputs({})
      window.location.reload();
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
    <Form onSubmit={handleSubmit}>
        <Form.Label>Post Content</Form.Label>
        <Form.Group className="d-flex">
          <Form.Control
            as="textarea" 
            placeholder="Post content" 
            name="content"
            className="me-2"
            value={inputs.content || ""}
            onChange={handleChange}
            rows={3}
          />
          <Button variant="outline-success" type="submit">Change</Button>
        </Form.Group>
      </Form>
  )
}

export default ChangePostForm