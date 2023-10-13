import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import fetchUtil from '../Services/fetchService';
import { useUser } from '../UserProvider';


const PrivateRoute = ({ children }) => {
    const user = useUser();
    const [isLoading, setIsloading] = useState(true);
    const [isValid, setIsValid] = useState(null);
    const navigate = useNavigate();
    if (user.jwt !== null) {
        fetchUtil(`/api/auth/validate?token=${user.jwt}`, 'get', user.jwt)
            .then((isValid) => {
                setIsValid(isValid);
                setIsloading(false);
                console.log("validated", isValid, isLoading)
            });
    } else {
        <Navigate to="/login" />;
    }

    return isLoading === true ? (<><div style={{ textAlign: "center", color: "white" }}>Loading</div></>) : (isValid === true ? children : <Navigate to='/login' />);
}

export default PrivateRoute
