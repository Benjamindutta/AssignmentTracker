import React, { useEffect, useState } from 'react';
import { useLocalStorage } from '../Util/UseLocalStorage';
import { useNavigate } from 'react-router-dom';
import fetchUtil from '../Services/fetchService';
import { Button, Card } from 'react-bootstrap';
import './dashboard.css'
import StatusBadge from '../StatusBadge';
import { useUser } from '../UserProvider';
function Dashboard() {
    const user = useUser();
    const [assignments, setAssignments] = useState(null);
    const navigate = useNavigate();
    console.log(user.jwt);
    useEffect(() => {
        fetchUtil("/api/assignments/", "GET", user.jwt)
            .then((assignmentsData) => {
                setAssignments(assignmentsData);
            })

    }, []);

    function createAsssignments() {
        fetchUtil("/api/assignments/", "POST", user.jwt)
            .then((assignment) => {
                navigate(`/assignments/${assignment.id}`)
            })
    }
    return (

        <div>
            <div style={{ marginTop: "auto", marginLeft: "7rem", marginRight: "4rem" }}>
                <div className='d-flex justify-content-between'>
                    <Button onClick={() => createAsssignments()}
                        variant="dark"
                        className='button-shadow'
                        style={{ cursor: 'pointer', margin: "2rem", width: "18rem", }}

                    >Submit new Assignment</Button>
                    <Button onClick={() => {
                        localStorage.setItem("jwt", null)
                        navigate('/login')
                    }}
                        variant="dark"
                        className='button-shadow'
                        style={{ margin: "2rem", width: "18rem", }}

                    >Logout</Button>
                </div>
                {assignments ? (<div className='d-grid gap-5'
                    style={{ gridTemplateColumns: "repeat(auto-fit, 18rem)" }}>
                    {assignments.map((assignment) => (
                        <Card className="card-background" style={{ width: "18rem", height: "20rem" }} key={assignment.id}>
                            <Card.Body className="d-flex flex-column justify-content-around">
                                <Card.Title style={{ color: 'white' }}>Assignment # {assignment.id}</Card.Title>
                                <div className='d-flex justify-content-start'>
                                    <StatusBadge text={assignment.status} />
                                </div>

                                <Card.Text style={{ color: '#cccbca' }}>
                                    <p>
                                        <b style={{ color: 'white' }}>Github URL:</b>
                                        <p>{assignment.githubUrl}</p>
                                        <b style={{ color: 'white' }}> Branch:</b>
                                        <p>{assignment.branch}</p>
                                    </p>
                                </Card.Text>

                                <Button onClick={() => {
                                    navigate(`/assignments/${assignment.id}`)
                                }} variant="dark">Edit</Button>

                            </Card.Body>
                        </Card >
                    ))
                    }</div>) : (<></>)
                }
            </div >
        </div >
    )
}

export default Dashboard
