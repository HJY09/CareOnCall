import React from "react";
import { Navigate } from "react-router-dom";

// SECURITY: Centralised authentication guard.
// Wrap any route that requires a logged-in user with <ProtectedRoute>.
// If no valid token is found in localStorage the user is redirected
// to /login, preventing unauthorised access to protected pages.
function ProtectedRoute({ children }) {
    const token = localStorage.getItem("token");

    if (!token || token === "") {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;