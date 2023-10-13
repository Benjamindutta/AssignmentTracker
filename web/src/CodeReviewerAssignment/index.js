import React, { useEffect, useRef, useState } from 'react';
import fetchUtil from '../Services/fetchService';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import StatusBadge from '../StatusBadge';
import { useUser } from '../UserProvider';
import CommentContainer from '../CommentContainer';
const CodeReviewerAssignment = () => {
    const { id } = useParams();
    const user = useUser();

    const [, setassignmentEnums] = useState([]);
    const [assignmentStatuses, setAssignmentStatuses] = useState([]);

    const navigate = useNavigate();

    const [assignment, setAssignment] = useState({
        githubUrl: "",
        branch: "",
        number: null,
        status: null,
    })


    const prevAssignmentValue = useRef(assignment);
    function save(status) {
        if (status && assignment.status !== status) {
            setAssignment({ ...assignment, status: status });
        } else {
            persist();
        }

    }
    useEffect(() => {
        if (prevAssignmentValue.current.status !== assignment.status) {
            persist();
        }
        prevAssignmentValue.current = assignment;
    }, [assignment]);

    function persist() {
        fetchUtil(`/api/assignments/${id}`, "PUT", user.jwt, assignment)
            .then((assignmentData) => {
                setAssignment(assignmentData)
            })
    }
    useEffect(() => {
        fetchUtil(`/api/assignments/${id}`, "GET", user.jwt)
            .then((assignmentResponse) => {
                let assignmentData = assignmentResponse.assignment;
                if (assignmentData.branch == null) assignmentData.branch = "";
                if (assignmentData.githubUrl === null) assignmentData.githubUrl = "";
                setAssignment(assignmentData);
                setassignmentEnums(assignmentResponse.assignmentsenums);
                setAssignmentStatuses(assignmentResponse.statusenums)
            })
    }, [])





    return (
        <div className="d-flex justify-content-center">
            <Container className='mt-5'>

                {
                    assignment ? <>
                        <Row className='d-flex align-items-center'>
                            <Col style={{ color: "whitesmoke" }}>
                                {
                                    assignment.number ? <h1>Assignment {assignment.number}</h1> : <></>
                                }
                            </Col>
                            <Col>
                                <StatusBadge text={assignment.status} />
                            </Col>
                        </Row>


                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="3" md="2" style={{ color: "whitesmoke" }}>
                                Github URL:
                            </Form.Label>
                            <Col sm="9" md="8" lg="6">
                                <Form.Control type="text"
                                    id="githuburl"
                                    placeholder="www.github.com/username/reponame"
                                    value={assignment.githubUrl}
                                    readOnly
                                    onChange={(e) => { setAssignment({ ...assignment, githubUrl: e.target.value }) }} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" >
                            <Form.Label column sm="3" md="2" style={{ color: "whitesmoke" }}>
                                Branch:
                            </Form.Label>
                            <Col sm="9" md="8" lg="6">
                                <Form.Control type="text"
                                    id="branch"
                                    placeholder="main"
                                    readOnly
                                    value={assignment.branch}
                                    onChange={(e) => { setAssignment({ ...assignment, branch: e.target.value }) }} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" >
                            <Form.Label column sm="3" md="2" style={{ color: "whitesmoke" }}>
                                Video URL:
                            </Form.Label>
                            <Col sm="9" md="8" lg="6">
                                <Form.Control type="text"
                                    id="urlVideo"
                                    placeholder="Video Link"

                                    onChange={(e) => { setAssignment({ ...assignment, assignmentViedeoUrl: e.target.value }) }} />
                            </Col>
                        </Form.Group>




                        <div className='d-flex gap-5'>
                            {
                                assignment.status === "COMPLETED" ? <Button size="lg" variant="secondary" onClick={() => save(assignmentStatuses[2].status)}>Re-claim</Button> :
                                    <Button size="lg" onClick={() => save(assignmentStatuses[4].status)}>Complete Review</Button>
                            }
                            {
                                assignment.status === "NEEDS UPDATE" ? (<Button size="lg" variant="info" onClick={() => save(assignmentStatuses[2].status)}>Re-claim</Button>) : <Button size="lg" variant="danger" onClick={() => save(assignmentStatuses[3].status)}>Reject Assignment</Button>
                            }
                            <Button variant="secondary" onClick={() => navigate(-1)}>Back</Button>
                        </div>


                        <CommentContainer assignmentId={id} />

                    </> : <></>
                }
            </Container >
        </div >
    );
}

export default CodeReviewerAssignment
