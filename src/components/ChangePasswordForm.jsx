import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useAuth } from '../auth/AuthProvider';

function ChangePasswordForm() {

  const [inputs, setInputs] = useState({}); 
  const {user} = useAuth();

  const handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = e => {
    e.preventDefault();

    axios.put('user/password',
    inputs,
    {headers:{"Authorization" : `Bearer ${user}`}}
    )
    .then(resp => {
      setInputs({})
    })
    .catch(err => {
      console.log(Array.isArray(err.response.data))
      console.log(err.response.data)

      if (Array.isArray(err.response.data)) {
        let errMsg = '';
        err.response.data.forEach(e => errMsg += `${e[0]} ${e[1]}\n`)
        alert(errMsg);
      } else if (err.response.data.msg) {
        alert("Incorrect old password.")
      } else {
        alert("Fields must not be empty.")
      }
    })
  }

  return (
    <Form  onSubmit={handleSubmit}>
      <Form.Label>Change Password</Form.Label>
        <Form.Group className="d-flex">
          <Form.Control
            type="password"
            placeholder="Old Password"
            className="me-2"
            aria-label="Old Password"
            name="oldPassword"
            onChange={handleChange}
            value={inputs.oldPassword || ""}
          />
          <Button disabled style={{visibility: 'hidden'}}>Change</Button>
        </Form.Group>
        <Form.Group className="d-flex">
          <Form.Control
            type="password"
            placeholder="New Password"
            className="me-2"
            aria-label="New Password"
            name="newPassword"
            onChange={handleChange}
            value={inputs.newPassword || ""}
          />
          <Button variant="outline-success" type="submit">Change</Button>
        </Form.Group>
    </Form>
  )
}

export default ChangePasswordForm