import React from "react";
import { Navigate } from "react-router";

export default function ProtectedRoute({ activeUser, children }) {
  if (!activeUser) return <Navigate to="/" replace />;

  return <>{children}</>;
}
