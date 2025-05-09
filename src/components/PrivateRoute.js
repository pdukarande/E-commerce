import React from "react";
import { Navigate } from "react-router-dom";
import Navbar from "./Navbar/Navbar";

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/signin" />
    }
    return (
        <>
            <Navbar />
            {children}
        </>
    )
};

export default PrivateRoute;
