import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const token = localStorage.getItem("token");
      // const pathname = new URL(request.url).pathname;
      

    if (!token) {
       return <Navigate to={`/login?message=You must log in first.`} replace/>
    }; 
    return <Outlet/>
}

export default ProtectedRoute