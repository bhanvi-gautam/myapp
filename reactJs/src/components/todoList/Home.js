import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { notifySuccess } from "../toast";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TodoItem from "./TodoItem";
import { ToastContainer } from "react-toastify";
import Card from "react-bootstrap/Card";
import { useAddNewPostMutation, useGetPostsMutation } from "../rtk/AddSlice";
import { decryptData, encryptData } from "../security/EncryDecrypt";

//only Adding
const Home = () => {
  const [getData, { isLoading, isSuccess, isError, post }] =
    useGetPostsMutation();
  const [posts, setPosts] = useState(post);
  const [sendData] = useAddNewPostMutation();
  const [text, setText] = useState("");
  const userId = localStorage.getItem("userId");
  const user_Id = decryptData(userId);


  const getTodos = async (value) => {
    getData({ id: userId})
      .unwrap()
      .then((fetchTodos) => {
        setPosts(fetchTodos.data);
        if (value === 1000) {
          notifySuccess("Task Updated");
        }
        if (value === 2000) {
          notifySuccess("Task Deleted");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getTodos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { id: user_Id, text: text };
    await sendData({ data: encryptData(payload) }).then((data)=>{
      getTodos();
      notifySuccess("Task Added!")
    });
  };

  
  return (
    <Container style={{ minHeight: "100vh" }}>
      <Row
        className="justify-content-md-center text-center"
        style={{ marginTop: "2rem" }}
      >
        <h1>Tasks List</h1>
      </Row>
      <Row
        className="justify-content-md-center text-center"
        style={{ marginTop: "2rem" }}
      >
        <Col xs={12} md={8}>
          <Form.Control
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add Task"
          />
        </Col>
        <Col xs={12} md={1} className="mt-1">
          <Button onClick={handleSubmit}>Add</Button>
        </Col>
      </Row>
      <hr className="my-4" />
      <Row
        className="justify-content-md-center"
      >
        {isSuccess && (
        <>
          {posts?.map((data, index) => {

            return (
              <Card
                key={index}
                className="my-3"
                style={{ backgroundColor: "#eee3c1f0" }}
              >
                <Card.Body>
                  <TodoItem
                    text={data.todo_text}
                    todoId={data.id}
                    parentCall={getTodos}
                  />
                </Card.Body>
              </Card>
            );
          })}
        </>
      )}
      </Row>
      <ToastContainer containerId="A" />
      <ToastContainer containerId="B" />
    </Container>
  );
};

export default Home;
