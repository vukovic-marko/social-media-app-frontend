import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function SingleFriend(props) {
  const [friend, setFriend] = useState({});

  useEffect(() => {
    setFriend(props.friend);
  }, [props.friend])
  return (
    <div>
      {props.friend && 
        <div userid={friend.userId}>
          <Link to={`${friend.id}`}>{friend.username}</Link>
        </div>
      }
    </div>
  )
}

export default SingleFriend