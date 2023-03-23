import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useAuth } from '../auth/AuthProvider';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PostStack from '../components/PostStack';
import FriendStack from '../components/FriendStack';
import SettingsStack from '../components/SettingsStack';

function ProfilePage() {
  const [posts, setPosts] = useState([]);
  const [friends, setFriends] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const {user} = useAuth();

  useEffect(() => {
    axios.get('user/post',
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
    axios.get('user/friend',
    {headers:{"Authorization" : `Bearer ${user}`}}
    )
    .then(resp => {
      setFriends(resp.data);
    })
    .catch(err => {
      console.log(err.response.data)
      setFriends([]);
    })
  }, []);

  useEffect(() => {
    axios.get('user',
      {headers:{"Authorization" : `Bearer ${user}`}}
      )
      .then(resp => {
        setUserInfo(resp.data)
      })
  }, []);

  return (
    <Container>
      <Row>
        <Col xs={8}><PostStack posts={posts} mode="profilePage" /></Col>
        <Col><SettingsStack email={userInfo.hasOwnProperty('email') ? userInfo.email : null} picture={userInfo.hasOwnProperty('imagePath') ? userInfo.imagePath : null}/><FriendStack friends={friends} /></Col>
      </Row>
    </Container>
  )
}

export default ProfilePage