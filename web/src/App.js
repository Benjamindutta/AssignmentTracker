import { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Homepage from './Homepage'
import Login from './login';
import PrivateRoute from './PrivateRoute';
import Assignment from './Assignment';
import jwtDecode from 'jwt-decode';
import CodeReviewerDashboard from './CodeReviewerDashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import CodeReviewerAssignment from './CodeReviewerAssignment';
import { UserProvider, useUser } from './UserProvider';

function App() {
  // const jsonBody = {
  //   "username": "benjamin",
  //   "password": "asdfasdf"
  // };
  const user = useUser();
  const [roles, setRoles] = useState([]);
  const getrolefromjwt = () => {
    if (user.jwt) {
      const decodeJwt = jwtDecode(user.jwt);
      return decodeJwt.authorities;
    }
    return [];
  }

  console.log("jwt from app", user.jwt);

  console.log(user.jwt)
  useEffect(() => {
    setRoles(getrolefromjwt())
  }, [user.jwt])

  console.log(roles)
  return (
    <Routes>
      <Route path="dashboard" element={
        roles.find((role) => role === "ROLES_CODE_REVIEWER") ?
          (<PrivateRoute>
            <CodeReviewerDashboard />
          </PrivateRoute>) :
          (
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          )
      } />
      <Route path="assignments/:id" element={roles.find((role) => role === "ROLES_CODE_REVIEWER") ? <PrivateRoute><CodeReviewerAssignment /></PrivateRoute> : <PrivateRoute><Assignment /></PrivateRoute>} />


      <Route path='login' element={<Login />} />
      <Route path="/" element={<Homepage />} />
    </Routes>
  );
}

export default App;
