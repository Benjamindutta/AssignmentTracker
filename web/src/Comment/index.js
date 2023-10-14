import React, { useState, useEffect } from "react";
import { useUser } from "../UserProvider";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const Comment = (props) => {
    const user = useUser();
    console.log(props);
    const decodedJwt = jwt_decode(user.jwt);
    const { id, createdDate, createdBy, text } = props;
    const { emitEditComment, emitDeleteComment } = props;
    const [commentRelativeTime, setCommentRelativeTime] = useState("");

    useEffect(() => {
        updateCommentRelativeTime();
    }, [createdDate]);

    function updateCommentRelativeTime() {
        if (createdDate) {
            dayjs.extend(relativeTime);

            if (typeof createdDate === "string")
                setCommentRelativeTime(dayjs(createdDate).fromNow());
            else {
                setCommentRelativeTime(createdDate.fromNow());
            }
        }
    }

    return (
        <>
            <div className="comment-bubble">
                <div className="d-flex gap-5" style={{ fontWeight: "bold" }}>
                    <div>{`${createdBy.name}`}</div>
                    {decodedJwt.sub === createdBy.username ? (
                        <>
                            <div
                                onClick={() => emitEditComment(id)}
                                style={{ cursor: "pointer", color: "blue" }}
                            >
                                edit
                            </div>
                            <div
                                onClick={() => emitDeleteComment(id)}
                                style={{ cursor: "pointer", color: "red" }}
                            >
                                delete
                            </div>
                        </>
                    ) : (
                        <></>
                    )}
                </div>
                <div>{text}</div>
            </div>

            <div
                style={{ marginTop: "-1.25em", marginLeft: "1.4em", fontSize: "12px", color: "white" }}
            >
                {commentRelativeTime ? `Posted ${commentRelativeTime}` : ""}
            </div>
        </>
    );
};

export default Comment;