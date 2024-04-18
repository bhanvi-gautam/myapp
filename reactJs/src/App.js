import React from "react";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/todoList/Home";
import Landing from "./components/Landing";
import AdminNavbar from "./components/navbars/AdminNavbar";
import AuthNavbar from "./components/navbars/AuthNavbar";
import { Navbar } from "react-bootstrap";
import ChangePassword from "./components/Sidebar/ChangePassword";
import Settings from "./components/Sidebar/Settings";
import Profile from "./components/Sidebar/Profile";

const App = () => {
  let token = useSelector((state) => state.token.strValue);

  const routes = [
    { path: "/", element: <Home /> },
    { path: "/profile", element: <Profile /> },
    { path: "/changePassword", element: <ChangePassword /> },
    { path: "/settings", element: <Settings /> },
  ]

  if (!token) {
    token = localStorage.getItem("token");
  }
  return (
    <BrowserRouter>
      {!token ? (
        <>
          <Navbar expand="md" className="bg-body-tertiary">
            <AuthNavbar />
          </Navbar>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </>
      ) : (
        <>
          <div style={{ backgroundColor: "#dedeca91" }}>
            {/* <div className="bg-light"> */}
            <AdminNavbar />

            <Routes>
            {routes?.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    element={route.element}
                  />
                ))}
            </Routes>
          </div>
        </>
      )}
    </BrowserRouter>
  );
};

export default App;
