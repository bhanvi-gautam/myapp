import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import logoImage from "../assets/images/logo.svg";
import { Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import ListIcon from '@mui/icons-material/List';
import "./AuthNavbar.css";

const AuthNavbar = () => {
  return (
    <Navbar expand="md" className="bg-body-tertiary" fixed="top">
      <Container fluid>
      <Navbar.Brand >
          <Link to="/" style={{color:"black", marginLeft:'5px', marginRight:"4px"}}>
            {/* <Image src={logo} alt="" fluid /> */}
            <ListIcon/>
          </Link>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default AuthNavbar;
