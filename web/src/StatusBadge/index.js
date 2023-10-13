import React from 'react'
import { Badge } from 'react-bootstrap';

const StatusBadge = (props) => {
    const { text } = props;
    let bgVariant = "dark";
    if (text === "COMPLETED") {
        bgVariant = "success";
    } else if (text === "NEEDS UPDATE") {
        bgVariant = "danger"
    } else if (text === "IN REVIEW") {
        bgVariant = "warning"
    } else if (text === "SUBMITTED") {
        bgVariant = "info"
    } else {
        bgVariant = "primary"
    }
    return (
        <div>
            <Badge pill bg={bgVariant}>{text}</Badge>

        </div>
    )
}

export default StatusBadge
