import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import { useAuth } from '../auth/AuthProvider';
import SingleUserResult from '../components/SingleUserResult';

function SearchPage() {

  const params = useParams();
  const {user} = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get(`search/${params.username}`,
    {headers:{"Authorization" : `Bearer ${user}`}}
    )
    .then(resp => {
      setUsers(resp.data.map((u,i) => new Object({"num": i+1, "id": u.id, "username": u.username, "imagePath": u.imagePath})));
    })
  }, [params])

  return (
    <div>
      <Container>
        Results for the query: {params.username}
          {users.length !== 0 && users.map((u,i) => <SingleUserResult key={i} user={u} />)}
          {users.length == 0 && <div>no results</div>}
      </Container>
    </div>
  )
}

export default SearchPage