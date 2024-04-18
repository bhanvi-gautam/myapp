import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import setting from '../assets/images/settings.png'
import { decryptData, encryptData } from "../security/EncryDecrypt";
import { useGetOneUserMutation, useUpdateUserMutation } from '../rtk/AddSlice';
import { ToastContainer } from 'react-toastify';
import { notifySuccess } from '../toast';

const Settings = () => {
    const [getData, { isLoading, isSuccess, post }] = useGetOneUserMutation();
    const [posts, setPosts] = useState(post);
    const userId = localStorage.getItem('userId');
    const [formData, setFormData] = useState(post);
    const [sendData] = useUpdateUserMutation();
    const getUserInfo = async () => {
        getData({ userId: userId }).unwrap().then((data) => {

            const decryptedData = decryptData(data.encryptedData);

            setPosts(decryptedData);
            setFormData(decryptedData);
        })
    }

    useEffect(() => {
        getUserInfo();
    }, [])
    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = { data: formData };
        const encryptedData = encryptData(payload)
        sendData({ encryptedData }).unwrap().then((data) => {
            getUserInfo();
            notifySuccess("Changes Updated")
        }).catch((error) => {
            console.log(error);
        })
    };

    return (
        <>
            {isSuccess &&
                <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                    <Row>
                        <Col md={6} className="mx-auto d-none d-md-block">
                            {/* Add your image here */}
                            <Image src={setting} alt="Profile Image" fluid />
                        </Col>
                        <Col xs={12} md={6}>

                            <Card>
                                <Card.Body>
                                    <Card.Title className="text-center mb-4">Update Profile</Card.Title>
                                    <Form onSubmit={handleSubmit}>
                                        <Form.Group controlId="formFirstName">
                                            <Form.Label>First Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="firstName"
                                                defaultValue={posts.first_name}
                                                onChange={(e) => {
                                                    if (e.target.value !== '') {
                                                        setFormData({ ...formData, first_name: e.target.value });
                                                    }else{
                                                        setFormData({...formData,first_name:posts.first_name})
                                                    }
                                                }}
                                            />
                                        </Form.Group>

                                        <Form.Group controlId="formLastName">
                                            <Form.Label>Last Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="lastName"
                                                defaultValue={posts?.last_name}
                                                onChange={(e) =>{
                                                    if (e.target.value !== '') {
                                                    setFormData({ ...formData, last_name: e.target.value })
                                                }else{
                                                    setFormData({...formData,last_name:posts.last_name})
                                                }
                                            }}
                                            />
                                        </Form.Group>

                                        <Form.Group controlId="formPhoneNumber">
                                            <Form.Label>Phone Number</Form.Label>
                                            <Form.Control
                                                type="tel"
                                                name="phoneNumber"
                                                defaultValue={posts?.phone_number}
                                                onChange={(e) =>
                                                    {
                                                        if (e.target.value !== '') {
                                                    setFormData({ ...formData, phone_number: e.target.value })
                                                        }
                                                        else{
                                                            setFormData({...formData,phone_number:posts.phone_number})
                                                        }
                                                }}
                                            />
                                        </Form.Group>

                                        <Form.Group controlId="formUsername">
                                            <Form.Label>Username</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="username"
                                                defaultValue={posts?.username}
                                                onChange={(e) =>{
                                                    if (e.target.value !== '') {
                                                    setFormData({ ...formData, username: e.target.value })}
                                                    else{
                                                        setFormData({...formData,username:posts.username})
                                                    }
                                                }}
                                            />
                                        </Form.Group>

                                        <Form.Group controlId="formEmail">
                                            <Form.Label>Email Address</Form.Label>
                                            <Form.Control
                                                type="email"
                                                name="email"
                                                defaultValue={posts?.email}
                                                onChange={(e) =>{
                                                    if (e.target.value !== '') {
                                                    setFormData({ ...formData, email: e.target.value })
                                                }
                                                else{
                                                    setFormData({...formData,email:posts.email})
                                                }
                                            }}
                                            />
                                        </Form.Group>

                                        <Button variant="primary" type="submit" className="w-100 mt-3">
                                            Save Changes
                                        </Button>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <ToastContainer containerId="A" />
                </Container>
            }
        </>
    );
};

export default Settings;

