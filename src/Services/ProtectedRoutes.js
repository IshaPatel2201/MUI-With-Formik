import React from 'react'
import { Navigate, Outlet,redirect } from 'react-router-dom'
const ProtectedRoutes = () => {
    const auth=localStorage.getItem("loggeduser");

  return auth ? <Outlet/>:<Navigate to ={"/login"}/>;
}

export default ProtectedRoutes