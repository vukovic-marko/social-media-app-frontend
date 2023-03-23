import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useAuth } from '../auth/AuthProvider';

function SinglePost(props) {
  const [friendRequest, setFriendRequest] = useState({});
  const {user} = useAuth();

  useEffect(() => {
    setFriendRequest(props.friendRequest);
  }, [props.friendRequest])

  const handleAccept = () => {
    axios.put(`user/request/${props.friendRequest.requestId}/accept`,
    null,
    {headers:{"Authorization" : `Bearer ${user}`}}
    )
    .then(resp => {
      window.location.reload();
    })
  }

  const handleReject = () => {
    axios.put(`user/request/${props.friendRequest.requestId}/reject`,
    null,
    {headers:{"Authorization" : `Bearer ${user}`}}
    )
    .then(resp => {
      window.location.reload();
    })
  }

  return (
    <div>
      {props.friendRequest && 
        <div requestid={friendRequest.requestId} senderid={friendRequest.senderId}>
          <div>{friendRequest.senderUsername}</div>
          <Button onClick={handleAccept} variant="outline-success">Accept</Button>&nbsp;
          <Button onClick={handleReject} variant="outline-danger">Reject</Button>
        </div>
      }
    </div>
  )
}

export default SinglePost