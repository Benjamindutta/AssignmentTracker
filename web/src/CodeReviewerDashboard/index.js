import React, { useEffect, useState } from 'react';
import { useLocalStorage } from '../Util/UseLocalStorage';
import { useNavigate } from 'react-router-dom';
import fetchUtil from '../Services/fetchService';
import { Button, Card } from 'react-bootstrap';
import './codereviewerdashboard.css'
import jwtDecode from 'jwt-decode';
import StatusBadge from '../StatusBadge';
import { useUser } from '../UserProvider';
function CodeReviewerDashboard() {
    const user = useUser();
    const [assignments, setAssignments] = useState(null);
    const navigate = useNavigate()
    console.log(assignments)
    useEffect(() => {
        fetchUtil("/api/assignments/", "GET", user.jwt)
            .then((assignmentsData) => {
                setAssignments(assignmentsData);
            })

    }, []);
    function claimAssignment(assignment) {
        const decodedJWT = jwtDecode(user.jwt);

        const userReviewer = {
            username: decodedJWT.sub
        };

        assignment.codeReviewer = userReviewer;
        assignment.status = "IN REVIEW";
        fetchUtil(`/api/assignments/${assignment.id}`, "PUT", user.jwt, assignment).then((assignmentResponse) => {
            const copyAssignment = [...assignments];
            const i = copyAssignment.findIndex((assignment) => assignment.id === assignmentResponse.id);
            copyAssignment[i] = assignmentResponse;
            setAssignments(copyAssignment);
        })
    }

    return (

        <div>
            <div style={{ marginTop: "auto", marginLeft: "2rem", marginRight: "2rem" }}>
                <div className='d-flex justify-content-between'>
                    <div className='h1 text__style'>Code Reviewer Dashboard</div>
                    <Button onClick={() => {
                        user.setJwt(null);
                        navigate('/login')
                    }}
                        variant="dark"
                        className='button-shadow'
                        style={{ margin: "2rem", width: "18rem", }}

                    >Logout</Button>
                </div>
                <div className='assignment_wrapper in-review'>

                    <span className="status_assignments">
                        In Review
                    </span>
                    <div className="assignments">
                        {(assignments && assignments.filter((assignment) => assignment.status === "IN REVIEW").length > 0) ? (<div className='d-grid gap-5'
                            style={{ gridTemplateColumns: "repeat(auto-fit, 18rem)" }}>
                            {assignments.filter((assignment) => assignment.status === "IN REVIEW").map((assignment) => (
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

                                        <Button variant="dark" onClick={() => navigate(`/assignments/${assignment.id}`)}>Review</Button>

                                    </Card.Body>
                                </Card >
                            ))
                            }</div>) : (<div className='no__assignment'>No Assignments Found</div>)
                        }
                    </div>

                </div>
                <div className='assignment_wrapper submitted'>
                    <span className="status_assignments submitted__status">
                        Awaited Review
                    </span>
                    <div className="assignments">
                        {(assignments && assignments.filter((assignment) => assignment.status === "SUBMITTED" || assignment.status === "RESUBMITTED").length > 0) ? (<div className='d-grid gap-5'
                            style={{ gridTemplateColumns: "repeat(auto-fit, 18rem)" }}>
                            {assignments.filter((assignment) => assignment.status === "SUBMITTED" || assignment.status === "RESUBMITTED").
                                sort((assignment) => {
                                    if (assignment.status === "SUBMITTED") return 1;
                                    if (assignment.status === "RESUBMITTED") return -1
                                }).map((assignment) => (
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

                                            <Button onClick={() => claimAssignment(assignment)} variant="dark">Claim</Button>

                                        </Card.Body>
                                    </Card >
                                ))
                            }</div>) : (<div className='no__assignment'>No Assignments Found</div>)
                        }
                    </div>

                </div>
                <div className='assignment_wrapper needs-update'>
                    <span className="status_assignments needs__update__status">
                        Needs Update
                    </span>
                    <div className="assignments">
                        {(assignments && assignments.filter((assignment) => assignment.status === "NEEDS UPDATE").length > 0) ? (<div className='d-grid gap-5'
                            style={{ gridTemplateColumns: "repeat(auto-fit, 18rem)" }}>
                            {assignments.filter((assignment) => assignment.status === "NEEDS UPDATE").map((assignment) => (
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

                                        <Button onClick={() => navigate(`/assignments/${assignment.id}`)} variant="dark">Review</Button>

                                    </Card.Body>
                                </Card >
                            ))
                            }</div>) : (<div className='no__assignment'>No Assignments Found</div>)
                        }
                    </div>

                </div>

            </div >
        </div >


    )
}

export default CodeReviewerDashboard
