import React, { useState } from 'react';
import './index.css';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import fetchUtil from '../Services/fetchService';
import { useUser } from '../UserProvider';
const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [isCodeReviewer, setIsCodeReviewer] = useState(false);
    const [name, setName] = useState('');
    const user = useUser();


    const handleIsAdmin = () => {
        setIsAdmin(!isAdmin);
    }
    const handleIsCodeReviewer = () => {
        setIsCodeReviewer(!isCodeReviewer);
    }


    const sendRegisterRequest = () => {
        const jsonBody = {
            "username": username,
            "password": password,
            "name": name,
            "isAdmin": Boolean(isAdmin),
            "isCodereviewer": Boolean(isCodeReviewer)
        };
        console.log(jsonBody);
        fetch("/api/users/register", {
            headers: {
                "Content-Type": "application/json",
            },
            "method": "POST",
            "body": JSON.stringify(jsonBody),
        }).then(async (response) => {
            console.log(jsonBody)
            console.log(response.headers)
            if (response.status === 200) {
                return Promise.all([response.json(), response.headers])
            } else if (response.status === 400) {
                return Promise.reject("Username already exitst");
            }

        }).then(([body, headers]) => {
            alert("user registered");
            navigate("/login")
        }).catch((message) => {
            alert(message)
        })
    }
    const navigate = useNavigate();

    return (
        <>
            <Container className='mt-5 container-xxl' >
                <Row className="justify-content-center">
                    <Col md="8" lg="6">
                        <Form.Group className="mb-3" controlId="username">

                            <Form.Label
                                className='fs-4 text__style'>Username:</Form.Label>
                            <Form.Control type="text" placeholder="Enter Username"
                                onChange={(e) => setUsername(e.target.value)} />
                        </Form.Group>
                    </Col>
                </Row>


                <Row className="justify-content-center">
                    <Col md="8" lg="6">
                        <Form.Group className="mb-3" controlId="Password">

                            <Form.Label
                                className='fs-4 text__style'>Password:</Form.Label>
                            <Form.Control type="password" placeholder="Enter password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md="8" lg="6">
                        <Form.Group className="mb-3" controlId="Name">

                            <Form.Label
                                className='fs-4 text__style'>Name:</Form.Label>
                            <Form.Control type="password" placeholder="Enter Name"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md="8" lg="6">
                        <Form.Check
                            type="checkbox"
                            label="Are you admin?"
                            checked={isAdmin}
                            onChange={handleIsAdmin}
                        />
                    </Col>
                </Row>

                <Row className="justify-content-center">
                    <Col md="8" lg="6">
                        <Form.Check
                            type="checkbox"
                            label="Are you codereviewer?"
                            checked={isCodeReviewer}
                            onChange={handleIsCodeReviewer}
                        />
                    </Col>
                </Row>

                <Row className="justify-content-center">
                    <Col className='mt-2 flex-column d-flex justify-content-md-between flex-md-row gap-5' md="8" lg="6">
                        <Button onClick={() => sendRegisterRequest()} >Register</Button>
                        <Button onClick={() => navigate("/")} variant="secondary">
                            Exit
                        </Button>
                    </Col>
                </Row>
            </Container >

        </>
    )
}

export default Register
