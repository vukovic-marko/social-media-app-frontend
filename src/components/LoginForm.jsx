import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import { useAuth } from '../auth/AuthProvider';
import { useState } from 'react';
import axios from 'axios';

function LoginForm() {

  const [inputs, setInputs] = useState({
    username: "",
    password: ""
  });
  const [error, setError] = useState(null);
  const { login } = useAuth();

  const handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = e => {
    e.preventDefault();
    
    axios.post('login', inputs)
      .then(resp => {
        setError(null);
        login(resp.data);
      })
      .catch(err => {
        console.log(err.response.data)
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

export default LoginForm;