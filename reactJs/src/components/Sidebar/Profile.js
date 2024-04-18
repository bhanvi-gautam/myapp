import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import profile from '../assets/images/profile.png'
import { decryptData } from "../security/EncryDecrypt";
import { useGetOneUserMutation } from '../rtk/AddSlice';
const Profile = () => {

  const [getData, { isLoading, isSuccess, post }] = useGetOneUserMutation();
  const [posts, setPosts] = useState(post);
  const userId = localStorage.getItem('userId');
  const getUserInfo = async () => {
    getData({ userId: userId }).unwrap().then((data) => {
    
      const decryptedData = decryptData(data.encryptedData);
  
      setPosts(decryptedData);

    })
  }

  useEffect(() => {
    getUserInfo();
  }, [])


  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };



  return (
    <>
    {isSuccess && 
    <>
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
  <Row>
    <Col md={6} className="mx-auto d-none d-md-block">
      <Image src={profile} alt="Profile Image" fluid />
    </Col>
    <Col xs={12} md={6}>
      <Card>
        <Card.Body>
          <Card.Title className="text-center mb-4">
            <h1 style={{ textTransform: 'capitalize' }}>
              Welcome, {`${posts.first_name} ${posts.last_name}`}
            </h1>
          </Card.Title>
          <Card.Title className="text-center mb-4">Your Profile</Card.Title>
          <div className="text-center">
            <p><strong>Username:</strong> {posts.username}</p>
            <p><strong>Email:</strong> {posts.email}</p>
            <p><strong>Contact:</strong> {posts.phone_number}</p>
            <p><strong>Member Since:</strong> {formatDate(posts.createdAt)}</p>
            <br/><br/>
            <p>“In the margins of my tasks, dreams doodle with ink made of stardust.<br/> Each checkbox hides a constellation waiting to be completed.” 🌟</p>
          </div>
        </Card.Body>
      </Card>
    </Col>
  </Row>
      </Container>
    </>
}
    </>

  );
};

export default Profile;