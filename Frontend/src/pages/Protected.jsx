import React from 'react'
import Home from './Home.jsx';
import Login from './Login.jsx';
import { Navigate, Outlet } from 'react-router-dom';
const Protected = () => {
    const token = localStorage.getItem("token")
  return (
    <div>
        {
            token !== null ? <Outlet/> : <Navigate to="/login" />
        }

    </div>
  )
}

export default Protected