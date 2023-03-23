import React, { useEffect, useState } from 'react'
import SingleFriend from './SingleFriend';
import Card from 'react-bootstrap/Card';

function FriendStack(props) {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    setFriends(props.friends);
  }, [props.friends]);

  return (
    <Card className="mt-3">
      <Card.Header>
        <Card.Title>Friends</Card.Title>
      </Card.Header>
      <Card.Body>
        {friends.length !== 0 && friends.map(friend => <SingleFriend key={friend.id} friend={friend} />)}
        {friends.length == 0 && <div>no friends</div>}
      </Card.Body>
    </Card>
  )
}

export default FriendStack