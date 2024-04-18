import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Container, Row, Col, Image } from "react-bootstrap";
import register from "../assets/images/register.jpg";
import { useRegisterMutation } from "../rtk/AddSlice";
import { encryptData } from "../security/EncryDecrypt";
import { Link, useNavigate } from "react-router-dom";
import { notifyError, notifySuccess } from "../toast";
import { ToastContainer } from "react-toastify";

const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  username: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      "Must Contain 6 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    )
    .required("Password is required"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  phnNumber: Yup.string()
    .matches(
      /^[6-9]\d{9}$/,
      "Invalid phone number , phone number must be 10 digits long and must not contain any special characters or spaces"
    )
    .required("Contact number is required"),
});

const Register = () => {
  const [sendData] = useRegisterMutation();
  const navigate = useNavigate();
  return (
    <Container className="d-flex align-items-center vh-100">
      <Row className=" justify-content-between">
        <Col
          md={6}
          className="d-flex justify-content-center align-items-center"
        >
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              username: "",
              email: "",
              password: "",
              confirm_password: "",
              phnNumber: "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {

              sendData({ data: encryptData(values) })
                .then((fetchData) => {
                  notifySuccess("Registration Successful!");
                  setTimeout(() => {
                    navigate("/login");
                  }, 2000);
                })
                .catch((error) => {
                  notifyError(error);
                });
            }}
          >
            <Form style={{ marginLeft: "3.75rem", marginRight: "0.625rem" }}>
              {/* <Form className="align-items-center"> */}
              <h2 className="mb-4">Sign Up</h2>
              <div className="mb-3">
                <Field
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className="form-control"
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="mb-3">
                <Field
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className="form-control"
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="mb-3">
                <Field
                  type="text"
                  name="username"
                  placeholder="Username"
                  className="form-control"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="mb-3">
                <Field
                  type="tel"
                  name="phnNumber"
                  placeholder="Contact Number"
                  className="form-control"
                />
                <ErrorMessage
                  name="phnNumber"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="mb-3">
                <Field
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className="form-control"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="mb-3">
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="form-control"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="mb-3">
                <Field
                  type="password"
                  name="confirm_password"
                  placeholder="Confirm Password"
                  className="form-control"
                />
                <ErrorMessage
                  name="confirm_password"
                  component="div"
                  className="text-danger"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Register
              </button>
              <p className="mt-3">
                Already Exists? <Link to="/login">Login here</Link>
              </p>
            </Form>
          </Formik>
        </Col>
        <Col md={6} className="d-none d-md-block">
          <div className="d-flex justify-content-center align-items-center h-100">
            <Image
              src={register}
              alt="Registration"
              style={{ marginLeft: "8.75rem" }}
              fluid
            />
          </div>
        </Col>
      </Row>
      <ToastContainer containerId="A" />
      <ToastContainer containerId="B" />
    </Container>
  );
};

export default Register;
