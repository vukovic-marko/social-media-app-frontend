import React, { useEffect, useState } from 'react'
import SinglePost from './SinglePost';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function PostStack(props) {
  const [posts, setPosts] = useState([]);
  const [mode, setMode] = useState(props.mode);

  useEffect(() => {
    setPosts(props.posts);
  }, [props.posts]);

  return (
    <Row xs={1} className="mt-3">
      {posts.length !== 0 && posts.map(post =>  (<Col key={post.postId}><SinglePost key={post.postId} post={post} mode={mode} /></Col>))}
      {posts.length == 0 && <div>no posts</div>}
    </Row>
  )
}

export default PostStack