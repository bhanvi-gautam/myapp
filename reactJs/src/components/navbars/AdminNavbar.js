import React, { useState, useEffect } from "react";
import { setToken } from "../rtk/app/slice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faHome, faLock, faSignOutAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/images/logo.svg";
import { Image } from "react-bootstrap";
import "./AdminNavbar.css";
import { useGetOneUserMutation } from "../rtk/AddSlice";
import ListIcon from '@mui/icons-material/List';
import { decryptData } from "../security/EncryDecrypt";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [getData,{isLoading,isSuccess,post}]=useGetOneUserMutation();
  const [userName, setUserName]=useState(post);
  const userId=localStorage.getItem('userId');
  const [show, setShow] = useState(window.innerWidth > 768); // Default open on regular screens


  const getUserName=async()=>{
    getData({userId:userId}).unwrap().then((data)=>{
      const decryptedData=decryptData(data.encryptedData);
      setUserName(decryptedData.username);

    })
  }

  useEffect(()=>{
    getUserName();
  },[])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogout = () => {
    dispatch(setToken(""));
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setTimeout(() => {
      navigate("/");
    }, 2000);
    
  };
  return (
    <>
    {isSuccess &&
    <>
      <Navbar bg="light" expand="lg" >
        <Navbar.Brand onClick={() => setShow(!show)}>
          <Link to="/" style={{color:"black", marginLeft:'5px', marginRight:"4px"}}>
            {/* <Image src={logo} alt="" fluid /> */}
            <ListIcon/>
          </Link>
          Hello ,{userName}

        </Navbar.Brand>
      </Navbar>

      <div className={`sidebar ${show ? "open" : ""}`}>
        
      <Nav className="flex-column">
  <Nav.Link>
    <Link to="/" style={{ color: 'black', textDecoration: 'none' }}>
      <FontAwesomeIcon icon={faHome} /> Home
    </Link>
  </Nav.Link>
  <Nav.Link>
    <Link to="/profile" style={{ color: 'black', textDecoration: 'none' }}>
      <FontAwesomeIcon icon={faUser} /> Profile
    </Link>
  </Nav.Link>
  <Nav.Link>
    <Link to="/settings" style={{ color: 'black', textDecoration: 'none' }}>
      <FontAwesomeIcon icon={faCog} /> Settings
    </Link>
  </Nav.Link>
  <Nav.Link>
    <Link to="/changePassword" style={{ color: 'black', textDecoration: 'none' }}>
      <FontAwesomeIcon icon={faLock} /> Change Password
    </Link>
  </Nav.Link>
  <hr />
  <Nav onClick={handleLogout} style={{ marginLeft:"15px" }}>
    <FontAwesomeIcon icon={faSignOutAlt} /> Logout
  </Nav>
</Nav>

      </div>

      {show && <div className="backdrop" onClick={() => setShow(false)} />}
      </>
    }
    </>
  );
};

export default AdminNavbar;
