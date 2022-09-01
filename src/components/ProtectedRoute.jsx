import React, { Children } from "react";
import { Navigate } from "react-router";

export default function ProtectedRoute({ activeUser, children }) {
    console.log('active user in protected Route', activeUser)
  if (!activeUser) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
