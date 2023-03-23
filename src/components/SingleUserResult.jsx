import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function SingleUserResult(props) {
  return (
    <Row>
      <Col>
        <Card style={{textAlign: 'left'}}>
          <div>
            {props.user.num}. 
            <Link to={`/profile/${props.user.id}`}>{props.user.username}</Link>
          </div>
        </Card>
      </Col>
    </Row>
  )
}

export default SingleUserResult