import React, { useEffect, useState } from 'react';
import SingleFriendRequest from './SingleFriendRequest';
import Card from 'react-bootstrap/Card';

function FriendRequestStack(props) {
  const [friendRequests, setFriendRequests] = useState([]);

  useEffect(() => {
    setFriendRequests(props.friendRequests);
  }, [props.friendRequests]);

  return (
    <Card className="mt-3">
      <Card.Header>
        <Card.Title>Friend Requests</Card.Title>
      </Card.Header>
      <Card.Body>
        {friendRequests.length !== 0 && friendRequests.map(friendRequest => <SingleFriendRequest key={friendRequest.requestId} friendRequest={friendRequest} />)}
        {friendRequests.length == 0 && <div>no requests</div>}
      </Card.Body>
    </Card>
  )
}

export default FriendRequestStack