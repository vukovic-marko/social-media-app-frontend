import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import PostStack from '../components/PostStack';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

function OtherUserPage() {

  const params = useParams();
  const {user} = useAuth();

  const [error, setError] = useState(false);
  const [posts, setPosts] = useState(null);

  const handleClick = e => {
    axios.post(`profile/${params.userId}`,
    null,
    {headers:{"Authorization" : `Bearer ${user}`}}
    )
    .then(resp => {
      alert('Friend request sent')
    })
    .catch(err => {
      alert(err.response.data.msg);
    })
  }

  useEffect(() => {
    axios.get(`profile/${params.userId}/post`,
    {headers:{"Authorization" : `Bearer ${user}`}}
    )
    .then(resp => {
      setPosts(resp.data);
      setError(null);
    })
    .catch(err => {
      if (err.response.data.msg == "No such user.") {
        setError(1);
      } else if (err.response.data.msg == "Not friends.") {
        console.log('not friends');
        setError(2);
      }
    })
  }, [params]);

  return (
    <div>
      Profile of the user with id: {params.userId}<br />
      {posts && <Container><PostStack posts={posts} mode="homePage" /></Container>}
      {error && error == 2 && <Button onClick={handleClick}>Send friend request</Button>}
      {error && error == 1 && <h3>User with the id={params.userId} does not exist!</h3>}
    </div>
  )
}

export default OtherUserPage