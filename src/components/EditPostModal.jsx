import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ChangePostForm from './ChangePostForm';
import { AiOutlineEdit } from 'react-icons/ai';


function EditPostModal(props) {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="outline-success" onClick={handleShow}>
        <AiOutlineEdit /> Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ChangePostForm post={props.post} />
        </Modal.Body>
      </Modal>
    </>
  )
}

export default EditPostModal