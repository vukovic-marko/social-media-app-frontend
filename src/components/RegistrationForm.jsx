import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

function RegistrationForm() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    email: ""
  });
  const [error, setError] = useState(null);


  const handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = e => {
    e.preventDefault();
    
    axios.post('register', inputs)
      .then(resp => {
        navigate('/', { replace: true });
      })
      .catch(err => {
        if (Array.isArray(err.response.data)) {
          setError(err.response.data.map(e => `${e[0]} ${e[1]}`))
        } else {
          setError([err.response.data]);
        }
      })
  }

  return (
    <Container>
      {error && <Alert variant='danger'>
        {error.map((e, i) => <div key={i}>{e}</div>)}
      </Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control 
            type="username" 
            placeholder="Enter username"
            name="username"
            value={inputs.username || ""} 
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="Enter email"
            name="email"
            value={inputs.email || ""} 
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Password" 
            name="password"
            value={inputs.password || ""}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default RegistrationForm;