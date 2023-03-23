import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import axios from 'axios';
import { useAuth } from '../auth/AuthProvider';
import { Buffer } from 'buffer';
import { Link } from 'react-router-dom';
import EditPostModal from './EditPostModal';

function SinglePost(props) {
  const [post, setPost] = useState({});
  const [mode, setMode] = useState(props.mode);
  const [profilePictureType, setProfilePictureType] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const {user} = useAuth();

  useEffect(() => {
    if (post.hasOwnProperty('authorImagePath'))
      axios.get(`http://localhost:9000/assets/images/profile/${post.authorImagePath}`,
      {responseType: "arraybuffer"})
      .then(resp => {
        setProfilePictureType(resp.headers["content-type"])
        setProfilePicture(Buffer.from(resp.data, "binary").toString("base64"))
        // setProfilePicture(URL.createObjectURL(resp.data));
      });
  }, [post]);

  useEffect(() => {
    setPost(props.post);
  }, [props.post])

  

  const handleLike = () => {
    axios.post(`http://localhost:9000/profile/${post.authorId}/post/${post.postId}`,
    null,
    {headers:{"Authorization" : `Bearer ${user}`}}
    )
    .then(resp => {
      setPost({...post, isLiked: true, numberOfLikes: post.numberOfLikes+1})
    })
  }

  const handleDislike = () => {
    axios.put(`profile/${post.authorId}/post/${post.postId}`,
    null,
    {headers:{"Authorization" : `Bearer ${user}`}}
    )
    .then(resp => {
      console.log(resp)
      setPost({...post, isLiked: false, numberOfLikes: post.numberOfLikes-1})
    })
  }

  return (
    <div>
      {props.post && 
        <Card postid={post.postId} authorid={post.authorId} className="mb-3">
          <Card.Header>
            <Row>
              <Col xs={2} >
              {mode == "homePage" && <img style={{width: '50px', height: '50px', objectFit: 'cover'}} src={`data:${profilePictureType};charset=utf-8;base64,${profilePicture}`} />}
              </Col>
              <Col style={{textAlign: 'left'}}>
                {mode == "homePage" && <Card.Title><Link to={`/profile/${post.authorId}`}>{post.authorUsername}</Link></Card.Title>}
                <Card.Subtitle>{new Date(post.dateTime).toLocaleDateString('sr-RS')}&nbsp;{new Date(post.dateTime).toLocaleTimeString('sr-RS', {timeStyle: 'short'})}</Card.Subtitle>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <div>{post.content}</div>
            {mode == "homePage" && <div>{post.isLiked ? <Button variant="light" onClick={handleDislike}><AiFillLike /></Button> : <Button variant="light" onClick={handleLike}><AiOutlineLike /></Button>} {post.numberOfLikes} {post.numberOfLikes == 1 ? 'like' : 'likes'}</div>}
            {mode == "profilePage" && <div>{post.numberOfLikes} {post.numberOfLikes == 1 ? 'like' : 'likes'}</div>}
            {mode =="profilePage" && <EditPostModal post={post} />}
          </Card.Body>
        </Card>
      }
    </div>
  )
}

export default SinglePost