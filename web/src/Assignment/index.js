import React, { useEffect, useRef, useState } from 'react';
import fetchUtil from '../Services/fetchService';
import { Button, ButtonGroup, Col, Container, Dropdown, DropdownButton, Form, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import StatusBadge from '../StatusBadge';
import { useUser } from '../UserProvider';
import Comment from '../Comment';
const Assignment = () => {
    const { id } = useParams();
    const user = useUser();
    const emptyComment = {
        id: null,
        text: "",
        user: user.jwt,
        assignmentId: id !== null ? parseInt(id) : null
    }


    const [assignmentEnums, setassignmentEnums] = useState([]);
    const [assignmentStatuses, setAssignmentStatuses] = useState([]);
    const navigate = useNavigate();
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState(emptyComment);
    const [assignment, setAssignment] = useState({
        githubUrl: "",
        branch: "",
        number: null,
        status: null,
    })
    const prevAssignmentValue = useRef(assignment);
    function save(status) {
        if (assignment.status !== status) {
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
    }, []);

    useEffect(() => {
        fetchUtil(`/api/comments?assignmentId=${id}`, "get", user.jwt, null).then((commentsData) => {
            setComments(commentsData)
        })
    }, []);
    // console.log(enums)
    function submitComment() {

        if (comment.id) {
            fetchUtil(`/api/comments/${comment.id}`, "put", user.jwt, comment).then((data) => {
                const commentscopy = [...comments];
                const i = comments.findIndex((c) => c.id === comment.id)
                commentscopy[i] = data;
                setComments(commentscopy);
                setComment(emptyComment);
            })
        } else {
            fetchUtil("/api/comments", "post", user.jwt, comment).then((data) => {
                const commentscopy = [...comments];
                commentscopy.push(data);
                setComments(commentscopy);
                setComment(emptyComment);
            }

            )

        }

    }

    function handleEditComment(commentId) {
        const i = comments.findIndex((co) => co.id === commentId);
        const commentCopy = {
            id: comments[i].id,
            text: comments[i].text,
            user: user.jwt,
            assignmentId: id !== null ? parseInt(id) : null
        }
        setComment(commentCopy);
    }

    function handleDeleteComment(commentId) {
        console.log("This is for deleteing comment");
    }

    function updateComment(text) {
        setComment({ ...comment, text: text });
    }
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
                                Assignment Number:
                            </Form.Label>
                            <Col>
                                <DropdownButton
                                    as={ButtonGroup}
                                    id={`assignment-number`}
                                    variant={'info'}
                                    title={assignment.number ? `Assignments ${assignment.number}` : 'Select an Assignment'}
                                    onSelect={(selectedvalue) => {
                                        setAssignment({ ...assignment, number: selectedvalue })
                                    }}
                                >
                                    {
                                        assignmentEnums.map((assignmentnum) => (

                                            <Dropdown.Item eventKey={assignmentnum.assignmentNum}>{assignmentnum.assignmentNum}</Dropdown.Item>
                                        ))
                                    }
                                </DropdownButton>
                            </Col>

                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="3" md="2" style={{ color: "whitesmoke" }}>
                                Github URL:
                            </Form.Label>
                            <Col sm="9" md="8" lg="6">
                                <Form.Control type="text"
                                    id="githuburl"
                                    placeholder="www.github.com/username/reponame"
                                    value={assignment.githubUrl}
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
                                    value={assignment.branch}
                                    onChange={(e) => { setAssignment({ ...assignment, branch: e.target.value }) }} />
                            </Col>
                        </Form.Group>

                        {
                            assignment.status === "COMPLETED" ? <>
                                <Form.Group as={Row} className="mb-3" >
                                    <Form.Label column sm="3" md="2" style={{ color: "whitesmoke" }}>
                                        Video URL:
                                    </Form.Label>
                                    <Col sm="9" md="8" lg="6">
                                        <div>
                                            <a href={assignment.assignmentViedeoUrl}>{assignment.assignmentViedeoUrl}</a>
                                        </div>
                                    </Col>
                                </Form.Group>
                                <div className="d-flex gap-5">
                                    <Button onClick={() => save(assignmentStatuses[5].status)}>Resubmit</Button>
                                    <Button variant="secondary" onClick={() => navigate(-1)}>Back</Button>
                                </div>
                            </> : <>
                                <div className="d-flex gap-5">
                                    <Button onClick={() => save(assignmentStatuses[1].status)}>Submit Assignment</Button>
                                    <Button variant="secondary" onClick={() => navigate(-1)}>Back</Button>
                                </div>
                            </>
                        }


                        <div className='mt-4'>
                            <textarea style={{ width: "100%", borderRadius: "0.2rem", resize: "none", padding: "0.3rem" }}
                                onChange={(e) => updateComment(e.target.value)}
                                value={comment.text}></textarea>
                            <Button onClick={() => submitComment()}>Post Comment</Button>
                        </div>

                        <div className='mt-5'>
                            {
                                comments.map((coment) => (
                                    <Comment
                                        createdBy={coment.createdBy}
                                        createdDate={coment.createdDate}
                                        text={coment.text}
                                        emmitDeleteComment={handleDeleteComment}
                                        emmitEditComment={handleEditComment}
                                        id={coment.id}
                                    />
                                ))
                            }
                        </div>



                    </> : <></>
                }
            </Container >
        </div>
    );
};

export default Assignment;