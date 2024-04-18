import React from "react";
import "./Landing.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import image from "./assets/images/landingBackground.png";
import { Image } from "react-bootstrap";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <Container className="vh-100">
      <Row className="h-100 align-items-center">
        <Col xs={12} md={6} className="text-center">
          <h1>Welcome to our Todo App</h1>
          <p>
            Our Todo App helps you manage your tasks efficiently. You can add,
            delete, and update tasks at any time. Stay organized and increase
            your productivity with our Todo App.
          </p>
          <Link to="/login">
            <Button variant="primary" className="mt-3">
              <FontAwesomeIcon icon={faPaperPlane} /> Get Started
            </Button>
          </Link>
        </Col>
        <Col xs={12} md={6} className="d-flex justify-content-center">
          <Image src={image} alt="Todo App" fluid />{" "}
        </Col>
      </Row>
    </Container>
  );
};

export default Landing;
