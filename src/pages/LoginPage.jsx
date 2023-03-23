import React, { useState } from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Container from 'react-bootstrap/Container';
import { useAuth } from '../auth/AuthProvider'
import LoginForm from '../components/LoginForm';
import RegistrationForm from '../components/RegistrationForm';

function LoginPage(props) {
  const [key, setKey] = useState(props.mode);
  
  return (
    <Container>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="m-auto mt-5 mb-3 w-50"
      >
        <Tab eventKey="login" title="Login" className="m-auto w-50">
          <div>
            <LoginForm />
          </div>
        </Tab>
        <Tab eventKey="registration" title="Register" className="m-auto w-50">
          <RegistrationForm />
        </Tab>
      </Tabs>
    </Container>
  )
}

export default LoginPage