import React, { useState } from "react";
import { useDeletePostMutation, useUpdatePostMutation } from "../rtk/AddSlice";
import { encryptData } from "../security/EncryDecrypt";
import { Button, Form, Col, Row } from "react-bootstrap";
import { MdDelete, MdUpdate, MdDone } from "react-icons/md";
import { notifyError } from "../toast";

const TodoItem = ({ text, todoId, parentCall }) => {
  const [sendData] = useDeletePostMutation();
  const [show, setShow] = useState(false);
  const [newText, setNewText] = useState(text);
  const [updateData] = useUpdatePostMutation();

  const handleDelete = async () => {
    const encryptedId = encryptData(todoId);
    sendData({ id: encryptedId }).then((data) => {
      parentCall(2000);
    });
  };

  const handleInputChange = () => {
    setShow(!show);
  };

  const handleUpdate = async () => {
    if (newText.trim() !== "") {
      const encryptedData = encryptData({ id: todoId, text: newText });
      updateData({ data: encryptedData })
        .then((data) => {
          setShow(!show);
          parentCall(1000);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      notifyError("Text cannot be empty");
    }
  };

  return (

    <Row className="align-items-center">
      <Col xs={12} md={8}>
        {show ? (
          <Form.Control
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            style={{ height: "auto" }}
          />
        ) : (
          <p style={{ fontSize: "1.25rem" }}>{text}</p>
        )}
      </Col>
      <Col
        xs={12}
        md={4}
        className="d-flex justify-content-end align-items-center gap-2"
      >
        {show ? (
          <>
            <Button variant="success" onClick={handleUpdate}>
              <MdUpdate /> Done
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                setShow(false);
                setNewText(text);
              }}
            >
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button variant="primary" onClick={handleInputChange}>
              <MdUpdate /> Update
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              <MdDelete /> Delete
            </Button>
          </>
        )}
      </Col>
    </Row>
  );
};

export default TodoItem;
