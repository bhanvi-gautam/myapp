import React from "react";
import { setToken } from "../rtk/app/slice";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../rtk/AddSlice";
import { encryptData } from "../security/EncryDecrypt";
import login from "../assets/images/login.jpg";
import logo from "../assets/images/logo.svg";
import "../assets/css/login.css";
import { Link, useNavigate } from "react-router-dom";
import { notifyError } from "../toast";
import { ToastContainer } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sendData, { isLoading, isSuccess, post }] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    // return;
    const data = { email: email, password: password };
    const encryptedData = encryptData(data);
    await sendData({ data: encryptedData })
      .then((response) => {
        dispatch(setToken(response.data.tokens.access.token));
        localStorage.setItem("token", response.data.tokens.access.token);
        const encryptedId = encryptData(response.data.data.id);
        localStorage.setItem("userId", encryptedId);
        navigate("/");
      })
      .catch((error) => {
        notifyError("Invalid Credentials");
      });
  };

  return (
    <main className="d-flex align-items-center min-vh-100 py-3 py-md-0">
      <div className="container">
        <div className="card login-card">
          <div className="row no-gutters">
            <div className="col-md-5">
              <img src={login} alt="login" className="login-card-img" />
            </div>
            <div className="col-md-7">
              <div className="card-body">
                <div className="brand-wrapper">
                  <img src={logo} alt="logo" className="logo" />
                </div>
                <p className="login-card-description">Sign into your account</p>
                <form onSubmit={handleSubmit} action="#!">
                  <div className="form-group">
                    <label htmlFor="email" className="sr-only">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="form-control"
                      placeholder="Email address"
                      required
                    />
                  </div>
                  <div className="form-group mb-4">
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="form-control"
                      placeholder="***********"
                      required
                    />
                  </div>
                  <input
                    name="login"
                    id="login"
                    className="btn btn-block login-btn mb-4"
                    type="submit"
                    value="Login"
                    // onClick={handleSubmit}
                  />
                </form>
                <p className="login-card-footer-text">
                  Don't have an account?{" "}
                  <Link to="/register" className="text-reset">
                    Register here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer containerId="B" />
    </main>
  );
};

export default Login;
