import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useAuth } from '../auth/AuthProvider';

function ChangeProfilePictureForm() {

  const [selectedFile, setSelectedFile] = useState(null); 
  const {user} = useAuth();

  const handleSubmit = e => {
    e.preventDefault();

    console.log(selectedFile);

    axios.post('user/picture',
    {picture: selectedFile},
    {headers:{"Authorization" : `Bearer ${user}`, 'Content-Type': 'multipart/form-data'}}
    )
    .then(resp => {
      window.location.reload();
    })
    .catch(err => {
      let errMsg = err.response.data.msg ? err.response.data['msg'] : err.response.data;
      alert(errMsg)
    })
  }

  return (
    <Form onSubmit={handleSubmit}>
        <Form.Label>Change Profile Picture</Form.Label>
        <Form.Group className="d-flex">
          <Form.Control type="file" onChange={e => setSelectedFile(e.target.files[0])} className="me-2"/>
          <Button variant="outline-success" type="submit">Change</Button>
        </Form.Group>
      </Form>
  )
}

export default ChangeProfilePictureForm