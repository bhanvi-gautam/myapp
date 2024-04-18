import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SendIcon from '@mui/icons-material/Send';
import { notifyError, notifySuccess } from '../toast';
import { decryptData, encryptData } from '../security/EncryDecrypt';
import { useChangePasswordMutation, useVerifyPasswordMutation } from '../rtk/AddSlice';
import { ToastContainer } from 'react-toastify';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';


const ChangePasswordPage = () => {
    const userId = localStorage.getItem('userId');
    const [oldPassword, setOldPasssword] = useState('');
    const [currentPassword, setCurrentPasssword] = useState('');
    const [confirmPassword, setConfirmPasssword] = useState('');
    const [show, setShow] = useState(false);
    const [checkPassword] = useVerifyPasswordMutation();
    const [sendData] = useChangePasswordMutation();
    const [errorMessage, setErrorMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);

    const userid = decryptData(userId);

    useEffect(() => {
    }, [show])

    const handleOldPass = async (e) => {
        e.preventDefault();
        try {

            const data = { userId: userid, oldPassword: oldPassword };
            const encryptedData = encryptData(data);
            let check = await checkPassword({ data: encryptedData }).unwrap();
            if (check.status) {
                setShow(true);
            }
        } catch (error) {
            // window.alert('Wrong Old Password');
            notifyError('Wrong Password!!')
        }

    }
    const handleSubmit = async (e) => {
        e.preventDefault();


        var lowerCase = /[a-z]/g;
        var upperCase = /[A-Z]/g;
        var numbers = /[0-9]/g;
        let checking = 1;
        if (!currentPassword.match(lowerCase)) {
            checking++;
            setErrorMessage("Password should contain at least one lowercase letter!");
        } else if (!currentPassword.match(upperCase)) {
            checking++;
            setErrorMessage("Password should contain at least one uppercase letter!");
        } else if (!currentPassword.match(numbers)) {
            checking++;
            setErrorMessage("Password should contain at least one number also!");
        } else if (currentPassword.length < 6) {
            checking++;
            setErrorMessage("Password length should be more than 6.");
        }

        if (checking === 1) {


            if (currentPassword !== confirmPassword) {
                notifyError("Passwords do not match!")
            } else {
                const userId = userid;
                const password = currentPassword;
                const data = { userId, password };
                const encryptedData = encryptData(data);

                await sendData({ data: encryptedData }).unwrap().then((data) => {
                    notifySuccess("Password Updated!")
                });
            }

        }
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleClickShowPassword1 = () => setShowPassword1((show) => !show);

    const handleMouseDownPassword1 = (event) => {
        event.preventDefault();
    };

    return (
        <Container style={{ minHeight: "100vh" }}>
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    <Form>
                        <h2 className="text-center mb-4">Change Password</h2>
                        <Form.Group controlId="formCurrentPassword">
                            <Form.Label>Current Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter current password" onChange={(e) => { setOldPasssword(e.target.value) }} />
                        </Form.Group>
                        {/* Add new password fields here */}
                        {!show && <Button variant="primary" type="button" onClick={handleOldPass} className="mt-3">
                            Next <SendIcon />
                        </Button>}
                        {show &&
                            <>
                                <Form.Group controlId="formCurrentPassword">
                                    <Form.Label>New Password</Form.Label>
                                    <Form.Control type={showPassword ? 'text' : 'password'} placeholder="Enter New Password" onChange={(e) => { setCurrentPasssword(e.target.value) }} endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    } />

                                    <div className="grid gap-6 mb-6 md:grid-cols-2">
                                        <div style={{ color: "red" }}> {errorMessage} </div>
                                    </div>
                                </Form.Group>
                                <Form.Group controlId="formCurrentPassword">
                                    <Form.Label>Confirm New Password</Form.Label>
                                    <Form.Control type={showPassword1 ? 'text' : 'password'} placeholder="Enter Confirm Password" onChange={(e) => { setConfirmPasssword(e.target.value) }} endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword1}
                                                onMouseDown={handleMouseDownPassword1}
                                                edge="end"
                                            >
                                                {showPassword1 ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    } />
                                </Form.Group>
                                <Button variant="primary" type="button" onClick={handleSubmit} className="mt-3">
                                    Change Password
                                </Button>
                            </>

                        }
                    </Form>
                </Col>
            </Row>
            <ToastContainer containerId="B" />
            <ToastContainer containerId="A" />
        </Container>
    );
};

export default ChangePasswordPage;

