import React, { useEffect, useRef } from 'react'
import "./index.css"
import Typed from 'typed.js'
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
const Homepage = () => {
    const el = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const typed = new Typed(el.current, {
            strings: ['Assignment Tracker'],
            typeSpeed: 40,
        });
        return () => {
            typed.destroy();
        };
    }, [])


    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand>Assignment Tracker</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link onClick={() => navigate("/dashboard")}>Dashboard</Nav.Link>
                        <Nav.Link onClick={() => navigate("/login")}>Login</Nav.Link>
                        <Nav.Link onClick={() => navigate("/register")}>Register</Nav.Link>
                    </Nav>
                    <Button onClick={() => {
                        localStorage.setItem("jwt", null)
                        navigate('/login')
                    }}
                        variant="dark"
                        className='button-shadow'
                        style={{ margin: "2rem", width: "18rem", }}

                    >Logout</Button>
                </Container>
            </Navbar>

            <div className='homepage__container d-flex justify-content-center align-items-center'>
                <span className='homepage__text h1' ref={el} />
            </div>
            <div className='footer'>
                <span className='homepage__text'>Made with </span> 💟 <span className='homepage__text'> by Benjamin</span>
            </div>

        </>
    )
}

export default Homepage
