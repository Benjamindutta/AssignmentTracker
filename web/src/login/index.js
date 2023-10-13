import React, { useState } from 'react'
import { useLocalStorage } from '../Util/UseLocalStorage';
import { Button, Col, Container, Row, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import "./login.css"
import { useUser } from '../UserProvider';
const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const user = useUser();
    const navigate = useNavigate();
    function sendLoginRequest() {
        const jsonBody = {
            "username": username,
            "password": password
        };
        fetch("/api/auth/login", {
            headers: {
                "Content-Type": "application/json",
            },
            "method": "post",
            "body": JSON.stringify(jsonBody),
        }).then(async (response) => {
            console.log(response.headers)
            if (response.status === 200) {
                return Promise.all([response.json(), response.headers])
            } else {
                return Promise.reject("invalid login attempt!")
            }

        }).then(([body, headers]) => {
            const token = headers.get("authorization")
            console.log("jwt from login", token);
            if (token) {
                user.setJwt(token);
            }
            navigate("/dashboard")
        }).catch((message) => {
            alert(message)
        })
    }


    return (
        <>
            <Container className='mt-5 container-xxl' >
                <Row className="justify-content-center">
                    <Col md="8" lg="6">
                        <Form.Group className="mb-3" controlId="formBasicEmail">

                            <Form.Label
                                className='fs-4 text__style'>Username:</Form.Label>
                            <Form.Control type="text" placeholder="Enter Username"
                                onChange={(e) => setUsername(e.target.value)} />
                        </Form.Group>
                    </Col>
                </Row>


                <Row className="justify-content-center">
                    <Col md="8" lg="6">
                        <Form.Group className="mb-3" controlId="formBasicEmail">

                            <Form.Label
                                className='fs-4 text__style'>Password:</Form.Label>
                            <Form.Control type="password" placeholder="Enter password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="justify-content-center">
                    <Col className='mt-2 flex-column d-flex justify-content-md-between flex-md-row gap-5' md="8" lg="6">
                        <Button onClick={() => sendLoginRequest()} >Login</Button>
                        <Button onClick={() => navigate("/")} variant="secondary">
                            Exit
                        </Button>
                    </Col>
                </Row>
            </Container >

        </>
    )
}

export default Login
