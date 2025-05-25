import { Navigate } from "react-router";
import { getRole } from "../lib/api/token";

const userRole = getRole();

export default function ProtectedRoute({ children }) {
  const requiredRole = "admin";

  if (requiredRole && userRole === requiredRole) {
    return <Navigate to="/user-list" replace />;
  }

  return children;
}
