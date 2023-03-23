import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { useAuth } from '../auth/AuthProvider';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CreatePostForm from '../components/CreatePostForm';
import PostStack from '../components/PostStack';
import FriendRequestStack from '../components/FriendRequestStack';

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const {user} = useAuth();

  useEffect(() => {
    axios.get('user/friend/post',
    {headers:{"Authorization" : `Bearer ${user}`}}
    )
    .then(resp => {
      setPosts(resp.data);
    })
    .catch(err => {
      console.log(err.response.data)
      setPosts([]);
    })
  }, []);

  useEffect(() => {
    axios.get('user/request',
    {headers:{"Authorization" : `Bearer ${user}`}}
    )
    .then(resp => {
      // console.log(resp.data)
      setFriendRequests(resp.data);
    })
    .catch(err => {
      console.log(err.response.data)
      setFriendRequests([]);
    })
  }, []);

  return (
    <Container>
      <CreatePostForm />
      <Row>
        <Col xs={8}><PostStack posts={posts} mode="homePage" /></Col>
        <Col><FriendRequestStack friendRequests={friendRequests} /></Col>
      </Row>
    </Container>
  )
}

export default HomePage