import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import ChangeEmailForm from './ChangeEmailForm';
import ChangePasswordForm from './ChangePasswordForm';
import ChangeProfilePictureForm from './ChangeProfilePictureForm';
import { Buffer } from 'buffer';

function SettingsStack(props) {

  const [email, setEmail] = useState(null);
  const [picturePath, setPicturePath] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePictureType, setProfilePictureType] = useState(null);

  useEffect(() => {
    setEmail(props.email)
  }, [props.email])

  useEffect(() => {
    setPicturePath(props.picture)
  }, [props.picture])

  useEffect(() => {
    if (picturePath) {
      axios.get(`assets/images/profile/${picturePath}`,
      {responseType: "arraybuffer"})
      .then(resp => {
        setProfilePictureType(resp.headers["content-type"])
        setProfilePicture(Buffer.from(resp.data, "binary").toString("base64"))
      })
    }
  }, [picturePath]);
  
  return (
    <Card className="mt-3">
      <Card.Header>
        <Card.Title>Settings</Card.Title>
      </Card.Header>
      <Card.Body>
        {<img style={{width: '150px', height: '150px', objectFit: 'cover'}} src={`data:${profilePictureType};charset=utf-8;base64,${profilePicture}`} />} <br />
        Current email: {email}
        <ChangeEmailForm />
        <ChangePasswordForm />
        <ChangeProfilePictureForm />
      </Card.Body>
    </Card>
  )
}

export default SettingsStack